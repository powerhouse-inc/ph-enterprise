"use server";

import { appendFile } from "node:fs/promises";
import { Resend } from "resend";

export type DemoState =
  | { ok: true; delivery?: "email" | "local" }
  | { ok: false; error?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const CONTACT_EMAIL = "hello@powerhouse.inc";
const WORKFLOW_SIGNUP_INTENT = "workflow-email-signup";
const LOCAL_LEADS_FILE = "/tmp/ph-enterprise-leads.jsonl";

type LeadRequest = {
  company: string;
  createdAt: string;
  email: string;
  intent: string;
  message: string;
  name: string;
  topic: string;
};

function isWorkflowSignup(intent: string) {
  return intent === WORKFLOW_SIGNUP_INTENT;
}

function fallbackError(intent: string) {
  return isWorkflowSignup(intent)
    ? `This form is not connected in this preview. Email ${CONTACT_EMAIL} to request a workflow assessment.`
    : `This form is not connected in this preview. Email ${CONTACT_EMAIL} to request a demo.`;
}

function sendError(intent: string) {
  return isWorkflowSignup(intent)
    ? `We couldn't send the assessment request. Please try again or email ${CONTACT_EMAIL}.`
    : `We couldn't send the demo request. Please try again or email ${CONTACT_EMAIL}.`;
}

function canCaptureLocalLead() {
  return process.env.VERCEL !== "1";
}

async function captureLocalLead(lead: LeadRequest): Promise<DemoState> {
  try {
    await appendFile(LOCAL_LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
    console.warn(
      `[submit-demo] RESEND_API_KEY is not set; captured lead locally at ${LOCAL_LEADS_FILE}.`,
    );
    return { ok: true, delivery: "local" };
  } catch (err) {
    console.error("[submit-demo] Local lead capture failed:", err);
    return { ok: false, error: fallbackError(lead.intent) };
  }
}

export async function submitDemoRequest(
  _prev: DemoState,
  formData: FormData,
): Promise<DemoState> {
  const intent = String(formData.get("intent") ?? "demo").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const topic = String(formData.get("topic") ?? "Demo request").trim();
  // Honeypot: real users never fill this hidden field.
  const honeypot = String(formData.get("company_url") ?? "").trim();

  if (honeypot) {
    // Silently accept bot submissions without sending.
    return { ok: true, delivery: "email" };
  }

  if (isWorkflowSignup(intent) && !email) {
    return {
      ok: false,
      error: "Please add your work email.",
    };
  }

  if (!isWorkflowSignup(intent) && (!name || !email || !company)) {
    return {
      ok: false,
      error: "Please add your name, work email, and company.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const lead: LeadRequest = {
    company,
    createdAt: new Date().toISOString(),
    email,
    intent,
    message,
    name,
    topic,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (canCaptureLocalLead()) {
      return captureLocalLead(lead);
    }

    console.error("[submit-demo] RESEND_API_KEY is not set.");
    return {
      ok: false,
      error: fallbackError(intent),
    };
  }

  const to = process.env.DEMO_LEADS_TO ?? CONTACT_EMAIL;
  const from = process.env.DEMO_LEADS_FROM ?? "Powerhouse <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject:
        isWorkflowSignup(intent)
          ? `${topic}: ${email}`
          : `${topic}: ${company}`,
      text: [
        `New ${topic.toLowerCase()}`,
        "",
        `Name:    ${name || "(not provided)"}`,
        `Email:   ${email}`,
        `Company: ${company || "(not provided)"}`,
        "",
        "Message:",
        message || "(none provided)",
        "",
      ].join("\n"),
    });

    if (error) {
      console.error("[submit-demo] Resend error:", error);
      return {
        ok: false,
        error: sendError(intent),
      };
    }

    return { ok: true, delivery: "email" };
  } catch (err) {
    console.error("[submit-demo] Unexpected error:", err);
    return {
      ok: false,
      error: sendError(intent),
    };
  }
}

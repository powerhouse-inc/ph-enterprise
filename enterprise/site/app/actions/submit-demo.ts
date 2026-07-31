"use server";

import { Resend } from "resend";

export type DemoState = {
  ok: boolean;
  error?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
    return { ok: true };
  }

  if (intent === "workflow-email-signup" && !email) {
    return {
      ok: false,
      error: "Please add your work email.",
    };
  }

  if (intent !== "workflow-email-signup" && (!name || !email || !company)) {
    return {
      ok: false,
      error: "Please add your name, work email, and company.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[submit-demo] RESEND_API_KEY is not set.");
    return {
      ok: false,
      error:
        "Demo requests aren't fully configured yet. Please email hello@powerhouse.inc.",
    };
  }

  const to = process.env.DEMO_LEADS_TO ?? "hello@powerhouse.inc";
  const from = process.env.DEMO_LEADS_FROM ?? "Powerhouse <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject:
        intent === "workflow-email-signup"
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
        error:
          "Something went wrong sending your request. Please try again or email hello@powerhouse.inc.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submit-demo] Unexpected error:", err);
    return {
      ok: false,
      error: "Something went wrong. Please email hello@powerhouse.inc.",
    };
  }
}

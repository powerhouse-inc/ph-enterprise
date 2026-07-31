import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  CloudCog,
  Fingerprint,
  Network,
  Plug,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { Button } from "@/components/ui/button";
import { BAI_ENGAGEMENT_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Powerhouse, BAI, Vetra, and the supporting platform components fit together for owned AI workflow software.",
  alternates: {
    canonical: "/architecture",
  },
  openGraph: {
    title: "Architecture - Powerhouse Enterprise",
    description:
      "A focused architecture view for owned operational software: systems, workflow structure, scoped AI, human approval, and attributable history.",
    url: "/architecture",
  },
};

const roles = [
  {
    name: "Powerhouse",
    role: "Open-source platform",
    body: "The foundation for building owned operational software from typed workflow objects, operation history, APIs, and user-facing workspace surfaces.",
  },
  {
    name: "BAI",
    role: "First-workflow delivery team",
    body: "The delivery team behind the first workflow engagement: operating model, first deployment, and handover.",
  },
  {
    name: "Vetra",
    role: "Tooling and deployment layer",
    body: "The environment for packaging modules, deploying Powerhouse software, and operating cloud or self-hosted deployments.",
  },
] as const;

const flow = [
  {
    icon: Plug,
    label: "Existing systems",
    body: "Documents, email, spreadsheets, ERP, HRIS, finance tools, identity, storage, and line-of-business systems.",
  },
  {
    icon: Braces,
    label: "Structured workflow layer",
    body: "Typed objects, valid operations, permissions, approval gates, and event history define how the work can move.",
  },
  {
    icon: Bot,
    label: "Scoped AI assistance",
    body: "AI can extract, classify, compare, draft, and flag within the workflow boundary it has been granted.",
  },
  {
    icon: UserCheck,
    label: "Human operation",
    body: "Operators work in the same software surface, approve consequential actions, and retain accountability.",
  },
] as const;

const components = [
  {
    id: "switchboard",
    name: "Switchboard",
    icon: Network,
    role: "API and integration boundary",
    body: "Connects existing systems to Powerhouse through scoped APIs and integration surfaces. It defines what enters the workflow layer and what each actor can access.",
  },
  {
    id: "connect",
    name: "Connect",
    icon: Workflow,
    role: "Operator workspace",
    body: "The browser workspace where teams review, edit, approve, and operate structured workflow objects with real-time collaboration.",
  },
  {
    id: "clint",
    name: "Clint",
    icon: Bot,
    role: "AI agent infrastructure",
    body: "Runs workflow-specific AI assistance through bounded tools, process playbooks, model choices, and escalation rules.",
  },
  {
    id: "renown",
    name: "Renown",
    icon: Fingerprint,
    role: "Identity and attribution",
    body: "Governs human users, agents, integrations, and permissions so operations can be attributed to the actor that performed them.",
  },
  {
    id: "fusion",
    name: "Fusion",
    icon: Boxes,
    role: "Custom software surface",
    body: "Turns the workflow layer into branded internal or external applications, dashboards, reports, and role-specific portals.",
  },
  {
    id: "vetra",
    name: "Vetra",
    icon: CloudCog,
    role: "Deployment tooling",
    body: "Packages, hosts, and operates Powerhouse modules and deployments across cloud or self-hosted environments.",
  },
] as const;

const ownership = [
  ["Deployment", "Cloud, private cloud, or self-hosted options depending on workflow sensitivity."],
  ["Data model", "Typed schemas and portable JSON data instead of proprietary workflow records."],
  ["Model choice", "Local or commercial models can be selected by workflow boundary and data sensitivity."],
  ["Auditability", "Operation history is part of the workflow state, with human and AI-assisted actions attributable."],
  ["Adoption path", "Start beside existing systems; move one private workflow into owned software first."],
] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-normal text-t3">
      <span className="h-[5px] w-[5px] rounded-full bg-brand" aria-hidden="true" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-[760px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-[clamp(30px,4vw,50px)] font-[680] leading-[1.08] tracking-normal text-t1">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.72] text-t2">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <>
      <GrainOverlay />
      <LandingNav />

      <main className="relative overflow-hidden">
        <section className="border-b border-border pt-24 pb-14 md:pt-28 md:pb-16">
          <SectionContainer>
            <div className="max-w-[840px]">
              <Eyebrow>Architecture</Eyebrow>
              <h1 className="font-heading text-[clamp(40px,6vw,72px)] font-[680] leading-[1.02] tracking-normal text-t1">
                Architecture for owned AI workflow software.
              </h1>
              <p className="mt-7 max-w-[64ch] text-[17px] leading-[1.75] text-t2 md:text-[18px]">
                Powerhouse turns private operational work into structured,
                inspectable software. The named components below support that
                outcome; they are not the homepage story on their own.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button variant="cta" className="h-11 rounded-md px-5 text-[14px]" asChild>
                  <a href={BAI_ENGAGEMENT_URL}>
                    Map your first workflow
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" className="h-11 rounded-md px-5 text-[14px]" asChild>
                  <Link href="/#how-it-works">
                    Back to overview
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <SectionHeading
              eyebrow="Brand roles"
              title="One platform, one delivery path, one deployment layer."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {roles.map((item) => (
                <div key={item.name} className="rounded-lg border border-border bg-surface p-6">
                  <h2 className="font-heading text-[22px] font-semibold tracking-normal text-t1">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-[13px] font-semibold text-brand">
                    {item.role}
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.7] text-t2">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        <section className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <SectionHeading
              eyebrow="System flow"
              title="From scattered private work to governed AI assistance."
              body="The architecture is easiest to understand as a sequence: connect the sources, structure the workflow, scope AI assistance, then keep humans accountable for decisions."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-4">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="relative rounded-lg border border-border bg-surface p-5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-brand">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-[13px] font-semibold text-t3">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-[16px] font-semibold text-t1">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.66] text-t2">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionContainer>
        </section>

        <section className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <SectionHeading
              eyebrow="Supporting components"
              title="Component names belong here, after the workflow is clear."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {components.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    id={item.id}
                    key={item.name}
                    className="scroll-mt-24 rounded-lg border border-border bg-surface p-6"
                  >
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <h2 className="mt-4 font-heading text-[20px] font-semibold tracking-normal text-t1">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-[13px] font-semibold text-t3">
                      {item.role}
                    </p>
                    <p className="mt-4 text-[14px] leading-[1.7] text-t2">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </SectionContainer>
        </section>

        <section className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1fr]">
              <SectionHeading
                eyebrow="Ownership model"
                title="The architecture is designed to keep exit paths open."
                body="Every engagement still needs environment-specific review, but the default design goal is practical ownership rather than dependency on a single vendor interface."
              />
              <div className="divide-y divide-border border-y border-border">
                {ownership.map(([label, value]) => (
                  <div key={label} className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]">
                    <h3 className="font-heading text-[15px] font-semibold text-t1">
                      {label}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-t2">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>

        <section className="py-16 md:py-24">
          <SectionContainer>
            <div className="rounded-lg border border-brand-low bg-brand-low/30 p-7 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-normal text-t3">
                    <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                    Start with the boundary
                  </div>
                  <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] font-[680] leading-[1.1] tracking-normal text-t1">
                    Map the first private workflow before choosing components.
                  </h2>
                  <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.72] text-t2">
                    We identify the workflow, source systems, approval model,
                    data boundaries, and deployment path. Component choices
                    follow from that map.
                  </p>
                </div>
                <Button variant="cta" className="h-11 rounded-md px-5 text-[14px]" asChild>
                  <a href={BAI_ENGAGEMENT_URL}>
                    Map your first workflow
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

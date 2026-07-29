import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileStack,
  GitBranch,
  History,
  Inbox,
  LockKeyhole,
  MonitorCheck,
  Network,
  Plug,
  ShieldCheck,
  Table2,
  UserCheck,
  Workflow,
} from "lucide-react";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { Button } from "@/components/ui/button";
import {
  ASSESSMENT_EMAIL_URL,
  BAI_ENGAGEMENT_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Powerhouse Enterprise - Owned AI Workflow Software",
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

const realityItems = [
  {
    icon: FileStack,
    label: "Documents",
    body: "Contracts, invoices, reports, policies, briefs, and PDFs carry the real working context.",
  },
  {
    icon: Table2,
    label: "Spreadsheets",
    body: "Review queues, reconciliations, trackers, exceptions, and approvals drift outside systems of record.",
  },
  {
    icon: Inbox,
    label: "Inboxes",
    body: "Decisions happen in threads and attachments, then get reconstructed later when someone asks why.",
  },
  {
    icon: Network,
    label: "Legacy systems",
    body: "ERP, HRIS, finance, identity, and document systems each hold a fragment of the process.",
  },
] as const;

const workflowSteps = [
  {
    icon: Plug,
    title: "Connect existing systems",
    body: "Pull the necessary records, documents, and events into a bounded workflow layer without replacing the systems your teams already run.",
  },
  {
    icon: Workflow,
    title: "Structure the workflow",
    body: "Turn the process into typed objects, valid states, required fields, approval paths, and clear exceptions.",
  },
  {
    icon: Bot,
    title: "Add scoped AI assistance",
    body: "Let AI read, classify, draft, extract, compare, and flag only inside the data and actions it has been granted.",
  },
  {
    icon: UserCheck,
    title: "Keep human approval",
    body: "Route consequential decisions back to accountable operators with the context needed to approve, reject, or revise.",
  },
  {
    icon: History,
    title: "Retain an attributable history",
    body: "Record every human and AI-assisted operation as part of the workflow history, not as a separate audit project.",
  },
] as const;

const ownershipItems = [
  {
    icon: LockKeyhole,
    title: "Private deployment options",
    body: "Deploy sensitive workflows in environments you control, with cloud or local model choices scoped by the workflow.",
  },
  {
    icon: GitBranch,
    title: "Open-source stack",
    body: "Inspect, extend, and operate the platform instead of depending on a black-box vendor surface.",
  },
  {
    icon: Database,
    title: "Portable data and schemas",
    body: "Your workflow data and typed schemas remain durable assets your team can keep using.",
  },
  {
    icon: MonitorCheck,
    title: "No rip-and-replace",
    body: "Start beside the systems of record and move one valuable workflow at a time.",
  },
] as const;

const proofMetrics = [
  {
    value: "Production",
    label: "systems already built across Powerhouse, BAI, Achra, Sky ecosystem work, and RFP Hub.",
  },
  {
    value: "22",
    label: "business modules cited by BAI as active production infrastructure.",
  },
  {
    value: "65%",
    label: "invoice-review time reduction attributed on the BAI site to Wouter Vonk, CEO of Powerhouse.",
  },
] as const;

const assessmentDeliverables = [
  "workflow map across documents, spreadsheets, inboxes, and systems",
  "private-data and permission-boundary inventory",
  "first-workflow opportunity ranked by value, risk, and buildability",
  "owned software shape: objects, states, approvals, history, and AI scope",
  "deployment path through Powerhouse, BAI, and Vetra",
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
    <div className="max-w-[720px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-[680] leading-[1.06] tracking-normal text-t1">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.72] text-t2">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryCta({ className }: { className?: string }) {
  return (
    <Button variant="cta" className={className} asChild>
      <a href={BAI_ENGAGEMENT_URL}>
        Map your first workflow
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <LandingNav />

      <main className="relative overflow-hidden">
        <section className="relative border-b border-border pt-18 pb-12 md:pt-26 md:pb-12 lg:pt-28">
          <SectionContainer>
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.72fr)]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-t2">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  For private, document-heavy operations
                </div>
                <h1 className="max-w-[720px] font-heading text-[clamp(38px,5vw,64px)] font-[680] leading-[1.02] tracking-normal text-t1">
                  Turn private, document-heavy workflows into AI powered
                  software you own.
                </h1>
                <p className="mt-6 max-w-[620px] text-[16px] leading-[1.72] text-t2 md:text-[17px]">
                  Powerhouse gives operations and technology leaders a structured
                  workflow layer for sensitive work: connected systems, scoped AI
                  assistance, human approval, and attributable history.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCta className="h-11 rounded-md px-5 text-[14px] font-semibold" />
                  <Button
                    variant="outline"
                    className="h-11 rounded-md px-5 text-[14px] font-medium"
                    asChild
                  >
                    <Link href="#how-it-works">
                      See how it works
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <figure className="m-0 hidden md:block">
                <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0E1013] shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
                  <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3 text-[12px] text-t3">
                    <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                    Owned workflow workspace
                  </div>
                  <Image
                    src="/usecases/onboarding-operational-hub/03-operational-dashboard.png"
                    alt="A Powerhouse operational hub workspace showing a private workflow with subscriptions, setup tasks, documents, and reports."
                    width={2515}
                    height={1285}
                    priority
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] leading-[1.6] text-t3">
                  Product evidence from an operational hub built on the
                  Powerhouse stack.
                </figcaption>
              </figure>
            </div>
          </SectionContainer>
        </section>

        <section id="reality" className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr]">
              <SectionHeading
                eyebrow="Current reality"
                title="The work is valuable because the context is private."
                body="The workflow already exists. It is just split across places AI cannot safely use without structure, permissions, and context."
              />

              <div className="divide-y divide-border border-y border-border">
                {realityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="grid gap-4 py-6 sm:grid-cols-[160px_1fr]">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                        <h3 className="font-heading text-[16px] font-semibold text-t1">
                          {item.label}
                        </h3>
                      </div>
                      <p className="text-[14px] leading-[1.7] text-t2">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionContainer>
        </section>

        <section id="how-it-works" className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <SectionHeading
              eyebrow="How Powerhouse works"
              title="A structured layer between existing systems, AI, and accountable operators."
              body="Powerhouse turns a messy operational process into owned software one workflow at a time."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-5">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-brand">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-[13px] font-semibold text-t3">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-[16px] font-semibold leading-[1.3] text-t1">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.66] text-t2">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-lg border border-brand-low bg-brand-low/30 p-5">
              <p className="max-w-[78ch] text-[14px] leading-[1.72] text-t2">
                Detailed component names and deployment patterns belong after
                the workflow and ownership model are clear. The architecture
                page is the right place for that deeper technical map.
              </p>
              <Link
                href="/architecture"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-t1 transition-colors hover:text-brand"
              >
                View the architecture
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </SectionContainer>
        </section>

        <section id="ownership" className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr]">
              <SectionHeading
                eyebrow="Why ownership matters"
                title="The software should become an asset your organization controls."
                body="The alternative is to keep creating process knowledge inside vendor interfaces your team cannot inspect, move, or run on its own terms."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {ownershipItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-lg border border-border bg-surface p-5">
                      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                      <h3 className="mt-4 font-heading text-[16px] font-semibold text-t1">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-[1.68] text-t2">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionContainer>
        </section>

        <section id="proof" className="border-b border-border py-16 md:py-24">
          <SectionContainer>
            <SectionHeading
              eyebrow="Proof"
              title="Built software, not slideware."
              body="The strongest evidence is concrete product surface: workflow screens, modules, and production systems already built on the Powerhouse stack."
            />

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="grid gap-4">
                {proofMetrics.map((metric) => (
                  <div key={metric.value} className="border-t border-border pt-5">
                    <p className="font-heading text-[clamp(34px,4vw,54px)] font-[680] leading-none tracking-normal text-t1">
                      {metric.value}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.7] text-t2">
                      {metric.label}
                    </p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="mt-2 h-10 w-fit rounded-md px-5 text-[13px] font-medium"
                  asChild
                >
                  <Link href="/use-cases">
                    View product examples
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <figure className="m-0">
                <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0E1013] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                  <Image
                    src="/usecases/service-offering/05-operator-dashboard.png"
                    alt="A service-offering operator dashboard showing subscriptions, recurring revenue, customer usage metrics, and action items."
                    width={1449}
                    height={1269}
                    loading="eager"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] leading-[1.6] text-t3">
                  Example operator dashboard from workflow software built on
                  Powerhouse.
                </figcaption>
              </figure>
            </div>
          </SectionContainer>
        </section>

        <section id="engagement" className="py-16 md:py-24">
          <SectionContainer>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr]">
              <div>
                <SectionHeading
                  eyebrow="Starting engagement"
                  title="Start with a five-day workflow assessment."
                  body="BAI maps the first workflow before anyone commits to a build. The output is a concrete software plan, not a generic AI strategy deck."
                />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCta className="h-11 rounded-md px-5 text-[14px] font-semibold" />
                  <Button
                    variant="outline"
                    className="h-11 rounded-md px-5 text-[14px] font-medium"
                    asChild
                  >
                    <a href={ASSESSMENT_EMAIL_URL}>
                      Email the assessment team
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h3 className="font-heading text-[18px] font-semibold text-t1">
                    Assessment deliverables
                  </h3>
                </div>
                <ul className="mt-6 space-y-4" role="list">
                  {assessmentDeliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="text-[14px] leading-[1.65] text-t2">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

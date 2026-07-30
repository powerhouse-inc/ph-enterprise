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
    body: "Contracts, invoices, reports, policies, briefs, and PDFs carry obligations and exceptions.",
  },
  {
    icon: Table2,
    label: "Spreadsheets",
    body: "Review queues, reconciliations, trackers, and approvals drift outside systems of record.",
  },
  {
    icon: Inbox,
    label: "Inboxes",
    body: "Decisions happen in threads and attachments. Teams reconstruct the record later.",
  },
  {
    icon: Network,
    label: "Legacy systems",
    body: "ERP, HRIS, finance, identity, and document systems each hold part of the process.",
  },
] as const;

const workflowSteps = [
  {
    icon: Plug,
    title: "Connect existing systems",
    body: "Bring the required records, documents, and events into one workflow boundary. Keep the systems of record in place.",
  },
  {
    icon: Workflow,
    title: "Structure the workflow",
    body: "Define typed objects, valid states, required fields, approval paths, and exceptions.",
  },
  {
    icon: Bot,
    title: "Add scoped AI assistance",
    body: "Let AI extract, classify, draft, compare, and flag only inside the approved boundary.",
  },
  {
    icon: UserCheck,
    title: "Keep human approval",
    body: "Send consequential decisions to accountable operators with the context to approve, reject, or revise.",
  },
  {
    icon: History,
    title: "Retain an attributable history",
    body: "Record each human and AI-assisted operation as part of the workflow history.",
  },
] as const;

const ownershipItems = [
  {
    icon: LockKeyhole,
    title: "Private deployment options",
    body: "Run sensitive workflows in environments your organization controls.",
  },
  {
    icon: GitBranch,
    title: "Open-source stack",
    body: "Inspect, extend, and operate the platform instead of locking process knowledge inside a vendor surface.",
  },
  {
    icon: Database,
    title: "Portable data and schemas",
    body: "Keep workflow data and typed schemas as durable assets your team can move and reuse.",
  },
  {
    icon: Bot,
    title: "Model choice",
    body: "Select models by workflow sensitivity and change them as requirements shift.",
  },
  {
    icon: MonitorCheck,
    title: "No rip-and-replace",
    body: "Start beside existing systems. Move one valuable workflow into owned software first.",
  },
] as const;

const proofMetrics = [
  {
    value: "Production systems",
    label: "Powerhouse and BAI cite systems already built across Achra, Sky ecosystem work, Connect modules, and RFP Hub.",
  },
  {
    value: "22",
    label: "business modules in active production, as stated on the BAI site.",
  },
  {
    value: "65%",
    label: "invoice-review time reduction, attributed by BAI to Wouter Vonk, CEO of Powerhouse.",
  },
] as const;

const assessmentDeliverables = [
  {
    title: "Workflow map",
    body: "Documents, spreadsheets, inboxes, and systems that carry the work today.",
  },
  {
    title: "Boundary inventory",
    body: "Private data, permissions, approval points, and model-use constraints.",
  },
  {
    title: "First workflow",
    body: "The best starting point ranked by value, risk, and buildability.",
  },
  {
    title: "Software shape",
    body: "Objects, states, approvals, history, and AI scope for the owned system.",
  },
  {
    title: "Deployment path",
    body: "How Powerhouse, BAI, and Vetra move the workflow from map to software.",
  },
] as const;

function SheetStamp({
  sheet,
  drawing,
}: {
  sheet: string;
  drawing: string;
}) {
  return (
    <div className="grid grid-cols-2 border border-border bg-[rgba(4,19,34,0.76)] font-mono text-[10px] uppercase tracking-normal sm:text-[11px]">
      <span className="border-b border-border px-3 py-2 text-t3">Sheet</span>
      <span className="border-b border-l border-border px-3 py-2 font-semibold text-t1">
        {sheet}
      </span>
      <span className="px-3 py-2 text-t3">Drawing</span>
      <span className="border-l border-border px-3 py-2 font-semibold text-brand">
        {drawing}
      </span>
    </div>
  );
}

function Eyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-normal">
      <span className="text-brand">{number}</span>
      <span className="h-px w-9 bg-brand" aria-hidden="true" />
      <span className="text-t3">{children}</span>
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  body,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-[760px]">
      <Eyebrow number={number}>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-[clamp(34px,4.8vw,62px)] font-[760] leading-[0.98] tracking-normal text-t1">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-t2 md:text-[18px]">
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

      <main className="blueprint-bg relative overflow-hidden">
        <section className="blueprint-section relative pt-16 pb-12 md:pt-20 md:pb-12 lg:pt-24">
          <SectionContainer className="relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 border border-border bg-[rgba(4,19,34,0.72)] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-normal text-t2">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  Private document-heavy operations
                </div>
                <h1 className="max-w-[820px] font-heading text-[clamp(44px,5.8vw,78px)] font-[800] leading-[0.98] tracking-normal text-t1">
                  Turn private workflows into{" "}
                  <span className="text-brand">software you own.</span>
                </h1>
                <p className="mt-7 max-w-[660px] text-[17px] leading-[1.72] text-t2 md:text-[20px]">
                  Powerhouse structures document-heavy work so scoped AI can
                  help inside approved boundaries. Your team keeps control of
                  approval, deployment, and history.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <PrimaryCta className="h-12 px-5 text-[12px]" />
                  <Button
                    variant="outline"
                    className="h-12 px-5 text-[12px]"
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
                <div className="blueprint-panel overflow-hidden">
                  <div className="flex items-center justify-between gap-6 border-b border-border px-4 py-3">
                    <span className="blueprint-label">Owned workflow workspace</span>
                    <span className="font-mono text-[11px] uppercase tracking-normal text-brand">
                      Product surface
                    </span>
                  </div>
                  <Image
                    src="/usecases/onboarding-operational-hub/03-operational-dashboard.png"
                    alt="A Powerhouse operational hub workspace showing a private workflow with subscriptions, setup tasks, documents, and reports."
                    width={2515}
                    height={1285}
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="block h-auto w-full bg-[#EEF4FB]"
                  />
                  <div className="grid grid-cols-3 border-t border-border font-mono text-[10px] uppercase tracking-normal text-t3">
                    <span className="border-r border-border px-3 py-2">Tasks</span>
                    <span className="border-r border-border px-3 py-2">Documents</span>
                    <span className="px-3 py-2 text-brand">History</span>
                  </div>
                </div>
                <figcaption className="mt-3 text-[12px] leading-[1.6] text-t3">
                  Operational hub screen: setup tasks, service subscriptions,
                  documents, and reports in one owned workspace.
                </figcaption>
              </figure>
            </div>

          </SectionContainer>
        </section>

        <section id="reality" className="blueprint-section py-20 md:py-28">
          <SectionContainer className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr]">
              <SectionHeading
                number="01"
                eyebrow="Current reality"
                title="Siloed data limits what AI can deliver."
                body="Critical workflows are spread across disconnected tools, with no shared structure, permissions, or history."
              />

              <div className="blueprint-panel">
                <div className="flex items-center justify-between gap-6 border-b border-border px-5 py-4">
                  <p className="font-heading text-[17px] font-semibold text-t1">
                    Operational context today
                  </p>
                  <span className="blueprint-label">Unstructured inputs</span>
                </div>
                <div className="grid sm:grid-cols-2">
                  {realityItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="border-b border-border p-5 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                          <h3 className="font-heading text-[17px] font-semibold text-t1">
                            {item.label}
                          </h3>
                        </div>
                        <p className="mt-3 text-[14px] leading-[1.68] text-t2">
                          {item.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid gap-4 border-t border-brand bg-brand-low p-5 sm:grid-cols-[180px_1fr]">
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-normal text-brand">
                    Missing boundary
                  </p>
                  <p className="text-[14px] leading-[1.68] text-t2">
                    AI receives fragments unless the workflow has structure,
                    permissions, context, and history first.
                  </p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section id="how-it-works" className="blueprint-section py-20 md:py-28">
          <SectionContainer className="relative z-10">
            <SectionHeading
              number="02"
              eyebrow="How Powerhouse works"
              title="Give the workflow a boundary before AI touches it."
              body="Powerhouse turns your private processes into AI-ready software that you own."
            />

            <ol className="blueprint-panel mt-12 divide-y divide-border" role="list">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="grid gap-5 px-5 py-6 md:grid-cols-[90px_260px_1fr] md:items-start"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[12px] font-semibold text-brand">
                        0{index + 1}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center border border-border bg-brand-low text-brand">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="font-heading text-[20px] font-semibold leading-[1.2] text-t1">
                      {step.title}
                    </h3>
                    <p className="max-w-[64ch] text-[14px] leading-[1.7] text-t2">
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ol>

            <div className="blueprint-panel-soft mt-10 p-5">
              <p className="max-w-[78ch] text-[14px] leading-[1.72] text-t2">
                The architecture page covers component names, deployment
                patterns, and the technical ownership model after the workflow
                boundary is clear.
              </p>
              <Link
                href="/architecture"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-normal text-brand transition-colors hover:text-t1"
              >
                View the architecture
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </SectionContainer>
        </section>

        <section id="ownership" className="blueprint-section py-20 md:py-28">
          <SectionContainer className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr]">
              <SectionHeading
                number="03"
                eyebrow="Why ownership matters"
                title="Keep control of the workflow boundary."
                body="The useful asset is the structured workflow: data, schema, permissions, approvals, and history."
              />

              <div className="blueprint-panel overflow-hidden">
                <div className="hidden grid-cols-[220px_1fr] gap-4 border-b border-border bg-[rgba(4,19,34,0.72)] px-5 py-3 sm:grid">
                  <span className="blueprint-label">Control</span>
                  <span className="blueprint-label">What stays yours</span>
                </div>
                <div className="divide-y divide-border">
                  {ownershipItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="grid gap-4 px-5 py-5 sm:grid-cols-[220px_1fr]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                          <h3 className="font-heading text-[16px] font-semibold text-t1">
                            {item.title}
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
            </div>
          </SectionContainer>
        </section>

        <section id="proof" className="blueprint-section py-20 md:py-28">
          <SectionContainer className="relative z-10">
            <SectionHeading
              number="04"
              eyebrow="Proof"
              title="Proof should be inspectable."
              body="The best evidence is product surface: workflow screens, modules, and production systems already built on the Powerhouse stack."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-start">
              <figure className="m-0">
                <div className="blueprint-panel overflow-hidden">
                  <div className="border-b border-border px-4 py-3">
                    <span className="blueprint-label">Operator dashboard</span>
                  </div>
                  <Image
                    src="/usecases/service-offering/05-operator-dashboard.png"
                    alt="A service-offering operator dashboard showing subscriptions, recurring revenue, customer usage metrics, and action items."
                    width={1449}
                    height={1269}
                    loading="eager"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="block h-auto w-full bg-[#EEF4FB]"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] leading-[1.6] text-t3">
                  Subscriptions, recurring revenue, customer usage, and action
                  items in a workflow product surface.
                </figcaption>
              </figure>

              <div className="grid gap-4">
                <div className="blueprint-panel overflow-hidden">
                  {proofMetrics.map((metric) => (
                    <div
                      key={metric.value}
                      className="grid gap-3 border-b border-border px-5 py-5 last:border-b-0"
                    >
                      <p className="font-heading text-[clamp(26px,3.2vw,38px)] font-[760] leading-[1.02] tracking-normal text-t1">
                        {metric.value}
                      </p>
                      <p className="text-[14px] leading-[1.68] text-t2">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <figure className="m-0">
                  <div className="blueprint-panel overflow-hidden">
                    <div className="border-b border-border px-4 py-3">
                      <span className="blueprint-label">Provenance surface</span>
                    </div>
                    <Image
                      src="/usecases/rfp-hub/03-rfp-detail-provenance.png"
                      alt="An RFP Hub workflow screen showing a request detail view with provenance and supporting context."
                      width={988}
                      height={1218}
                      loading="eager"
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="block h-auto w-full bg-[#EEF4FB]"
                    />
                  </div>
                  <figcaption className="mt-3 text-[12px] leading-[1.6] text-t3">
                    RFP Hub screen: request detail, provenance, and workflow
                    context in one review surface.
                  </figcaption>
                </figure>

                <Button
                  variant="outline"
                  className="mt-2 h-11 w-fit px-5 text-[12px]"
                  asChild
                >
                  <Link href="/use-cases">
                    View product examples
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section id="engagement" className="blueprint-section border-b-0 py-20 md:py-28">
          <SectionContainer className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr]">
              <div>
                <SectionHeading
                  number="05"
                  eyebrow="Starting engagement"
                  title="Start with a five-day workflow assessment."
                  body="BAI maps the first workflow before a build starts. The output is a software plan with objects, boundaries, approvals, and deployment steps."
                />
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <PrimaryCta className="h-12 px-5 text-[12px]" />
                  <Button
                    variant="outline"
                    className="h-12 px-5 text-[12px]"
                    asChild
                  >
                    <a href={ASSESSMENT_EMAIL_URL}>
                      Email the assessment team
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="blueprint-panel p-6 md:p-7">
                <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="h-5 w-5 text-brand" aria-hidden="true" />
                    <h3 className="font-heading text-[20px] font-semibold text-t1">
                      Assessment deliverables
                    </h3>
                  </div>
                  <span className="blueprint-label">Five days</span>
                </div>
                <ul className="mt-6 space-y-5" role="list">
                  {assessmentDeliverables.map((item) => (
                    <li key={item.title} className="grid gap-2 sm:grid-cols-[160px_1fr]">
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        <span className="font-heading text-[14px] font-semibold text-t1">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[14px] leading-[1.65] text-t2">
                        {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 max-w-[360px] md:ml-auto">
              <SheetStamp sheet="06 / 06" drawing="Assessment" />
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

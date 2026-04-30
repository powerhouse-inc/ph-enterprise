import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Bot,
  Cloud,
  Eye,
  FileText,
  History,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PROCUREMENT_CAPABILITIES,
  PROCUREMENT_COMPARISON_ROWS,
  PROCUREMENT_COMPETITORS,
  PROCUREMENT_CTAS,
  PROCUREMENT_DOCUMENT_MODELS,
  PROCUREMENT_FOOTER_HOOK,
  PROCUREMENT_HERO,
  PROCUREMENT_PROBLEMS,
  PROCUREMENT_REGULATIONS,
  PROCUREMENT_STATS,
  PROCUREMENT_VOLUME_PARAGRAPHS,
  PROCUREMENT_WORKFLOW_FEATURES,
} from "@/data/procurement";
import { cn } from "@/lib/utils";
import { SectionContainer } from "@/components/landing/section-container";

const capabilityIconMap = {
  bot: Bot,
  shield: ShieldCheck,
  cloud: Cloud,
  bell: BellRing,
} as const;

const regulationIconMap = [Scale, Eye, History] as const;

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-t3">
      <span
        className="h-[5px] w-[5px] rounded-full bg-[#F2CB29] shadow-[0_0_8px_rgba(242,203,41,0.45)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

function CtaLink({
  href,
  label,
  external,
  variant,
}: {
  href: string;
  label: string;
  external?: boolean;
  variant: "cta" | "outline";
}) {
  if (external) {
    return (
      <Button variant={variant} className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
        <a href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export function ProcurementPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        aria-hidden="true"
      >
        <div className="absolute left-[8%] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(242,203,41,0.16)_0%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[4%] top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_72%)] blur-3xl" />
      </div>

      <section className="relative overflow-hidden border-b border-border/70 pb-20 pt-16 md:pb-24 md:pt-20">
        <SectionContainer className="grid max-w-[1260px] items-start gap-14 xl:grid-cols-[minmax(0,0.96fr)_minmax(420px,1.04fr)]">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-t3">
              <span className="font-semibold uppercase tracking-[0.12em] text-[#F5D45B]">
                {PROCUREMENT_HERO.eyebrow}
              </span>
              <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />
              <span>Buyer-side workflow infrastructure</span>
            </div>

            <h1 className="max-w-[13ch] text-pretty text-[clamp(40px,5.2vw,70px)] font-[680] leading-[0.94] tracking-[-0.05em] text-t1 font-heading">
              {PROCUREMENT_HERO.headline[0]}
              <br />
              <span className="text-t2">{PROCUREMENT_HERO.headline[1]}</span>
            </h1>

            <p className="mt-8 max-w-[36rem] text-[16px] leading-[1.9] text-t2 md:text-[17px]">
              {PROCUREMENT_HERO.subhead}
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-3">
              <CtaLink
                href={PROCUREMENT_HERO.primaryCta.href}
                label={PROCUREMENT_HERO.primaryCta.label}
                external={PROCUREMENT_HERO.primaryCta.external}
                variant="cta"
              />
              <CtaLink
                href={PROCUREMENT_HERO.secondaryCta.href}
                label={PROCUREMENT_HERO.secondaryCta.label}
                variant="outline"
              />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
              <div className="mb-5 flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-t3">
                    Market asymmetry
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-t2">
                    AI suppliers flood the inbox. Buyers absorb the noise.
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(242,203,41,0.16)] bg-[rgba(242,203,41,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F5D45B]">
                  Your team
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_84px_1fr]">
                <div className="rounded-3xl border border-cyan-400/15 bg-[rgba(0,212,255,0.06)] p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-cyan-200/70">
                        Supplier side
                      </p>
                      <p className="mt-3 text-5xl font-[680] leading-none tracking-[-0.05em] text-cyan-200 font-heading">
                        79%
                      </p>
                    </div>
                    <div className="rounded-full bg-cyan-300/12 px-3 py-1 text-[11px] font-medium text-cyan-100">
                      AI-generated proposals
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    {[92, 84, 76, 68].map((width) => (
                      <div
                        key={width}
                        className="h-2.5 rounded-full bg-cyan-300/10"
                      >
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.9),rgba(0,212,255,0.28))]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <div className="relative flex h-full min-h-[240px] w-full items-center justify-center">
                    <div className="absolute inset-x-[38%] top-0 bottom-0 bg-[linear-gradient(180deg,rgba(242,203,41,0),rgba(242,203,41,0.5),rgba(242,203,41,0))]" />
                    <div className="rounded-full border border-[rgba(242,203,41,0.2)] bg-[rgba(242,203,41,0.08)] px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#F5D45B]">
                      The gap
                      <div className="mt-2 text-[13px] font-medium normal-case tracking-normal text-white/70">
                        your team
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-t3">
                        Buyer side
                      </p>
                      <p className="mt-3 text-5xl font-[680] leading-none tracking-[-0.05em] text-t1 font-heading">
                        4%
                      </p>
                    </div>
                    <div className="rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium text-t2">
                      Meaningful evaluation AI
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    {[18, 10, 6, 4].map((width) => (
                      <div
                        key={width}
                        className="h-2.5 rounded-full bg-white/8"
                      >
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(242,203,41,0.95),rgba(242,203,41,0.34))]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-[13px] leading-[1.65] text-t2">
                Proposal volume rises, signal quality falls, and the most valuable data in the workflow is too sensitive to send outside your control boundary.
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section id="what-changed" className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>What changed</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Procurement was a balanced market in 2023.
              <br />
              <span className="text-t2">It is not anymore.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {PROCUREMENT_VOLUME_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.body}
                className="max-w-[64ch] text-[15px] leading-[1.92] text-t2"
              >
                {paragraph.body}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PROCUREMENT_STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-[40px] font-[680] leading-none tracking-[-0.05em] text-t1 font-heading">
                  {stat.value}
                </div>
                <p className="mt-4 text-[13px] leading-[1.7] text-t2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>Why your data can&apos;t go to the cloud</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Negotiation positions and pricing data
              <br />
              <span className="text-t2">
                are your most sensitive competitive assets.
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROCUREMENT_PROBLEMS.map((problem) => (
              <article
                key={problem.title}
                className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-7"
              >
                <div className="mb-5 h-10 w-10 rounded-2xl border border-[rgba(242,203,41,0.22)] bg-[rgba(242,203,41,0.08)] text-[#F5D45B]">
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                  {problem.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-t2">
                  {problem.body}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="workflow" className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <SectionEyebrow>The procurement workflow on Powerhouse</SectionEyebrow>
              <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
                Local AI on your data.
                <br />
                <span className="text-t2">
                  Specification-driven evaluation. Audit-ready by default.
                </span>
              </h2>
            </div>
            <p className="max-w-[560px] text-[15px] leading-[1.8] text-t2">
              Powerhouse gives procurement teams a control plane for inbound
              evaluation, reviewer oversight, cloud-boundary enforcement, and
              post-award monitoring without sending negotiation intelligence to
              commodity AI tools.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PROCUREMENT_CAPABILITIES.map((capability) => {
              const Icon = capabilityIconMap[capability.icon];
              return (
                <article
                  key={capability.title}
                  className="rounded-3xl border border-white/10 bg-surface p-7 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/8 text-cyan-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.8] text-t2">
                    {capability.body}
                  </p>
                </article>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      <section className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>Built for the procurement workflow</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Document models, drive apps, and AI scopes
              <br />
              <span className="text-t2">designed for buyer-side procurement.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 xl:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-t1">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-t3">
                    Document models
                  </p>
                  <p className="mt-1 text-[14px] text-t2">
                    Typed business objects that shape the procurement graph.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {PROCUREMENT_DOCUMENT_MODELS.map((model) => (
                  <div
                    key={model.name}
                    className="rounded-2xl border border-white/8 bg-black/15 p-5"
                  >
                    <div className="text-[13px] font-semibold uppercase tracking-[0.09em] text-[#F5D45B]">
                      {model.name}
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.75] text-t2">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,212,255,0.08),rgba(255,255,255,0.02))] p-6 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/8 text-cyan-200">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-t3">
                    Workflow features
                  </p>
                  <p className="mt-1 text-[14px] text-t2">
                    Collaboration and approval boundaries built into the workflow itself.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {PROCUREMENT_WORKFLOW_FEATURES.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="relative overflow-hidden rounded-2xl border border-white/8 bg-[rgba(11,13,15,0.55)] p-5"
                  >
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-[linear-gradient(180deg,rgba(0,212,255,0.75),rgba(242,203,41,0.75))]" />
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[12px] font-semibold text-t2">
                        {index + 1}
                      </div>
                      <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[14px] leading-[1.75] text-t2">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>How procurement looks with Powerhouse</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Replace ad hoc evaluation work
              <br />
              <span className="text-t2">with a governed procurement operating layer.</span>
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["Dimension", "The current state", "With Powerhouse"].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-t3"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROCUREMENT_COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.dimension}
                      className={cn(
                        "align-top",
                        index < PROCUREMENT_COMPARISON_ROWS.length - 1
                          ? "border-b border-white/8"
                          : undefined,
                      )}
                    >
                      <th className="px-6 py-5 text-[14px] font-semibold tracking-tight text-t1">
                        {row.dimension}
                      </th>
                      <td className="px-6 py-5 text-[14px] leading-[1.75] text-t2">
                        {row.currentState}
                      </td>
                      <td className="px-6 py-5 text-[14px] leading-[1.75] text-t1">
                        {row.powerhouseState}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section id="compliance" className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>Compliance by architecture</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Procurement AI regulation is here.
              <br />
              <span className="text-t2">Powerhouse is already there.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROCUREMENT_REGULATIONS.map((regulation, index) => {
              const Icon = regulationIconMap[index];
              return (
                <article
                  key={regulation.title}
                  className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(242,203,41,0.18)] bg-[rgba(242,203,41,0.08)] text-[#F5D45B]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                    {regulation.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-t2">
                    {regulation.body}
                  </p>
                </article>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      <section className="border-b border-border py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>The tools you&apos;ve already evaluated</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              The supplier side is owned.
              <br />
              <span className="text-t2">The buyer side is open.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROCUREMENT_COMPETITORS.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/8 bg-white/[0.02] p-7 text-white/75"
              >
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white/82 font-heading">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-white/55">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="get-started" className="py-20 md:py-24">
        <SectionContainer>
          <div className="max-w-[760px]">
            <SectionEyebrow>Get started</SectionEyebrow>
            <h2 className="text-[clamp(34px,4vw,52px)] font-[680] leading-[1.04] tracking-[-0.04em] text-t1 font-heading">
              Start with readiness, platform fit,
              <br />
              <span className="text-t2">or a live procurement workflow demo.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 xl:grid-cols-3">
            {PROCUREMENT_CTAS.map((cta, index) => (
              <article
                key={cta.title}
                className={cn(
                  "rounded-[28px] border p-7",
                  index === 0
                    ? "border-cyan-400/18 bg-[linear-gradient(180deg,rgba(0,212,255,0.08),rgba(255,255,255,0.03))]"
                    : "border-white/10 bg-white/[0.03]",
                )}
              >
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                  {cta.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-t2">
                  {cta.body}
                </p>
                <div className="mt-7">
                  {cta.external ? (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-t1 transition-colors hover:text-[#F5D45B]"
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-t1 transition-colors hover:text-[#F5D45B]"
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[30px] border border-[rgba(242,203,41,0.18)] bg-[linear-gradient(135deg,rgba(242,203,41,0.08),rgba(255,255,255,0.03))] px-6 py-8 text-center md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5D45B]">
              Footer hook
            </p>
            <p className="mx-auto mt-4 max-w-[860px] text-[clamp(24px,3vw,36px)] font-[640] leading-[1.18] tracking-[-0.03em] text-t1 font-heading">
              {PROCUREMENT_FOOTER_HOOK}
            </p>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}

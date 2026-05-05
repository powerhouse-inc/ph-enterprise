import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileText,
  Gauge,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "@/components/landing/section-container";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import type { IndustryReport } from "@/data/industry-reports";
import type { CSSWithVars } from "@/lib/utils";

const reportIcons = {
  finance: BarChart3,
  legal: Scale,
  hr: Users,
} as const;

const driverIcons = [Bot, ShieldCheck, Gauge] as const;

function ReportNav({ report }: { report: IndustryReport }) {
  return (
    <header className="sticky top-0 z-200 h-[64px] border-b border-white/8 bg-[rgba(11,13,15,0.84)] backdrop-blur-[24px]">
      <SectionContainer className="flex h-full max-w-[1260px] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Powerhouse Enterprise"
        >
          <PowerhouseMark className="h-5 w-5 text-[rgba(243,245,247,0.7)]" />
          <span className="font-heading text-[15px] font-semibold tracking-tight text-t1">
            Powerhouse
          </span>
          <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-wide text-t3">
            {report.sector}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 rounded-md px-4 text-[13px] max-md:hidden" asChild>
            <Link href="/#use-cases">Industries</Link>
          </Button>
          <Button variant="cta" className="h-8 rounded-md px-4 text-[13px]" asChild>
            <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">
              Demo
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}

function SourceLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-t3 underline decoration-white/15 underline-offset-4 transition-colors hover:text-t1"
    >
      {children}
    </a>
  );
}

export function IndustryReportPage({ report }: { report: IndustryReport }) {
  const ReportIcon = reportIcons[report.slug];

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <ReportNav report={report} />

      <main
        className="relative overflow-hidden"
        style={
          {
            "--report-accent": report.accent,
            "--report-accent-soft": report.accentSoft,
            "--report-secondary": report.secondaryAccent,
          } as CSSWithVars
        }
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true">
          <div className="absolute left-[6%] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--report-accent-soft)_0%,transparent_72%)] blur-3xl" />
          <div className="absolute right-[10%] top-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.09)_0%,transparent_72%)] blur-3xl" />
        </div>

        <section className="relative border-b border-border py-14 md:py-16 xl:min-h-[calc(100svh-64px)] xl:py-12">
          <SectionContainer className="grid max-w-[1260px] gap-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)]">
            <div className="relative z-10 flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-t3">
                <ReportIcon className="h-4 w-4 text-[var(--report-accent)]" aria-hidden="true" />
                <span className="font-semibold uppercase tracking-[0.12em] text-[var(--report-accent)]">
                  {report.sector}
                </span>
                <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />
                <span>{report.eyebrow}</span>
              </div>

              <h1 className="max-w-[13ch] text-pretty text-[clamp(38px,5.1vw,68px)] font-[680] leading-[0.96] tracking-[-0.05em] text-t1 font-heading">
                {report.headline}
              </h1>

              <p className="mt-7 max-w-[38rem] text-[16px] leading-[1.82] text-t2 md:text-[17px]">
                {report.subhead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="cta" className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
                  <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">
                    Request a demo
                  </Link>
                </Button>
                <Button variant="outline" className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
                  <Link href="/#platform">See the platform</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] md:p-7">
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-white/8 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--report-accent-soft)] bg-[var(--report-accent-soft)] text-[var(--report-accent)]">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-t3">
                        Sector snapshot
                      </p>
                      <p className="mt-1 text-[14px] text-t2">
                        2026 executive brief
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-[15px] leading-[1.82] text-t2">
                    {report.snapshot.map((sentence) => (
                      <p key={sentence}>{sentence}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-t1">
                      <BarChart3 className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-t3">
                        Critical metrics
                      </p>
                      <p className="mt-1 text-[14px] text-t2">
                        Ratios, growth, and market pressure
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-white/8">
                    {report.metrics.map((metric) => (
                      <div key={metric.value} className="grid gap-4 py-4 first:pt-0 md:grid-cols-[128px_1fr]">
                        <div className="font-heading text-[34px] font-[680] leading-none tracking-[-0.05em] text-t1">
                          {metric.value}
                        </div>
                        <div>
                          <p className="text-[14px] leading-[1.64] text-t2">
                            {metric.label}
                          </p>
                          <p className="mt-2 text-[12px] text-t3">
                            Source:{" "}
                            <SourceLink href={metric.sourceHref}>
                              {metric.source}
                            </SourceLink>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid gap-5 xl:col-span-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
              <div>
                <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-t3">
                  <span className="h-[5px] w-[5px] rounded-full bg-[var(--report-accent)] shadow-[0_0_8px_var(--report-accent)]" aria-hidden="true" />
                  Key 2026 drivers
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  {report.drivers.map((driver, index) => {
                    const Icon = driverIcons[index];
                    return (
                      <article
                        key={driver.title}
                        className="rounded-3xl border border-white/10 bg-surface p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)]"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--report-accent-soft)] bg-[var(--report-accent-soft)] text-[var(--report-accent)]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                          {driver.title}
                        </h2>
                        <p className="mt-3 text-[14px] leading-[1.7] text-t2">
                          {driver.body}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <aside className="rounded-[28px] border border-[color:var(--report-accent-soft)] bg-[linear-gradient(135deg,var(--report-accent-soft),rgba(255,255,255,0.03))] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/15 text-t1">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[var(--report-accent)]">
                      Operational mandate
                    </p>
                    <p className="mt-1 text-[14px] text-t2">
                      {report.mandateLabel}
                    </p>
                  </div>
                </div>
                <p className="text-[15px] leading-[1.78] text-t1">
                  {report.mandate}
                </p>
                <Link
                  href="mailto:hello@powerhouse.inc?subject=Enterprise%20Workflow%20Planning"
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-t1 transition-colors hover:text-[var(--report-accent)]"
                >
                  Start a workflow discussion
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>
            </div>

            <div className="relative z-10 xl:col-span-2">
              <div className="border-t border-white/8 pt-4 text-[12px] leading-[1.8] text-t3">
                Sources:{" "}
                {report.sources.map((source, index) => (
                  <span key={source.href}>
                    <SourceLink href={source.href}>{source.label}</SourceLink>
                    {index < report.sources.length - 1 ? " / " : ""}
                  </span>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

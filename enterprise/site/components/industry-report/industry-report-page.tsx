import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "@/components/landing/section-container";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { CTA_LABEL, CTA_URL } from "@/lib/site";
import type { IndustryReport } from "@/data/industry-reports";

function ReportNav({ report }: { report: IndustryReport }) {
  return (
    <header className="sticky top-0 z-200 h-[64px] border-b border-white/8 bg-[rgba(11,13,15,0.84)] backdrop-blur-[24px]">
      <SectionContainer className="flex h-full max-w-[1180px] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Powerhouse Enterprise"
        >
          <PowerhouseMark className="h-5 w-5 text-[rgba(243,245,247,0.7)]" />
          <span className="font-heading text-[15px] font-semibold tracking-normal text-t1">
            Powerhouse
          </span>
          <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-normal text-t3">
            {report.sector}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 rounded-md px-4 text-[13px] max-md:hidden" asChild>
            <Link href="/architecture">Architecture</Link>
          </Button>
          <Button variant="cta" className="h-8 rounded-md px-4 text-[13px]" asChild>
            <a href={CTA_URL} target="_blank" rel="noreferrer">{CTA_LABEL}</a>
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
  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <ReportNav report={report} />

      <main className="relative">
        {/* 1. Hero */}
        <section className="border-b border-border py-24 md:py-28">
          <SectionContainer className="max-w-[1180px]">
            <h1 className="max-w-[18ch] text-pretty text-[clamp(36px,4.6vw,60px)] font-[680] leading-[1.02] tracking-normal text-t1 font-heading">
              {report.headline}
            </h1>
            <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.78] text-t2 md:text-[17px]">
              {report.subhead}
            </p>
          </SectionContainer>
        </section>

        {/* 2. By the numbers */}
        <section className="border-b border-border py-20 md:py-24">
          <SectionContainer className="max-w-[1180px]">
            <h2 className="mb-12 text-[13px] font-semibold uppercase tracking-normal text-t3">
              By the numbers
            </h2>
            <div className="grid grid-cols-3 gap-x-10 gap-y-12 max-lg:grid-cols-1">
              {report.metrics.map((metric) => (
                <div key={metric.value}>
                  <div className="font-heading text-[clamp(40px,4.4vw,56px)] font-[680] leading-none tracking-normal text-t1">
                    {metric.value}
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.68] text-t2">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-[12px] text-t3">
                    <SourceLink href={metric.sourceHref}>{metric.source}</SourceLink>
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* 3. 2026 drivers */}
        <section className="border-b border-border py-20 md:py-24">
          <SectionContainer className="max-w-[1180px]">
            <h2 className="mb-12 text-[13px] font-semibold uppercase tracking-normal text-t3">
              Key 2026 drivers
            </h2>
            <div className="grid grid-cols-3 gap-x-10 gap-y-10 max-lg:grid-cols-1">
              {report.drivers.map((driver) => (
                <div key={driver.title}>
                  <h3 className="text-[17px] font-semibold tracking-normal text-t1 mb-3 font-heading">
                    {driver.title}
                  </h3>
                  <p className="text-[14px] leading-[1.72] text-t2">
                    {driver.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* 4. What this means + sources */}
        <section className="py-20 md:py-24">
          <SectionContainer className="max-w-[1180px]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-normal text-t3">
                  {report.mandateLabel}
                </h2>
              </div>
              <div>
                <p className="text-[17px] leading-[1.72] text-t1 font-heading font-[520]">
                  {report.mandate}
                </p>
                <div className="mt-8">
                  <Link href="/architecture" className="text-[13px] font-medium text-t2 hover:text-t1 transition-colors">
                    See the platform &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-border pt-5 text-[12px] leading-[1.8] text-t3">
              Sources:{" "}
              {report.sources.map((source, index) => (
                <span key={source.href}>
                  <SourceLink href={source.href}>{source.label}</SourceLink>
                  {index < report.sources.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

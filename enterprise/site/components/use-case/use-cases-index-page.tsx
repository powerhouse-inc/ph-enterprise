import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "@/components/landing/section-container";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { USE_CASE_DETAILS, USE_CASE_ORDER } from "@/data/use-cases-detail";
import type { CSSWithVars } from "@/lib/utils";

function IndexNav() {
  return (
    <header className="sticky top-0 z-200 h-[64px] border-b border-white/8 bg-[rgba(11,13,15,0.84)] backdrop-blur-[24px]">
      <SectionContainer className="flex h-full max-w-[1180px] items-center justify-between gap-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label="Powerhouse Enterprise">
          <PowerhouseMark className="h-5 w-5 text-[rgba(243,245,247,0.7)]" />
          <span className="font-heading text-[15px] font-semibold tracking-tight text-t1">
            Powerhouse
          </span>
          <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-wide text-t3">Use Cases</span>
        </Link>
        <Button variant="cta" className="h-8 rounded-md px-4 text-[13px]" asChild>
          <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">Demo</Link>
        </Button>
      </SectionContainer>
    </header>
  );
}

export function UseCasesIndexPage() {
  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <IndexNav />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true">
          <div className="absolute left-[10%] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.10)_0%,transparent_72%)] blur-3xl" />
          <div className="absolute right-[12%] top-20 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(122,58,255,0.10)_0%,transparent_72%)] blur-3xl" />
        </div>

        <section className="relative py-16 md:py-24">
          <SectionContainer className="max-w-[1180px]">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-t3 transition-colors hover:text-t1"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Home
            </Link>

            <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-t3">
              <span className="h-[5px] w-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
              Use cases
            </div>

            <h1 className="max-w-[18ch] text-[clamp(38px,4.6vw,62px)] font-[680] leading-[1.0] tracking-[-0.05em] text-t1 font-heading">
              One framework.
              <br />
              <span className="text-t2">Many domains.</span>
            </h1>

            <p className="mt-7 max-w-[48rem] text-[16px] leading-[1.8] text-t2 md:text-[17px]">
              A few of the things teams have built on Powerhouse. Different problems, same
              building blocks — document models, configurable state, signed operation history,
              and live editors and dashboards.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {USE_CASE_ORDER.map((slug) => {
                const uc = USE_CASE_DETAILS[slug];
                return (
                  <Link
                    key={slug}
                    href={`/use-cases/${slug}`}
                    className="group relative flex h-full flex-col rounded-3xl border border-border bg-surface p-7 transition-all hover:border-border-md"
                    style={{ "--uc-accent": uc.accent } as CSSWithVars}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--uc-accent)]">
                      {uc.domain}
                    </span>
                    <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-t1 font-heading">
                      {uc.title}
                    </h2>
                    <p className="mt-3 text-[14px] leading-[1.72] text-t2">{uc.oneLiner}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium text-t3 transition-colors group-hover:text-t1">
                      Explore the use case
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

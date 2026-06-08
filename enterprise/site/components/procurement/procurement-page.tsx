"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Bot,
  Cloud,
  Eye,
  History,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/landing/section-container";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { cn } from "@/lib/utils";
import {
  PROCUREMENT_CAPABILITIES,
  PROCUREMENT_COMPARISON_ROWS,
  PROCUREMENT_CTAS,
  PROCUREMENT_FOOTER_HOOK,
  PROCUREMENT_HERO,
  PROCUREMENT_PROBLEMS,
  PROCUREMENT_REGULATIONS,
} from "@/data/procurement";

const capabilityIconMap = {
  bot: Bot,
  shield: ShieldCheck,
  cloud: Cloud,
  bell: BellRing,
} as const;

const regulationIcons = [Scale, Eye, History] as const;

const ACCENT = "#F5D45B";

function SectionHeading({ line1, line2 }: { line1: ReactNode; line2: ReactNode }) {
  return (
    <h2 className="fade-up max-w-[20ch] text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
      {line1}
      <br />
      <span className="text-t2">{line2}</span>
    </h2>
  );
}

export function ProcurementPage() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  const { primaryCta, secondaryCta } = PROCUREMENT_HERO;

  return (
    <main ref={rootRef} className="relative">
      {/* Hero */}
      <section className="py-24 md:py-28">
        <SectionContainer>
          <div className="fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 text-[12px] text-t3">
            <span
              className="font-semibold uppercase tracking-[0.12em]"
              style={{ color: ACCENT }}
            >
              {PROCUREMENT_HERO.eyebrow}
            </span>
            <span className="h-3.5 w-px bg-border-md" aria-hidden="true" />
            <span>Buyer-side workflow infrastructure</span>
          </div>

          <h1 className="fade-up max-w-[16ch] text-pretty text-[clamp(38px,5vw,66px)] font-[680] leading-[0.98] tracking-[-0.05em] text-t1 font-heading">
            {PROCUREMENT_HERO.headline[0]}
            <br />
            <span className="text-t2">{PROCUREMENT_HERO.headline[1]}</span>
          </h1>

          <p className="fade-up mt-8 max-w-[60ch] text-[16px] leading-[1.8] text-t2 md:text-[17px]">
            {PROCUREMENT_HERO.subhead}
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3">
            <Button
              variant="cta"
              className="h-10 rounded-md px-5 text-[13px] font-medium"
              asChild
            >
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-md px-5 text-[13px] font-medium"
              asChild
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>

          {/* The asymmetry — the aha, instantly readable */}
          <div className="fade-up mt-16 grid max-w-[680px] gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-t3">
                Supplier side
              </p>
              <p
                className="mt-3 text-[56px] font-[680] leading-none tracking-[-0.05em] font-heading"
                style={{ color: ACCENT }}
              >
                79%
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-t2">
                use AI to draft their proposals
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-t3">
                Buyer side
              </p>
              <p className="mt-3 text-[56px] font-[680] leading-none tracking-[-0.05em] text-t1 font-heading">
                4%
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-t2">
                have meaningful AI to evaluate them
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Why local */}
      <section id="why-local" className="py-24 border-t border-border">
        <SectionContainer>
          <SectionHeading
            line1="Negotiation positions and pricing data"
            line2="are your most sensitive competitive assets."
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-3">
            {PROCUREMENT_PROBLEMS.map((problem) => (
              <div
                key={problem.title}
                className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md"
              >
                <h3 className="text-[16px] font-semibold tracking-tight text-t1 mb-3 font-heading">
                  {problem.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-t2">
                  {problem.body}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* The workflow */}
      <section id="workflow" className="py-24 border-t border-border">
        <SectionContainer>
          <SectionHeading
            line1="Local AI on your data."
            line2="Specification-driven evaluation, audit-ready by default."
          />

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {PROCUREMENT_CAPABILITIES.map((capability) => {
              const Icon = capabilityIconMap[capability.icon];
              return (
                <div
                  key={capability.title}
                  className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-t2">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <h3 className="text-[16px] font-semibold tracking-tight text-t1 font-heading">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-t2">
                    {capability.body}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Comparison */}
      <section className="py-24 border-t border-border">
        <SectionContainer>
          <SectionHeading
            line1="Replace ad hoc evaluation work"
            line2="with a governed procurement layer."
          />

          <div className="fade-up mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["Dimension", "Current state", "With Powerhouse"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-t3"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {PROCUREMENT_COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.dimension}
                      className={cn(
                        "align-top",
                        index < PROCUREMENT_COMPARISON_ROWS.length - 1 &&
                          "border-b border-border",
                      )}
                    >
                      <th className="w-[170px] px-6 py-5 text-[13px] font-semibold tracking-tight text-t1">
                        {row.dimension}
                      </th>
                      <td className="px-6 py-5 text-[13px] leading-[1.7] text-t2">
                        {row.currentState}
                      </td>
                      <td className="px-6 py-5 text-[13px] leading-[1.7] text-t1">
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

      {/* Compliance */}
      <section id="compliance" className="py-24 border-t border-border">
        <SectionContainer>
          <SectionHeading
            line1="Procurement AI regulation is here."
            line2="Powerhouse is already there."
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-3">
            {PROCUREMENT_REGULATIONS.map((regulation, index) => {
              const Icon = regulationIcons[index];
              return (
                <div
                  key={regulation.title}
                  className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-t2 mb-4">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="text-[16px] font-semibold tracking-tight text-t1 mb-3 font-heading">
                    {regulation.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-t2">
                    {regulation.body}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Get started */}
      <section id="get-started" className="py-24 border-t border-border">
        <SectionContainer>
          <SectionHeading
            line1="Start with planning, platform fit,"
            line2="or a live procurement demo."
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-3">
            {PROCUREMENT_CTAS.map((cta) => (
              <div
                key={cta.title}
                className="fade-up flex flex-col rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md"
              >
                <h3 className="text-[16px] font-semibold tracking-tight text-t1 font-heading">
                  {cta.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-t2">
                  {cta.body}
                </p>
                <div className="mt-6">
                  {cta.external ? (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-t1 transition-colors hover:text-[#F5D45B]"
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-t1 transition-colors hover:text-[#F5D45B]"
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="fade-up mt-14 border-t border-border pt-12 text-center">
            <p className="mx-auto max-w-[760px] text-[clamp(22px,2.6vw,32px)] font-[640] leading-[1.2] tracking-[-0.03em] text-t1 font-heading">
              {PROCUREMENT_FOOTER_HOOK}
            </p>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}

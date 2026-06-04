"use client";

import { useRef } from "react";
import { X, Check } from "lucide-react";
import { COMPARISON_ROWS } from "@/data/comparison";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function ComparisonSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        {/* Header */}
        <div className="mb-8 fade-up max-w-[620px]">
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span
              className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]"
              aria-hidden="true"
            />
            Comparison
          </div>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-4">
            Your vendors are adding AI.
            <br />
            <span className="text-t2">But on whose terms?</span>
          </h2>
          <p className="text-[15px] leading-[1.72] text-t2">
            Many incumbent vendors are adding
            AI to systems originally designed for non-autonomous workflows &mdash;
            and process customer data on their own infrastructure. Powerhouse
            takes a different approach.
          </p>
        </div>

        {/* Comparison table */}
        <div className="fade-up">
          {/* Column headers — desktop only */}
          <div className="grid grid-cols-[1fr_1fr] gap-3 mb-2 max-md:hidden" style={{ paddingLeft: "clamp(120px, 14vw, 168px)" }}>
            <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-t3 px-5">
              Cloud AI + Legacy
            </div>
            <div className="text-[11px] font-semibold tracking-[0.06em] uppercase px-5 gradient-text">
              Powerhouse
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-1.5">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.dimension}
                className="comparison-row group rounded-xl border border-transparent hover:border-border-md transition-colors"
              >
                <div className="grid grid-cols-[clamp(120px,14vw,168px)_1fr_1fr] gap-3 items-stretch max-md:grid-cols-1 max-md:gap-0">
                  {/* Dimension label */}
                  <div className="flex items-center px-4 py-4 max-md:pb-2 max-md:pt-4">
                    <span className="text-[13px] font-semibold text-t1 tracking-tight">
                      {row.dimension}
                    </span>
                  </div>

                  {/* Legacy cell */}
                  <div className="relative flex items-start gap-3 rounded-lg bg-surface/60 border border-border px-5 py-4 max-md:rounded-b-none max-md:border-b-0 max-md:mx-4">
                    <span className="mt-0.5 shrink-0" aria-hidden="true">
                      <X className="w-3.5 h-3.5 text-red-400/70" />
                    </span>
                    <span className="text-[13px] leading-[1.68] text-t3 md:hidden font-semibold mr-1">
                      Legacy:
                    </span>
                    <span className="text-[13px] leading-[1.68] text-t2">
                      {row.legacy}
                    </span>
                  </div>

                  {/* Powerhouse cell */}
                  <div className="relative flex items-start gap-3 rounded-lg border border-brand-low bg-brand-low/40 px-5 py-4 max-md:rounded-t-none max-md:border-t-0 max-md:mx-4 max-md:mb-4">
                    <span className="mt-0.5 shrink-0" aria-hidden="true">
                      <Check className="w-3.5 h-3.5 text-brand" />
                    </span>
                    <span className="text-[13px] leading-[1.68] text-t3 md:hidden font-semibold mr-1">
                      Powerhouse:
                    </span>
                    <span className="text-[13px] leading-[1.68] text-t1">
                      {row.powerhouse}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

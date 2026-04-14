"use client";

import { useRef } from "react";
import { PRIVACY_FEATURES } from "@/data/privacy";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function PrivacySection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="privacy" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
            Privacy &amp; Compliance
          </div>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            Built into the architecture.
            <br />
            <span className="text-t2">Not bolted on.</span>
          </h2>
          <p className="text-[15px] leading-[1.72] text-t3 mt-3 max-w-[480px]">
            The section your CTO sends to the DPO, legal counsel, and compliance team.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {PRIVACY_FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="fade-up rounded-2xl bg-surface border border-border p-7 transition-all hover:border-border-md"
            >
              <h3 className="text-base font-semibold tracking-tight text-t1 mb-3 font-heading">
                {feat.title}
              </h3>
              <p className="text-sm leading-[1.72] text-t2">
                {feat.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 fade-up">
          <a
            href="https://bai.powerhouse.io"
            className="text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
          >
            Get a privacy impact analysis for your AI initiative &rarr;
          </a>
        </div>
      </SectionContainer>
    </section>
  );
}

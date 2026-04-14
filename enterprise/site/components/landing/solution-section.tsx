"use client";

import { useRef } from "react";
import { SOLUTION_PILLARS } from "@/data/solution";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const accentColors: Record<string, string> = {
  cyan: "#00D4FF",
  purple: "#7A3AFF",
  gradient: "linear-gradient(135deg, #00D4FF, #7A3AFF)",
};

export function SolutionSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="solution" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
            The Solution
          </div>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            Private data. AI-native.
            <br />
            <span className="text-t2">Real-time.</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {SOLUTION_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="fade-up relative rounded-2xl bg-surface border border-border p-8 transition-all hover:border-border-md group"
            >
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: pillar.accent === "gradient"
                    ? accentColors.gradient
                    : accentColors[pillar.accent],
                }}
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold tracking-tight text-t1 mb-3 font-heading">
                {pillar.title}
              </h3>
              <p className="text-sm leading-[1.72] text-t2">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

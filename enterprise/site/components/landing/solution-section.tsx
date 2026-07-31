"use client";

import { useRef } from "react";
import { SOLUTION_PILLARS } from "@/data/solution";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function SolutionSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="solution" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
          <p className="mb-4 text-[15px] font-medium text-t3">
            How Powerhouse works.
          </p>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            Structure the workflow.
            <br />
            <span className="text-t2">Put AI to work.</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-[15px] leading-[1.72] text-t2">
            Powerhouse models the objects, permissions, approvals, and history
            behind a workflow, then makes that operational context available to
            your team and scoped AI agents.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-10 gap-y-12 border-t border-border pt-10 max-lg:grid-cols-1 max-lg:gap-y-10">
          {SOLUTION_PILLARS.map((pillar) => (
            <div key={pillar.title} className="fade-up">
              <h3 className="text-[17px] font-semibold tracking-tight text-t1 mb-3 font-heading">
                {pillar.title}
              </h3>
              <p className="text-[14px] leading-[1.72] text-t2">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const WHY_ITEMS = [
  {
    title: "Private deployment options",
    body: "Choose local, self-hosted, or managed deployment according to the sensitivity and operational requirements of each workflow.",
  },
  {
    title: "Open-source stack",
    body: "Powerhouse is the open-source platform for owned operational software. Your team can inspect, extend, and operate the system.",
  },
  {
    title: "Portable data and schemas",
    body: "The useful asset is the structured workflow: data, schema, permissions, approvals, and history in formats you can keep.",
  },
  {
    title: "Model choice",
    body: "Scope assistance to the model and deployment path that fits the task, then change that choice as needs and policy evolve.",
  },
  {
    title: "No rip-and-replace requirement",
    body: "Powerhouse connects to existing systems and turns the valuable workflow into owned software over time.",
  },
];

export function WhySection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section
      ref={rootRef}
      id="ownership"
      className="border-t border-border-light bg-paper py-24 text-copy"
    >
      <SectionContainer>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.86fr_1fr] md:gap-16">
          <div className="fade-up md:sticky md:top-28 md:self-start">
            <p className="mb-4 text-[14px] font-medium text-copy-muted">
              Why ownership matters.
            </p>
            <h2 className="font-heading mb-5 text-[clamp(34px,4vw,54px)] font-[680] leading-[1.04] text-copy">
              You own the boundary,
              <br />
              the schema, and the history.
            </h2>
            <div className="space-y-4 text-[16px] leading-[1.7] text-copy-muted">
              <p>
                Powerhouse creates a controlled software boundary around the
                workflow. You decide who and what can access its data, where it
                is stored, which actions require approval, and how history is
                retained.
              </p>
              <p>
                There is no rip-and-replace requirement. Powerhouse connects to
                existing systems and gives your team model choice as the workflow
                matures.
              </p>
            </div>
          </div>

          <div className="fade-up divide-y divide-border-light border-y border-border-light">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[28px_1fr] gap-5 gap-y-2 py-6 sm:grid-cols-[32px_220px_1fr]"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-proof"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-[16px] font-semibold text-copy">
                  {item.title}
                </h3>
                <p className="col-span-2 text-[14px] leading-[1.7] text-copy-muted sm:col-span-1">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

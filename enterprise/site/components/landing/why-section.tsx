"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

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
      id="why-powerhouse"
      className="border-t border-border-light bg-paper py-20 text-copy"
    >
      <SectionContainer>
        <SectionHeading
          className="fade-up"
          title={
            <>
              Adopt it on your terms,
              <br className="max-sm:hidden" /> next to what you already run.
            </>
          }
          lead="Deployment, tooling, and model choices stay with your team. Powerhouse connects to your existing systems instead of asking you to replace them."
        />

        <div className="fade-up mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-[16px] border border-border-light bg-white p-6"
            >
              <CheckCircle2
                className="mb-4 h-5 w-5 text-proof"
                aria-hidden="true"
              />
              <h3 className="font-heading mb-2 text-[16px] font-semibold text-copy">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-copy-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

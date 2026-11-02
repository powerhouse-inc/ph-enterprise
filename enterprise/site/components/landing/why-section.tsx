"use client";

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
    body: "The platform is open source, so your team can inspect, extend and operate every part of it.",
  },
  {
    title: "Model choice",
    body: "Scope assistance to the model and deployment path that fits the task, then change that choice as needs and policy evolve.",
  },
  {
    title: "No rip-and-replace requirement",
    body: "Your current systems keep running. Powerhouse takes over one workflow at a time, starting with the one that matters most.",
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
          title="Powerhouse runs beside your current systems, one workflow at a time."
          lead="Deployment, tooling and model choices stay with your team."
        />

        {/* A ruled list, not four identical icon cards (DESLOP finding 1). */}
        <dl className="fade-up mt-12 grid grid-cols-1 border-t border-border-light lg:grid-cols-2 lg:gap-x-16">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-b border-border-light py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <dt className="font-heading text-[17px] leading-[1.4] font-medium text-copy">
                {item.title}
              </dt>
              <dd className="text-[15px] leading-[1.65] text-pretty text-copy-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}

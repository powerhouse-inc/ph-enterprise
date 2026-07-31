"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const WHY_ITEMS: { title: string; body: ReactNode }[] = [
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
    title: "Production evidence",
    body: (
      <>
        <span
          className="font-medium text-[#7A3AFF]"
          style={{ WebkitTextStroke: "0.1px #000" }}
        >
          Achra
        </span>{" "}
        and{" "}
        <span
          className="font-medium text-[#04C161]"
          style={{ WebkitTextStroke: "0.1px #000" }}
        >
          Vetra
        </span>{" "}
        run on Powerhouse architecture. Powerhouse architecture already supports
        22 business modules. In one measured deployment, an invoice-review
        workflow reduced review time by 65%.
      </>
    ),
  },
];

export function WhySection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="ownership" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="grid grid-cols-[1fr_1fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
          <div className="fade-up md:sticky md:top-28 md:self-start">
            <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-5">
              Keep the workflow
              <br />
              <span className="text-t2">and its data under your control.</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.72] text-t2">
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

          <div className="space-y-3">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col"
              >
                <h3 className="text-[15px] font-semibold tracking-tight text-t1 mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.68] text-t2">
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

"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const WHY_ITEMS: { title: string; body: ReactNode }[] = [
  {
    title: "Production-proven",
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
        run on the same
        Powerhouse architecture available to you. When we demo the platform,
        we&rsquo;re showing production systems.
      </>
    ),
  },
  {
    title: "Built on your team\u2019s stack",
    body: "TypeScript, React, GraphQL, and Node.js. Your engineers can inspect, extend, and operate the system using technologies they already know.",
  },
  {
    title: "Shape the roadmap",
    body: "Early enterprise partners work directly with the builders of the platform. Your requirements influence product direction, integrations, and deployment patterns.",
  },
  {
    title: "Open source. No lock-in.",
    body: "Your data is JSON, your schemas are TypeScript, and the stack is open source. No proprietary format and no hosted service you can\u2019t replicate.",
  },
];

export function WhySection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="grid grid-cols-[1fr_1fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
          {/* Left — anchored copy */}
          <div className="fade-up md:sticky md:top-28 md:self-start">
<h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-normal text-t1 font-heading mb-5">
              We build on
              <br />
              <span className="text-t2">what we ship.</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.72] text-t2">
              <p>
                Powerhouse was built in production for multi-stakeholder
                operations.
              </p>
              <p>
                Since 2021, we&apos;ve developed open-source infrastructure for
                AI-native workflows, with enterprise support through direct access
                to the product team, hands-on implementation, and contractual SLAs.
              </p>
            </div>
          </div>

          {/* Right — proof cards */}
          <div className="space-y-3">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col"
              >
                <h3 className="text-[15px] font-semibold tracking-normal text-t1 mb-2 font-heading">
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

"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const WHY_ITEMS = [
  {
    title: "Production-proven",
    body: "Achra and Vetra run on the same Powerhouse architecture available to you. When we demo the platform, we\u2019re showing production systems \u2014 not a sandbox.",
    tags: ["DOGFOODED", "PRODUCTION-PROVEN"],
  },
  {
    title: "Built on your team\u2019s stack",
    body: "TypeScript, React, GraphQL, and Node.js. Your engineers can inspect, extend, and operate the system using technologies they already know.",
    tags: ["TYPESCRIPT", "REACT", "GRAPHQL", "NODE.JS"],
  },
  {
    title: "Shape the roadmap",
    body: "Early enterprise partners work directly with the builders of the platform. Your requirements influence product direction, integrations, and deployment patterns.",
    tags: ["CO-CREATION", "DIRECT ACCESS", "FIRST-MOVER"],
  },
  {
    title: "Open source. No lock-in.",
    body: "Your data is JSON, your schemas are TypeScript, and the stack is open source. No proprietary format. No hosted service you can\u2019t replicate.",
    tags: ["OPEN SOURCE", "JSON DATA", "NO LOCK-IN"],
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
            <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
              <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
              Why Powerhouse
            </div>
            <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-5">
              We build on
              <br />
              <span className="text-t2">what we ship.</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.72] text-t2">
              <p>
                Powerhouse was built in production for multi-stakeholder
                operations &mdash; not in a lab.
              </p>
              <p>
                Since 2021, we&apos;ve developed open-source infrastructure for
                AI-native workflows, with enterprise support
                through <strong className="text-t1">BAI</strong>: direct access
                to the team, hands-on implementation, and contractual SLAs.
              </p>
            </div>
            <a
              href="https://bai.powerhouse.io"
              className="inline-block mt-6 text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
            >
              Start the conversation &rarr;
            </a>
          </div>

          {/* Right — proof cards */}
          <div className="space-y-3">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col"
              >
                <h3 className="text-[15px] font-semibold tracking-tight text-t1 mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.68] text-t2 mb-4">
                  {item.body}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-[0.06em] text-t2/60 border border-white/[0.08] bg-white/[0.03] rounded-full px-2.5 py-1 leading-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

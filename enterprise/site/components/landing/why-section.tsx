"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "./section-container";

const WHY_ITEMS = [
  {
    title: "We build on what we ship",
    body: "Powerhouse runs its business on the same infrastructure available to you. Achra and Vetra are Powerhouse applications — same architecture, same components, same agent infrastructure. When we demo the platform, we're showing you our production systems.",
    chips: ["Dogfooding", "Production-proven"],
  },
  {
    title: "Your team already knows the stack",
    body: "TypeScript, React, GraphQL, Node.js. The Powerhouse architecture is a design pattern on top of technologies your engineers use daily.",
    chips: ["TypeScript", "React", "GraphQL", "Node.js"],
  },
  {
    title: "Early means advantage",
    body: "Direct access to the team that builds the platform, a co-creation partnership where your requirements shape the product, and a head start before your competitors adopt the same approach. Your feature requests go directly to the engineering roadmap.",
    chips: ["Co-creation", "Direct access", "First-mover"],
  },
  {
    title: "Open source is your insurance",
    body: "Your data (JSON), your schemas (TypeScript), and your code remain yours. The entire stack is open source. No proprietary format, no hosted service you can't replicate.",
    chips: ["Open source", "JSON data", "No lock-in"],
  },
];

export function WhySection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="grid grid-cols-[1fr_1fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
          <div className="fade-up">
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
                Powerhouse grew out of building operational infrastructure for MakerDAO &mdash;
                one of the most complex decentralized organizations in the world. That
                experience is where the reactive document architecture was born.
              </p>
              <p>
                We&apos;ve been building open-source tools for AI-native operations since 2021.
                Enterprise support through <strong className="text-t1">BAI</strong> with
                contractual SLAs &mdash; a working relationship with the engineering team,
                not a ticket queue.
              </p>
            </div>
            <a
              href="https://bai.powerhouse.io"
              className="inline-block mt-5 text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
            >
              Start the conversation &rarr;
            </a>
          </div>

          <div className="space-y-4">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="fade-up rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md"
              >
                <h3 className="text-sm font-semibold tracking-tight text-t1 mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.68] text-t2 mb-3">
                  {item.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.chips.map((chip) => (
                    <Badge
                      key={chip}
                      variant="outline"
                      className="text-[10px] font-semibold tracking-[0.06em] uppercase text-t3 border-border rounded-full px-2.5 py-0.5 h-auto"
                    >
                      {chip}
                    </Badge>
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

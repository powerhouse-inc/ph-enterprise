"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TIMING, SCROLL_START } from "@/lib/constants";
import { SectionContainer } from "./section-container";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const cs = contextSafe!;
      const h2 = headingRef.current;
      const body = bodyRef.current;
      if (!h2 || !body) return;

      ScrollTrigger.create({
        trigger: h2,
        start: SCROLL_START.HEADING,
        onEnter: cs(() => {
          gsap.to(h2, {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            ...TIMING.HEADING_REVEAL,
          });
        }),
      });

      ScrollTrigger.create({
        trigger: body,
        start: SCROLL_START.LEDE,
        onEnter: cs(() => {
          gsap.to(body, {
            opacity: 1,
            y: 0,
            ...TIMING.LEDE_FADE,
          });
        }),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="problem" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="grid grid-cols-[1fr_1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-8">
          <div>
            <h2
              ref={headingRef}
              className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 clip-reveal font-heading"
            >
              Every AI vendor
              <br />
              wants your data.
              <br />
              <span className="text-t2">Your regulators say no.</span>
            </h2>
          </div>

          <div
            ref={bodyRef}
            className="opacity-0 translate-y-4 space-y-5 pt-2"
          >
            <p className="text-[15px] leading-[1.72] text-t2">
              Enterprise AI adoption is stalling &mdash; not because the technology isn&apos;t
              ready, but because the deployment model is wrong. Commercial AI services
              require sending your data to external infrastructure for processing,
              fine-tuning, or retrieval. For organizations handling privileged legal
              communications, employee personal data, financial forecasts, or procurement
              negotiations, that&apos;s not a risk assessment &mdash; it&apos;s a non-starter.
            </p>
            <p className="text-[15px] leading-[1.72] text-t2">
              There&apos;s a third path: infrastructure that makes your business data
              AI-native <em>without it ever leaving your environment</em>. Not by
              replacing your existing systems &mdash; but by adding a structured layer
              that makes them AI-accessible, on your infrastructure, under your control.
            </p>
            <a
              href="https://bai.powerhouse.io"
              className="inline-block text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
            >
              Find out where you stand &mdash; get an AI readiness assessment &rarr;
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

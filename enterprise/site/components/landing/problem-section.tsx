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
        <div className="grid grid-cols-[1fr_1fr] gap-16 items-center max-md:grid-cols-1 max-md:gap-8 max-md:items-start">
          <div>
            <p className="mb-4 text-[15px] font-medium text-t3">
              Current reality.
            </p>
            <h2
              ref={headingRef}
              className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 clip-reveal font-heading"
            >
              Siloed data limits
              <br />
              what AI can deliver.
            </h2>
          </div>

          <div
            ref={bodyRef}
            className="opacity-0 translate-y-4 space-y-5"
          >
            <p className="text-[15px] leading-[1.72] text-t2">
              Critical workflows are spread across disconnected tools, with no
              shared structure, permissions, or history. AI sees fragments
              rather than the complete process, limiting accuracy and making
              automated actions difficult to trust. When teams move those
              fragments into external AI tools, confidential data can also leave
              the systems and controls designed to protect it.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

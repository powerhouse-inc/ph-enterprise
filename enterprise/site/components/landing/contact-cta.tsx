"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TIMING, SCROLL_START } from "@/lib/constants";
import { SectionContainer } from "./section-container";
import { BookCallButton } from "./book-call-button";

export function ContactCta() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const cs = contextSafe!;
      const h2 = headingRef.current;
      const actions = actionsRef.current;
      if (!h2 || !actions) return;

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
        trigger: h2,
        start: "top 80%",
        onEnter: cs(() => {
          gsap.to(actions, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: "power3.out",
          });
        }),
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      id="get-started"
      className="border-t border-border-light bg-paper py-28 text-copy md:py-36"
    >
      <SectionContainer>
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            ref={headingRef}
            className="font-heading mb-6 text-[clamp(38px,4.6vw,62px)] font-[680] leading-[1.04] tracking-[-0.02em] text-copy clip-reveal"
          >
            Start with a workflow assessment.
          </h2>

          <div ref={actionsRef}>
            <p className="mx-auto mb-9 max-w-[600px] text-[18px] leading-[1.65] text-copy-muted">
              Find out where Powerhouse can improve operational efficiency. We
              map the first workflow before a build starts.
            </p>
            <div className="flex items-center justify-center gap-4 max-sm:flex-col">
              <BookCallButton className="h-12 rounded-lg border-[#7A3AFF] bg-[#7A3AFF] px-6 text-[15px] font-semibold text-white hover:bg-[#6B2DF2] max-sm:w-full" />
              <a
                href="https://vetra.io/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center rounded-md border border-border-light bg-white px-5 text-[13px] font-medium text-copy-muted transition-colors hover:border-copy-muted/40 hover:text-copy max-sm:w-full max-sm:justify-center"
              >
                Explore the docs
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

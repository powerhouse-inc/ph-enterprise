"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { ASSESSMENT_EMAIL_URL, BAI_ENGAGEMENT_URL } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TIMING, SCROLL_START, COLORS } from "@/lib/constants";
import { SectionContainer } from "./section-container";

const glowBottomStyle: CSSProperties = {
  background: `radial-gradient(ellipse, ${COLORS.BRAND_BLOB} 0%, transparent 62%)`,
};

const glowTopStyle: CSSProperties = {
  background: `radial-gradient(circle, ${COLORS.PURPLE_GLOW} 0%, transparent 65%)`,
};

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
    <div ref={rootRef} id="get-started" className="relative overflow-hidden border-t border-border py-30 md:py-32">
      <div
        className="absolute -bottom-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={glowBottomStyle}
        aria-hidden="true"
      />
      <div
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none"
        style={glowTopStyle}
        aria-hidden="true"
      />

      <PowerhouseMark
        className="absolute -right-[60px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.025] pointer-events-none text-white max-md:hidden"
        aria-hidden="true"
      />

      <SectionContainer className="relative z-10">
        <h2
          ref={headingRef}
          className="text-[clamp(42px,6vw,80px)] font-[680] leading-[1.01] tracking-[-0.04em] text-t1 mb-6 max-w-[720px] clip-reveal font-heading"
        >
          Start with
          <br />
          <span className="text-t2">a workflow assessment.</span>
        </h2>

        <div
          ref={actionsRef}
          className="opacity-0 translate-y-4 space-y-8"
        >
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">
                Map your first workflow
              </h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-5">
                Find where Powerhouse can improve operational efficiency before
                a build starts. We map the first workflow and return a concrete
                software plan.
              </p>
              <Button variant="cta" className="mt-auto h-9 px-5 rounded-md text-[13px]" asChild>
                <a href={BAI_ENGAGEMENT_URL}>Map your first workflow</a>
              </Button>
            </div>

            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">
                Get the deliverables
              </h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-5">
                The five-day assessment defines the workflow scope, key objects,
                approvals, integrations, data risks, and the first build plan.
              </p>
              <Button variant="outline" className="mt-auto h-9 px-5 rounded-md text-[13px]" asChild>
                <a href={ASSESSMENT_EMAIL_URL}>Email the assessment team</a>
              </Button>
            </div>

            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md flex flex-col">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">
                Review the architecture
              </h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-5">
                See the proposed deployment, integration boundaries, and the
                role of Powerhouse, Vetra, and supporting components before
                committing to a build.
              </p>
              <Button variant="outline" className="mt-auto h-9 px-5 rounded-md text-[13px]" asChild>
                <a href="/architecture">Open architecture</a>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-t3">
            <span>Assessment first. Build after the workflow is clear.</span>
            <span className="w-px h-3 bg-border-md shrink-0" aria-hidden="true" />
            <a href="mailto:hello@powerhouse.inc" className="text-t2 hover:text-t1 transition-colors">
              hello@powerhouse.inc
            </a>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

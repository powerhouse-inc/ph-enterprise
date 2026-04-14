"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
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
        <div className="flex items-center gap-2 mb-7 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
          <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
          Get Started
        </div>
        <h2
          ref={headingRef}
          className="text-[clamp(42px,6vw,80px)] font-[680] leading-[1.01] tracking-[-0.04em] text-t1 mb-6 max-w-[720px] clip-reveal font-heading"
        >
          Three ways
          <br />
          <span className="text-t2">to move.</span>
        </h2>

        <div
          ref={actionsRef}
          className="opacity-0 translate-y-4 space-y-8"
        >
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">See it live</h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-4">
                We&apos;ll show you the platform running in production, walk through the AI
                agent infrastructure, and map the architecture to your operations.
              </p>
              <Button variant="cta" className="h-9 px-5 rounded-md text-[13px]" asChild>
                <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request" prefetch={false}>
                  Request a Demo
                </Link>
              </Button>
            </div>

            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">Assess your readiness</h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-4">
                A 2&ndash;3 week data flow audit that maps your systems, classifies data
                sensitivity, and produces a prioritized implementation roadmap.
              </p>
              <Button variant="outline" className="h-9 px-5 rounded-md text-[13px]" asChild>
                <a href="https://bai.powerhouse.io">
                  Start with BAI
                </a>
              </Button>
            </div>

            <div className="rounded-xl bg-surface border border-border p-6 transition-all hover:border-border-md">
              <h3 className="text-base font-semibold text-t1 mb-2 font-heading">Explore the platform</h3>
              <p className="text-[13px] leading-[1.68] text-t2 mb-4">
                Developer environment, package registry, documentation, and managed
                hosting.
              </p>
              <Button variant="outline" className="h-9 px-5 rounded-md text-[13px]" asChild>
                <a href="https://vetra.io">
                  Visit Vetra
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-t3">
            <span>No lock-in. No long-term contract.</span>
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

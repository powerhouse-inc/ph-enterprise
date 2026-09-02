"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { HeroMark } from "./hero-mark";
import { SectionContainer } from "./section-container";
import { BookCallButton } from "./book-call-button";

export function LandingHero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  // The hero is pinned while the content sheet scrolls over it. Recede as the
  // sheet covers: content eases back and up a touch, and a dim layer settles
  // in, scrubbed to how far the sheet (#problem) has risen up the viewport.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Resolved by hand: selector strings in here are scoped to the hero,
      // and the sheet lives outside it.
      const sheet = document.getElementById("problem");
      if (!sheet) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sheet,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        })
        .to(contentRef.current, { scale: 0.96, y: -20, ease: "none" }, 0)
        .to(dimRef.current, { opacity: 0.5, ease: "none" }, 0);
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="sticky top-0 z-0 flex min-h-svh flex-col justify-center overflow-hidden bg-ink-deep pt-24 pb-14 md:pb-18"
      aria-label="Introduction"
    >
      <Image
        src="/hero-gradient-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(246,248,245,0.08) 18%, rgba(246,248,245,0.2) 50%, rgba(246,248,245,0.08) 82%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 will-change-transform">
        <SectionContainer>
          <div className="mx-auto max-w-[880px] text-center">
            <h1 className="font-heading mb-7 text-[clamp(44px,5.4vw,74px)] font-[660] leading-[1.08] tracking-[-0.02em] text-t1 max-md:text-[44px] max-sm:text-[41px]">
              <span className="block">
                Turn operational{" "}
                <span className="max-sm:block">workflows into</span>
              </span>
              <span className="block bg-[linear-gradient(90deg,#24D7E8_0%,#3FBCF2_55%,#7A3AFF_125%)] bg-clip-text text-transparent">
                <span className="max-sm:block">software</span>{" "}
                <span className="max-sm:block">you own.</span>
              </span>
            </h1>

            <p className="mx-auto mb-9 max-w-[640px] text-[18px] leading-[1.65] text-t2">
              Powerhouse transforms sensitive, document-heavy processes into
              structured applications. With permissions, approvals, and
              attributable history built in. Your teams and AI can work together
              without giving up control of your data.
            </p>

            <div className="flex items-center justify-center gap-3 max-sm:flex-col">
              <BookCallButton className="h-11 px-5 text-[13px] font-semibold max-sm:w-full" />
              <Button
                variant="outline"
                className="h-11 rounded-md px-5 text-[13px] font-medium max-sm:w-full"
                asChild
              >
                <a href="https://vetra.io/" target="_blank" rel="noreferrer">
                  Explore the docs
                </a>
              </Button>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <HeroMark />
          </div>
        </SectionContainer>
      </div>

      <div
        ref={dimRef}
        className="pointer-events-none absolute inset-0 z-20 bg-ink-deep opacity-0"
        aria-hidden="true"
      />
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { IndustryCarousel } from "@/components/integration/industry-carousel";
import { INDUSTRY_SLIDES } from "@/data/industry-slides";
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
      // and the sheet lives outside it. The sheet is whichever section comes
      // first after the hero, so reordering the page does not break this.
      const sheet = document.getElementById("hero-sheet");
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
              {/* The canonical promise (COPY_STANDARD). */}
              <span className="block">Turn workflows into</span>
              <span className="block bg-[linear-gradient(90deg,#24D7E8_0%,#3FBCF2_55%,#7A3AFF_125%)] bg-clip-text text-transparent">
                <span className="max-sm:block">software</span>{" "}
                <span className="max-sm:block">you own.</span>
              </span>
            </h1>

            <p className="mx-auto mb-9 max-w-[640px] text-[18px] leading-[1.65] text-t2">
              Powerhouse connects the systems you already run and turns
              sensitive, document-heavy workflows into applications your team
              and AI can share. Permissions, approvals and attributable history
              come built in.
            </p>

            <div className="flex items-center justify-center gap-3 max-sm:flex-col">
              <BookCallButton className="h-11 px-5 text-[13px] font-semibold max-sm:w-full" event="book-demo-hero" />
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

          {/* The industries the integrations serve, in place of the mark.
              Not on phones: the hero is pinned, and the next section would
              cover the carousel before it could be read. */}
          <div className="mx-auto mt-14 hidden max-w-[1040px] text-left sm:block">
            <p className="text-[13px] text-t3">Built for the work your industry runs on</p>
            <div className="mt-4">
              <IndustryCarousel slides={INDUSTRY_SLIDES} />
            </div>
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

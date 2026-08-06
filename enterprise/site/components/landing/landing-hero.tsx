"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroMark } from "./hero-mark";
import { SectionContainer } from "./section-container";
import { WorkflowSignupButton } from "./workflow-signup-button";

export function LandingHero() {
  return (
    <section
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink-deep pt-24 pb-14 md:pb-18"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(246,248,245,0.08) 18%, rgba(246,248,245,0.2) 50%, rgba(246,248,245,0.08) 82%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-[880px] text-center">
          <h1 className="font-heading mb-7 text-[clamp(44px,5.4vw,74px)] font-[660] leading-[1.02] tracking-[-0.02em] text-t1 max-md:text-[44px] max-sm:text-[41px]">
            <span className="block">
              Turn workflows <span className="max-sm:block">into</span>
            </span>
            <span className="block text-brand">
              <span className="max-sm:block">software</span>{" "}
              <span className="max-sm:block">you own.</span>
            </span>
          </h1>

          <p className="mx-auto mb-9 max-w-[640px] text-[18px] leading-[1.65] text-t2">
            Powerhouse gives sensitive, document-heavy workflows shared
            structure, permissions, and history, creating operational software
            that teams and AI can use safely.
          </p>

          <div className="flex items-center justify-center gap-3 max-sm:flex-col">
            <WorkflowSignupButton
              label="Map your first workflow"
              className="h-11 px-5 text-[13px] font-semibold max-sm:w-full"
            />
            <Button
              variant="outline"
              className="h-11 px-5 text-[13px] font-medium max-sm:w-full"
              asChild
            >
              <Link href="#solution" prefetch={false}>
                See how it works
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden sm:block">
          <HeroMark />
        </div>
      </SectionContainer>
    </section>
  );
}

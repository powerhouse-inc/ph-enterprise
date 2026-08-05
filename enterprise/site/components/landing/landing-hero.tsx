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
        <h1 className="font-heading mb-10 max-w-[1040px] text-[clamp(44px,5.4vw,74px)] font-[660] leading-[1.02] text-t1 max-md:text-[44px] max-sm:text-[41px]">
          <span className="block">
            Turn workflows <span className="max-sm:block">into</span>
          </span>
          <span className="block text-brand">
            <span className="max-sm:block">software</span>{" "}
            <span className="max-sm:block">you own.</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(520px,1fr)] lg:gap-16">
          <div className="pb-6 max-lg:pb-0">
            <p className="mb-9 max-w-[31ch] text-[17px] leading-[1.7] text-t2 sm:max-w-[560px]">
              Powerhouse gives sensitive, document-heavy workflows shared
              structure, permissions, and history, creating operational software
              that teams and AI can use safely.
            </p>

            <div className="flex items-center gap-3 max-md:flex-col max-md:items-start">
              <WorkflowSignupButton
                label="Map your first workflow"
                className="h-11 px-5 text-[13px] font-semibold"
              />
              <Button
                variant="outline"
                className="h-11 px-5 text-[13px] font-medium"
                asChild
              >
                <Link href="#solution" prefetch={false}>
                  See how it works
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden sm:block lg:max-w-none">
            <HeroMark />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

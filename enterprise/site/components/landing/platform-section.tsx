"use client";

import Link from "next/link";
import { useRef } from "react";
import { PLATFORM_COMPONENTS } from "@/data/platform";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import type { CSSWithVars } from "@/lib/utils";
import { SectionContainer } from "./section-container";

export function PlatformSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="platform" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
            The Platform
          </div>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-3">
            Five components.
            <br />
            <span className="text-t2">Your architecture. Your brand.</span>
          </h2>
          <p className="text-[15px] leading-[1.72] text-t2 max-w-[520px]">
            Local, whitelabel components you own and operate &mdash; on your servers, under your control.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {PLATFORM_COMPONENTS.slice(0, 3).map((comp) => (
            <Link
              key={comp.name}
              href={comp.href}
              className="fade-up platform-card relative flex flex-col items-center justify-center text-center rounded-2xl bg-surface border border-border px-7 py-12 min-h-[200px] transition-all hover:border-border-md hover:-translate-y-px group overflow-hidden"
              style={{ "--card-accent": comp.accent } as CSSWithVars}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: comp.accent }}
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold tracking-tight text-t1 font-heading">
                  {comp.name}
                </h3>
              </div>
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-t3">
                {comp.tagline}
              </p>
              <span className="inline-block mt-8 text-[13px] font-medium text-t3 group-hover:text-t1 transition-colors">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5 max-md:grid-cols-1">
          {PLATFORM_COMPONENTS.slice(3).map((comp) => (
            <Link
              key={comp.name}
              href={comp.href}
              className="fade-up platform-card relative flex flex-col items-center justify-center text-center rounded-2xl bg-surface border border-border px-7 py-12 min-h-[200px] transition-all hover:border-border-md hover:-translate-y-px group overflow-hidden"
              style={{ "--card-accent": comp.accent } as CSSWithVars}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: comp.accent }}
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold tracking-tight text-t1 font-heading">
                  {comp.name}
                </h3>
              </div>
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-t3">
                {comp.tagline}
              </p>
              <span className="inline-block mt-8 text-[13px] font-medium text-t3 group-hover:text-t1 transition-colors">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { PLATFORM_COMPONENTS } from "@/data/platform";
import type { PlatformComponent } from "@/data/types";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import type { CSSWithVars } from "@/lib/utils";
import { SectionContainer } from "./section-container";

function PlatformCard({ comp }: { comp: PlatformComponent }) {
  return (
    <Link
      href={comp.href}
      className="fade-up platform-card relative flex flex-col items-center justify-center text-center rounded-2xl bg-surface border border-border px-7 py-12 min-h-[200px] transition-all hover:border-border-md hover:-translate-y-px group overflow-hidden"
      style={{ "--card-accent": comp.accent } as CSSWithVars}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comp.icon}
        alt=""
        aria-hidden="true"
        className="w-8 h-8 mb-4"
      />
      <h3 className="text-xl font-semibold tracking-tight text-t1 font-heading mb-2">
        {comp.name}
      </h3>
      <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-t3">
        {comp.tagline}
      </p>
      <span className="inline-block mt-8 text-[13px] font-medium text-t3 group-hover:text-t1 transition-colors">
        Learn more &rarr;
      </span>
    </Link>
  );
}

export function PlatformSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="platform" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
<h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-3">
            Five components.
            <br />
            <span className="text-t2">Open architecture. Your brand.</span>
          </h2>
          <p className="text-[15px] leading-[1.72] text-t2 max-w-[520px]">
            Local, whitelabel components you own and operate.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {PLATFORM_COMPONENTS.slice(0, 3).map((comp) => (
            <PlatformCard key={comp.name} comp={comp} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5 max-md:grid-cols-1">
          {PLATFORM_COMPONENTS.slice(3).map((comp) => (
            <PlatformCard key={comp.name} comp={comp} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { Scale, Users, FileText, BarChart3 } from "lucide-react";
import { USE_CASES } from "@/data/use-cases";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import type { CSSWithVars } from "@/lib/utils";
import { SectionContainer } from "./section-container";

const ICON_MAP: Record<string, React.ElementType> = {
  balance: Scale,
  users: Users,
  "file-text": FileText,
  "bar-chart": BarChart3,
};

export function UseCasesSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} id="use-cases" className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
<h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            Built for industries where
            <br />
            <span className="text-t2">confidentiality isn&apos;t optional.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {USE_CASES.map((uc) => {
            const Icon = ICON_MAP[uc.icon];

            return (
              <div
                key={uc.industry}
                className="fade-up usecase-card group relative h-full rounded-2xl border border-border bg-surface p-7 transition-all hover:border-border-md"
                style={{ "--card-accent": uc.color } as CSSWithVars}
              >
                {uc.href ? (
                  <Link
                    href={uc.href}
                    aria-label={`Open ${uc.industry} workflow page`}
                    className="absolute inset-0 z-10 block rounded-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  />
                ) : null}

                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    {Icon ? (
                      <Icon
                        className="h-5 w-5"
                        style={{ color: uc.color }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <h3 className="text-lg font-semibold tracking-tight text-t1 font-heading">
                      {uc.industry}
                    </h3>
                  </div>

                  <p className="text-sm leading-[1.72] text-t2">
                    {uc.summary}
                  </p>

                  {uc.href ? (
                    <span className="mt-auto pt-4 inline-block text-[13px] font-medium text-t3 transition-colors group-hover:text-t1">
                      Explore the opportunity in {uc.industry} &rarr;
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

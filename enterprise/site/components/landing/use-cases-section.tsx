"use client";

import Link from "next/link";
import { useRef } from "react";
import { Scale, Users, FileText, BarChart3 } from "lucide-react";
import { USE_CASES } from "@/data/use-cases";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import type { CSSWithVars } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]" aria-hidden="true" />
            Industries
          </div>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            Built for industries where
            <br />
            <span className="text-t2">confidentiality isn&apos;t optional.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {USE_CASES.map((uc) => (
            <div
              key={uc.industry}
              className="fade-up usecase-card relative rounded-2xl bg-surface border border-border p-7 transition-all hover:border-border-md group"
              style={{ "--card-accent": uc.color } as CSSWithVars}
            >
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = ICON_MAP[uc.icon];
                  return Icon ? <Icon className="w-5 h-5" style={{ color: uc.color }} aria-hidden="true" /> : null;
                })()}
                <h3 className="text-lg font-semibold tracking-tight text-t1 font-heading">
                  {uc.industry}
                </h3>
              </div>

              <p className="text-sm leading-[1.72] text-t2 mb-4">
                {uc.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {uc.capabilities.map((cap) => (
                  <Badge
                    key={cap}
                    variant="outline"
                    className="text-[10px] font-semibold tracking-[0.06em] uppercase text-t3 border-border rounded-full px-2.5 py-0.5 h-auto"
                  >
                    {cap}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={uc.baiLink}
                  className="text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
                >
                  Assess your AI readiness for {uc.industry.toLowerCase()} operations &rarr;
                </a>
                <Link
                  href={uc.componentLink.href}
                  className="text-[13px] text-t3 hover:text-t2 transition-colors"
                >
                  {uc.componentLink.label} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

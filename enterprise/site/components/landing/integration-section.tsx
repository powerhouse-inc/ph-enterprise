"use client";

import { useRef } from "react";
import { TIER_ITEMS } from "@/data/privacy";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function IntegrationSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-10">
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
              <span className="w-[5px] h-[5px] rounded-full bg-brand-purple shadow-[0_0_6px_rgba(122,58,255,0.8)]" aria-hidden="true" />
              Integration
            </div>
            <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-5">
              Connect everything.
              <br />
              <span className="text-t2">Expose nothing.</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.72] text-t2">
              <p>
                Powerhouse doesn&apos;t replace your existing systems &mdash; it runs alongside
                them. Switchboard connects your ERP, HRIS, document management, email, and
                financial systems to a structured data layer where AI can operate.
              </p>
              <p>
                Each connection defines a scope: what data enters, what format it takes, and
                who &mdash; human or agent &mdash; can access it. Isolation is defined at the
                integration level, not layered on as policy.
              </p>
            </div>
          </div>

          <div className="fade-up space-y-4">
            <h3 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-t3 mb-4">
              Tiered AI Model Access
            </h3>
            {TIER_ITEMS.map((tier) => (
              <div
                key={tier.tier}
                className="relative rounded-xl bg-surface border border-border p-5 pl-7 transition-all hover:border-border-md"
              >
                <div
                  className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
                  style={{ background: tier.accent }}
                  aria-hidden="true"
                />
                <h4 className="text-sm font-semibold text-t1 mb-1.5">
                  {tier.tier}
                </h4>
                <p className="text-[13px] leading-[1.68] text-t2">
                  {tier.description}
                </p>
              </div>
            ))}
            <a
              href="https://bai.powerhouse.io"
              className="inline-block mt-3 text-[13px] font-medium text-brand hover:text-brand/80 transition-colors"
            >
              Need help mapping your privacy tiers? Start with a BAI assessment &rarr;
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

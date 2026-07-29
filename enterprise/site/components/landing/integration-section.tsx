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
<h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-normal text-t1 font-heading mb-5">
              Connect everything.
              <br />
              <span className="text-t2">Expose nothing.</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.72] text-t2">
              <p>
                Powerhouse runs alongside your existing systems. Switchboard connects your
                ERP, HRIS, documents, email, and finance tools to a structured data layer
                where AI can operate securely.
              </p>
              <p>
                Every integration defines its own scope: what data enters, how it&rsquo;s
                structured, and who can access it, whether human or agent.
              </p>
            </div>
          </div>

          <div className="fade-up">
            <h3 className="text-[13px] font-semibold tracking-normal uppercase text-t3 mb-6">
              Tiered AI Model Access
            </h3>
            <div className="divide-y divide-border border-t border-b border-border">
              {TIER_ITEMS.map((tier) => (
                <div key={tier.tier} className="py-5">
                  <h4 className="text-[15px] font-semibold text-t1 mb-1.5 font-heading">
                    {tier.tier}
                  </h4>
                  <p className="text-[14px] leading-[1.68] text-t2">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

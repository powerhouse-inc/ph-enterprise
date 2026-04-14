"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function EcosystemSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-14 fade-up">
          <div className="flex items-center gap-2 mb-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3">
            <span className="w-[5px] h-[5px] rounded-full bg-brand-purple shadow-[0_0_6px_rgba(122,58,255,0.8)]" aria-hidden="true" />
            Cloud &amp; Ecosystem
          </div>
          <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            The infrastructure and community
            <br />
            <span className="text-t2">behind the platform.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className="fade-up rounded-2xl bg-surface border border-border p-8 transition-all hover:border-border-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#04C161]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-t1 font-heading">Vetra</h3>
              <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-t3">
                Platform Infrastructure
              </span>
            </div>
            <ul className="space-y-3 text-sm leading-[1.72] text-t2">
              <li>
                <strong className="text-t1">Hosting</strong> &mdash; Managed cloud deployment with data
                sovereignty guarantees. Self-host or use Vetra Cloud.
              </li>
              <li>
                <strong className="text-t1">Packages</strong> &mdash; Registry of reusable business modules,
                workflow editors, data processors, and agent configurations.
              </li>
              <li>
                <strong className="text-t1">AI Agents</strong> &mdash; Pre-configured business process agents.
                Deploy from the ecosystem or build custom agents with Clint.
              </li>
              <li>
                <strong className="text-t1">Dev Tooling</strong> &mdash; Vetra Studio IDE, PH-CLI,
                documentation, and training.
              </li>
            </ul>
            <a
              href="https://vetra.io"
              className="inline-block mt-5 text-[13px] font-medium text-t3 hover:text-t1 transition-colors"
            >
              vetra.io &rarr;
            </a>
          </div>

          <div className="fade-up rounded-2xl bg-surface border border-border p-8 transition-all hover:border-border-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-t1 font-heading">Achra</h3>
              <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-t3">
                Builder &amp; Operator Marketplace
              </span>
            </div>
            <p className="text-sm leading-[1.72] text-t2 mb-4">
              Where you find the people, services, and solutions to accelerate deployment.
              Implementation partners, operational service providers, and pre-built
              solutions &mdash; including the <strong className="text-t1">BAI</strong> team
              for AI readiness assessments, hands-on implementation, and ongoing support
              with contractual SLAs.
            </p>
            <a
              href="https://achra.com"
              className="inline-block mt-1 text-[13px] font-medium text-t3 hover:text-t1 transition-colors"
            >
              achra.com &rarr;
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

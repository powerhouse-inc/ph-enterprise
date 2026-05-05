"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

type CapabilityRow = {
  title: string;
  description: string;
};

const VETRA_CAPABILITIES: CapabilityRow[] = [
  {
    title: "Managed deployment",
    description: "Run in Vetra Cloud or self-host with data sovereignty controls.",
  },
  {
    title: "Reusable packages",
    description: "Install business modules, workflows, data processors, and agent configurations.",
  },
  {
    title: "AI agents",
    description: "Deploy pre-configured agents or build custom agents for your operating model.",
  },
  {
    title: "Developer tooling",
    description: "Use Vetra Studio, PH-CLI, documentation, and training to configure and maintain deployments.",
  },
];

const ACHRA_CAPABILITIES: CapabilityRow[] = [
  {
    title: "Deployment planning",
    description: "Map your systems, data sensitivity, privacy tiers, and deployment path.",
  },
  {
    title: "Implementation partners",
    description: "Work with experienced builders to configure modules, workflows, and integrations.",
  },
  {
    title: "Operational services",
    description: "Access support teams for ongoing operations, reporting, and process management.",
  },
  {
    title: "Contractual support",
    description: "Engage providers with defined scopes, operating responsibilities, and SLAs.",
  },
];

function CapabilityList({ items, accent }: { items: CapabilityRow[]; accent: string }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span
            className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <div>
            <p className="text-[13px] font-semibold text-t1 mb-0.5">{item.title}</p>
            <p className="text-[13px] leading-[1.68] text-t2">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

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
          <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-3">
            Infrastructure, agents, and experts.
            <br />
            <span className="text-t2">Ready to deploy.</span>
          </h2>
          <p className="text-[15px] leading-[1.72] text-t2 max-w-[580px]">
            Powerhouse is supported by the ecosystem needed to move AI-native
            operations from strategy to production: infrastructure, reusable
            modules, agent configurations, tooling, and implementation partners.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 items-stretch">
          {/* Vetra */}
          <div className="fade-up rounded-2xl bg-surface border border-border p-8 transition-all hover:border-border-md flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#04C161]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-t1 font-heading">Vetra</h3>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-t3 mb-4">
              Platform infrastructure
            </p>
            <p className="text-sm leading-[1.72] text-t2 mb-6">
              Deploy, host, and extend Powerhouse across cloud or self-hosted
              environments.
            </p>
            <CapabilityList items={VETRA_CAPABILITIES} accent="#04C161" />
            <a
              href="https://vetra.io"
              className="inline-block mt-auto pt-6 text-[13px] font-medium text-t3 hover:text-t1 transition-colors"
            >
              Explore Vetra &rarr;
            </a>
          </div>

          {/* Achra */}
          <div className="fade-up rounded-2xl bg-surface border border-border p-8 transition-all hover:border-border-md flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-t1 font-heading">Achra</h3>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-t3 mb-4">
              Builder &amp; operator marketplace
            </p>
            <p className="text-sm leading-[1.72] text-t2 mb-6">
              Find the people and solutions needed to implement Powerhouse faster.
            </p>
            <CapabilityList items={ACHRA_CAPABILITIES} accent="#00D4FF" />
            <a
              href="https://achra.com"
              className="inline-block mt-auto pt-6 text-[13px] font-medium text-t3 hover:text-t1 transition-colors"
            >
              Explore Achra &rarr;
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

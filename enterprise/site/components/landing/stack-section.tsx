"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

/**
 * Host applications listed inside the Powerhouse card. Each SVG has different
 * internal padding around its wordmark, so logoClass sets a per-logo height
 * that renders all three wordmarks at the same visual size (~12.8px).
 */
const HOST_APPLICATIONS = [
  {
    name: "Connect",
    role: "Front-end",
    logo: "/logos/stack/connect-light.svg",
    width: 267,
    height: 50,
    logoClass: "h-[18px]",
  },
  {
    name: "Switchboard",
    role: "Back-end",
    logo: "/logos/stack/switchboard-light.svg",
    width: 355,
    height: 40,
    logoClass: "h-[13.5px]",
  },
  {
    name: "Renown",
    role: "Identity",
    logo: "/logos/stack/renown-light.svg",
    width: 219,
    height: 68,
    logoClass: "h-[25px]",
  },
];

export function StackSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section
      ref={rootRef}
      className="border-t border-border-light bg-paper-soft py-20 text-copy"
    >
      <SectionContainer>
        <SectionHeading
          className="fade-up mb-14"
          title="Part of the Powerhouse Stack"
          lead="Tools that make distributed work local-first and private."
        />

        <div className="fade-up grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {/* Achra */}
          <div className="flex flex-col rounded-[16px] border border-[#9810fa]/40 bg-ink bg-[radial-gradient(120%_100%_at_100%_0%,rgba(152,16,250,0.16)_0%,transparent_60%)] p-7 shadow-[0_2px_12px_rgba(17,22,20,0.1)]">
            <Image
              src="/logos/stack/achra-ph-logo-light.svg"
              alt="Achra, powered by Powerhouse"
              width={545}
              height={133}
              className="mb-6 h-[42px] w-auto"
            />
            <p className="mb-5 text-[15px] leading-[1.7] text-t2">
              A decentralized services &amp; operations platform. Start your
              organisation, hire operators, find builders and offer your
              local-first products, platforms and agents to the world.
            </p>
            <p className="mb-7 text-[12px] font-semibold tracking-[0.06em] text-[#ad46ff] uppercase">
              Services platform
            </p>
            <a
              href="https://achra.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex h-10 w-fit items-center gap-1.5 rounded-lg bg-[#9810fa] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visit Achra
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Powerhouse */}
          <div className="flex flex-col rounded-[16px] border border-brand/30 bg-ink bg-[radial-gradient(120%_100%_at_50%_0%,rgba(36,215,232,0.14)_0%,transparent_60%)] p-7 shadow-[0_2px_12px_rgba(17,22,20,0.1)]">
            <Image
              src="/logos/stack/stack-logo-powerhouse.svg"
              alt="Powerhouse"
              width={420}
              height={44}
              className="mb-6 h-[30px] w-auto"
            />
            <p className="mb-6 text-[15px] leading-[1.7] text-t2">
              Open-source infrastructure and tooling for distributed
              organisations and local first apps, platform &amp; agents.
            </p>

            <p className="mb-3 text-[12px] font-semibold tracking-[0.06em] text-t3 uppercase">
              Host applications
            </p>
            <ul className="mb-7 space-y-2">
              {HOST_APPLICATIONS.map((app) => (
                <li
                  key={app.name}
                  className="flex items-center justify-between gap-4 rounded-[10px] border border-border bg-lifted/60 px-4 py-2.5"
                >
                  <Image
                    src={app.logo}
                    alt={app.name}
                    width={app.width}
                    height={app.height}
                    className={`${app.logoClass} w-auto`}
                  />
                  <span className="text-[13px] text-t3">{app.role}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://powerhouse.io/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex h-10 w-fit items-center gap-1.5 rounded-lg border border-border px-4 text-[13px] font-semibold text-t1 transition-colors hover:border-border-md hover:bg-white/5"
            >
              Visit Powerhouse
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Vetra */}
          <div className="flex flex-col rounded-[16px] border border-[#00a63e]/40 bg-ink bg-[radial-gradient(120%_100%_at_0%_0%,rgba(0,166,62,0.16)_0%,transparent_60%)] p-7 shadow-[0_2px_12px_rgba(17,22,20,0.1)]">
            <Image
              src="/logos/stack/vetra-ph-logo-light.svg"
              alt="Vetra, powered by Powerhouse"
              width={499}
              height={128}
              className="mb-6 h-[42px] w-auto"
            />
            <p className="mb-5 text-[15px] leading-[1.7] text-t2">
              Builder tooling platform for the local-first infrastructure stack
              of Powerhouse. Packages, cloud environments and rapid application
              development.
            </p>
            <p className="mb-7 text-[12px] font-semibold tracking-[0.06em] text-[#00a63e] uppercase">
              Builder tooling
            </p>
            <a
              href="https://vetra.io/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex h-10 w-fit items-center gap-1.5 rounded-lg bg-[#00a63e] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visit Vetra
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

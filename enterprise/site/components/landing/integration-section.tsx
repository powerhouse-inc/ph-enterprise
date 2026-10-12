"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { INTEGRATIONS, PIECE_COUNT } from "@/data/integrations";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

/**
 * A sample of the Activepieces catalogue, in the systems the narrative above
 * names: email, CRM, finance, documents, data. Logos are the ones Activepieces
 * serves at activepieces.com/logos/pieces/. Stage 01 of the diagram above shows
 * a different ten, so the two strips do not read as the same list twice.
 */
const SAMPLE_PIECES = [
  ["slack", "Slack"],
  ["microsoft-teams", "Microsoft Teams"],
  ["stripe", "Stripe"],
  ["shopify", "Shopify"],
  ["jira-cloud", "Jira"],
  ["linear", "Linear"],
  ["github", "GitHub"],
  ["airtable", "Airtable"],
  ["dropbox", "Dropbox"],
  ["tableau", "Tableau"],
  ["openai", "OpenAI"],
  ["anthropic-claude", "Claude"],
] as const;

export function IntegrationSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  const integration = INTEGRATIONS[0];

  return (
    <section
      ref={rootRef}
      id="integrations"
      className="border-t border-border-light bg-paper-soft py-20 text-copy"
    >
      <SectionContainer>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          {/* Narrative */}
          <div className="fade-up">
            <h2 className="font-heading text-[clamp(34px,3.4vw,44px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              Connect everything.
              <br />
              Expose nothing.
            </h2>

            <div className="mt-5 space-y-4 text-[17px] leading-[1.6] text-pretty text-copy-muted">
              <p>
                Powerhouse runs alongside your existing systems. Switchboard
                connects your ERP, HRIS, documents, email, and finance tools to
                a structured data layer where AI can operate securely.
              </p>
              <p>
                Every integration defines its own scope: what data enters, how
                it&rsquo;s structured, and who can access it, whether human or
                agent.
              </p>
            </div>

            {/* The catalogue, shown rather than claimed. */}
            <div className="mt-8 border-t border-border-light pt-6">
              <ul
                aria-label="More of the systems Powerhouse connects"
                className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-6"
              >
                {SAMPLE_PIECES.map(([file, name]) => (
                  <li
                    key={file}
                    title={name}
                    className="flex aspect-square items-center justify-center rounded-[10px] border border-border-light bg-white"
                  >
                    <Image
                      src={`/logos/activepieces/${file}.svg`}
                      alt={name}
                      width={28}
                      height={28}
                      className="h-[46%] w-[46%] object-contain"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] leading-[1.6] text-copy-muted">
                Chat, payments, project tracking, storage, analytics and the
                model providers. {PIECE_COUNT} connectors in all, each one a
                workflow you can read and re-run.
              </p>
              <Link
                href="/integrations"
                className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7A3AFF] hover:underline"
              >
                Browse the integrations
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* First integration */}
          <div className="fade-up rounded-[16px] border border-border-light bg-white p-8 shadow-[0_2px_12px_rgba(17,22,20,0.1)]">
            <p className="text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
              First integration
            </p>

            <h3 className="mt-4">
              {integration.logo ? (
                <Image
                  src={integration.logo.src}
                  alt={integration.name}
                  width={integration.logo.width}
                  height={integration.logo.height}
                  className="h-[42px] w-auto"
                />
              ) : (
                <span className="font-heading text-[21px] leading-[1.25] font-semibold tracking-[-0.015em] text-copy">
                  {integration.name}
                </span>
              )}
            </h3>

            <p className="mt-4 text-[15px] leading-[1.6] text-copy-muted">
              {integration.summary}
            </p>

            <dl className="mt-6 divide-y divide-border-light border-t border-border-light">
              {integration.scope.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 py-3.5"
                >
                  <dt className="text-[12.5px] font-semibold text-copy-muted">
                    {row.label}
                  </dt>
                  <dd className="text-[14px] leading-[1.5] text-copy">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* The integration's full record lives on the Integrations pillar. */}
            <Link
              href={`/integrations/${integration.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7A3AFF] hover:underline"
            >
              Open the record
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

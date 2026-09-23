import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IntegrationEntry } from "@/data/integrations";

/**
 * An integration rendered as a record rather than a marketing tile: a mono
 * identifier and status in the header, the scope as a ruled field table, and
 * the model it writes into in the footer.
 *
 * The card is sized to sit alone today and to tile into a two-column grid once
 * a second integration exists, so `h-full` and the `mt-auto` footer stay even
 * while there is one entry.
 *
 * The action colour is `text-copy`, not the cyan brand accent: #24D7E8 on
 * white measures near 1.8:1 and fails the 4.5:1 floor in DESIGN_STANDARD.
 * Cyan stays the accent on ink bands, where it has the contrast for it.
 */
export function IntegrationRecordCard({
  integration,
}: {
  integration: IntegrationEntry;
}) {
  // The card frame is 16/10, so the first shot should be one that fits it.
  // Picking by nearest aspect ratio was worse than it sounds: it silently
  // overrode the author's order on a hundredth of a ratio. Order the shots so
  // the cover is first.
  const shot = integration.shots?.[0];
  const { logo } = integration;

  return (
    <Link
      href={`/integrations/${integration.slug}`}
      className="group flex h-full flex-col rounded-[16px] border border-border-light bg-white p-7 shadow-[0_2px_12px_rgba(17,22,20,0.1)] transition-colors hover:border-copy-muted/35 md:p-9"
    >
      {/* Record header: identifier and status */}
      <div className="flex items-center justify-between gap-4 border-b border-border-light pb-5">
        <span className="font-mono text-[12.5px] text-copy-muted">
          {integration.slug}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border-light px-2.5 py-1 text-[11px] font-semibold text-copy">
          <span
            className="h-[5px] w-[5px] rounded-full bg-proof"
            aria-hidden="true"
          />
          {integration.status}
        </span>
      </div>

      {shot ? (
        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[10px] border border-border-light bg-paper-soft">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 768px) 46vw, 92vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <p className="mt-6 text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
        {integration.category}
      </p>

      <h3 className="mt-3 flex min-h-[42px] items-center gap-3">
        {logo?.kind === "mark" ? (
          <Image
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            className="h-9 w-9 shrink-0 rounded-[8px]"
            aria-hidden="true"
          />
        ) : null}

        {logo && logo.kind !== "mark" ? (
          <Image
            src={logo.src}
            alt={integration.name}
            width={logo.width}
            height={logo.height}
            className="h-[42px] w-auto"
          />
        ) : (
          <span className="font-heading text-[21px] leading-[1.25] font-semibold tracking-[-0.015em] text-copy">
            {integration.name}
          </span>
        )}
      </h3>

      <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-pretty text-copy-muted">
        {integration.oneLiner}
      </p>

      {/* Scope, as a field table */}
      <dl className="mt-6 divide-y divide-border-light border-t border-border-light">
        {integration.scope.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 py-3.5"
          >
            <dt className="text-[12.5px] font-semibold text-copy-muted">
              {row.label}
            </dt>
            <dd className="text-[14px] leading-[1.5] text-copy">{row.value}</dd>
          </div>
        ))}
      </dl>

      {/* Footer: the model it writes into */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border-light pt-5">
        <span className="font-mono text-[12.5px] text-copy-muted">
          {integration.flow}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-copy group-hover:underline">
          Open the record
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

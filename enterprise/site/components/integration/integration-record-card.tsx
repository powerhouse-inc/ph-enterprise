import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IntegrationEntry } from "@/data/integrations";

/**
 * One integration as a full-width record row: identity, promise and scope on
 * one side, the product evidence large on the other. A stack of rows replaced
 * the 2x2 card grid, which DESIGN_STANDARD names as an interchangeable
 * feature-card grid, and it gives each screenshot room to be inspected.
 *
 * `flip` alternates the evidence side so four records do not read as one
 * template stamped four times.
 */
export function IntegrationRecordCard({
  integration,
  flip = false,
}: {
  integration: IntegrationEntry;
  flip?: boolean;
}) {
  // The frame is 16/10, so the first shot must be one that fits it. Order the
  // shots so the cover is first rather than picking by aspect ratio.
  const shot = integration.shots?.[0];
  const { logo } = integration;

  return (
    <Link
      href={`/integrations/${integration.slug}`}
      className={`group grid grid-cols-1 items-center gap-8 rounded-[14px] border border-border-light bg-white p-6 transition-colors hover:border-copy-muted/40 md:p-8 lg:gap-12 lg:p-10 ${
        // Swap the track sizes with the order, so the evidence keeps the wide
        // column on both sides.
        flip
          ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      <div className={flip ? "lg:order-2" : undefined}>
        <h3 className="flex min-h-[42px] items-center gap-3">
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
              className="h-[40px] w-auto"
            />
          ) : (
            <span className="font-heading text-[24px] leading-[1.2] font-semibold tracking-[-0.015em] text-copy">
              {integration.name}
            </span>
          )}
        </h3>

        <p className="mt-3 text-[14px] text-copy-muted">
          {integration.category}
          <span className="px-2 text-copy-muted/50" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-proof">{integration.status}</span>
        </p>

        <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-pretty text-copy">
          {integration.oneLiner}
        </p>

        <dl className="mt-7 divide-y divide-border-light border-y border-border-light">
          {integration.scope.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 py-3"
            >
              <dt className="text-[13px] font-semibold text-copy-muted">
                {row.label}
              </dt>
              <dd className="text-[14.5px] leading-[1.5] text-copy">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <span className="font-mono text-[12.5px] text-copy-muted">
            {integration.flow}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy group-hover:underline">
            Open the record
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      {shot ? (
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-[10px] border border-border-light bg-paper-soft shadow-[0_6px_24px_rgba(17,22,20,0.12)] ${flip ? "lg:order-1" : ""}`}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 92vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
    </Link>
  );
}

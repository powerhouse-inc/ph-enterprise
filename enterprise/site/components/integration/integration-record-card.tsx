import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Package, Plus } from "lucide-react";
import { STATUS_LABEL, type IntegrationCard, type RecipePart } from "@/data/integrations";

/**
 * One integration as a case study row: the industry it serves as the
 * headline, what it does as a list of steps, and the recipe it is built
 * from, beside the product evidence. Rows stack full width rather than as a
 * card grid, which DESIGN_STANDARD names as an interchangeable pattern.
 *
 * `flip` alternates the evidence side so the rows do not read as one
 * template stamped five times.
 *
 * The whole card is clickable through a stretched link on the main link
 * rather than by wrapping it: the card also links to the blog post, and a
 * link inside a link is invalid HTML.
 */

const RECIPE_KIND: Record<RecipePart["kind"], string> = {
  system: "System",
  pieces: "Activepieces",
  connector: "Connector",
  model: "Document model",
  app: "App",
};

// The document model is the half Powerhouse brings, so it carries the weight.
const RECIPE_CHIP: Record<RecipePart["kind"], string> = {
  system: "border border-border-light bg-paper-soft text-copy",
  pieces: "border border-dashed border-copy-muted/50 bg-white text-copy",
  connector: "border border-dashed border-copy-muted/50 bg-white text-copy",
  model: "bg-ink-deep text-t1",
  app: "border border-copy/70 bg-white text-copy",
};

/**
 * The recipe as a short equation read top to bottom: one row per part, the
 * plus in its own column, so it never wraps mid-sum.
 */
function Recipe({ parts }: { parts: readonly RecipePart[] }) {
  return (
    <div className="mt-7 rounded-[10px] border border-border-light bg-paper-soft/60 p-4">
      <p className="text-[12.5px] font-semibold text-copy-muted">The recipe in this case</p>
      <ol className="mt-3 flex flex-col gap-2">
        {parts.map((part, i) => (
          <li
            key={`${part.kind}-${part.label}`}
            className="grid grid-cols-[14px_92px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[14px_112px_minmax(0,1fr)]"
          >
            {i > 0 ? (
              <Plus className="h-3.5 w-3.5 text-copy-muted" aria-label="plus" />
            ) : (
              <span aria-hidden="true" />
            )}
            <span className="text-[12px] text-copy-muted">{RECIPE_KIND[part.kind]}</span>
            <span
              className={`w-fit max-w-full rounded-[7px] px-2.5 py-1.5 text-[13px] leading-[1.15] font-medium ${RECIPE_CHIP[part.kind]} ${
                part.kind === "connector" || part.kind === "pieces" ? "font-mono text-[12px]" : ""
              }`}
            >
              {part.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function IntegrationRecordCard({
  integration,
  flip = false,
  evidence,
}: {
  integration: IntegrationCard;
  flip?: boolean;
  /** Drawn evidence for a card without a screenshot yet. */
  evidence?: ReactNode;
}) {
  const { logo, shot } = integration;
  const external = integration.href.startsWith("http");
  const inDevelopment = integration.status !== "Available";

  const mainLinkClass =
    "inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy group-hover:underline after:absolute after:inset-0 after:rounded-[14px] after:content-['']";
  const mainLink = external ? (
    <a href={integration.href} target="_blank" rel="noreferrer" className={mainLinkClass}>
      {integration.linkLabel}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  ) : (
    <Link href={integration.href} className={mainLinkClass}>
      {integration.linkLabel}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );

  return (
    <article
      id={`case-${integration.slug}`}
      className={`group relative grid scroll-mt-24 grid-cols-1 items-center gap-8 rounded-[14px] border border-border-light bg-white p-6 transition-colors hover:border-copy-muted/40 md:p-8 lg:gap-12 lg:p-10 ${
        // Swap the track sizes with the order, so the evidence keeps the wide
        // column on both sides.
        flip
          ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      <div className={flip ? "lg:order-2" : undefined}>
        {/* The industry is the headline; the integration is how it is served. */}
        <h3 className="font-heading text-[clamp(26px,2.4vw,32px)] leading-[1.1] font-[660] tracking-[-0.02em] text-copy">
          {integration.industry}
        </h3>

        <div className="mt-4 flex min-h-[40px] flex-wrap items-center gap-x-3 gap-y-2">
          {logo?.kind === "mark" ? (
            <>
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto shrink-0 rounded-[6px]"
                aria-hidden="true"
              />
              <span className="text-[17px] font-semibold text-copy">{integration.name}</span>
            </>
          ) : logo ? (
            // Explicit height: some wordmarks ship a viewBox but no size.
            <Image
              src={logo.src}
              alt={integration.name}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-[17px] font-semibold text-copy">{integration.name}</span>
          )}
          <span className="text-copy-muted/50" aria-hidden="true">
            ·
          </span>
          <span
            className={`text-[14px] font-medium ${inDevelopment ? "text-amber-700" : "text-copy-muted"}`}
          >
            {STATUS_LABEL[integration.status]}
          </span>
        </div>

        <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-pretty text-copy">
          {integration.oneLiner}
        </p>

        <ol className="mt-6 flex flex-col gap-2.5">
          {integration.steps.map((step, i) => (
            <li key={step} className="flex items-baseline gap-3 text-[14.5px] leading-[1.45] text-copy">
              <span className="w-5 shrink-0 font-mono text-[12px] text-copy-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{step}</span>
            </li>
          ))}
        </ol>

        <Recipe parts={integration.recipe} />

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {integration.walkthroughSlug ? (
            <Link
              href={`/blog/${integration.walkthroughSlug}`}
              className="relative z-10 inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read the case study
            </Link>
          ) : null}
          {integration.vetra ? (
            <a
              href={integration.vetra.url}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              {integration.vetra.label ?? "The package on Vetra"}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {mainLink}
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
      ) : evidence ? (
        <div className={flip ? "lg:order-1" : undefined}>{evidence}</div>
      ) : null}
    </article>
  );
}

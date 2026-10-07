import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Lock, Plus } from "lucide-react";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { CATALOGUE, getIntegration } from "@/data/integrations";
import { CTA_URL } from "@/lib/site";
import {
  IndustryCarousel,
  type IndustrySlide,
  type SlideLogo,
} from "./industry-carousel";

/**
 * The integrations index hero. A headline, then the offer in two rows:
 * the connectors (any Activepieces piece, plus Powerhouse's own industry
 * integrations), and below them the recipe those connectors are half of.
 * Numbers and one-liners carry the copy; each panel ends in a clear link.
 * The primary CTA lives in the nav, so the hero does not repeat it.
 */

const ACTIVEPIECES_CATALOGUE_URL = "https://www.activepieces.com/pieces";

/**
 * activepieces.com/pieces listed 763 pieces on 2026-09-28. Rounded down so the
 * figure stays true as the catalogue grows; recheck before raising it.
 */
const PIECE_COUNT = "700+";

/**
 * Pieces from that catalogue, with the logos Activepieces itself serves at
 * activepieces.com/logos/pieces/. Chosen for the systems operations teams run.
 */
const PIECES = [
  ["gmail", "Gmail"],
  ["slack", "Slack"],
  ["microsoft-teams", "Microsoft Teams"],
  ["microsoft-outlook", "Outlook"],
  ["salesforce", "Salesforce"],
  ["hubspot", "HubSpot"],
  ["quickbooks", "QuickBooks"],
  ["stripe", "Stripe"],
  ["shopify", "Shopify"],
  ["google-sheets", "Google Sheets"],
  ["google-drive", "Google Drive"],
  ["dropbox", "Dropbox"],
  ["notion", "Notion"],
  ["airtable", "Airtable"],
  ["jira-cloud", "Jira"],
  ["asana", "Asana"],
  ["github", "GitHub"],
  ["linear", "Linear"],
  ["postgres", "Postgres"],
  ["snowflake", "Snowflake"],
  ["tableau", "Tableau"],
  ["openai", "OpenAI"],
  ["anthropic-claude", "Claude"],
  ["webhook", "Webhook"],
] as const;

/** Wordmark and glyph dimensions come from the records where one exists. */
function recordLogo(slug: string): SlideLogo {
  const record = getIntegration(slug);
  if (!record?.logo) throw new Error(`No logo on integration record "${slug}"`);
  return { name: record.name, ...record.logo, kind: record.logo.kind ?? "wordmark" };
}

/**
 * Industry verticals, each shown with the integrations that serve it.
 * Distyra has no record on this site yet, so it links out to its own. Legal
 * has no integration yet: its slide is an open slot that leads to a call.
 */
const INDUSTRY_SLIDES: readonly IndustrySlide[] = [
  {
    industry: "Operations",
    name: "Paperless-ngx and Docling",
    line: "Scans, emails and uploads land in one archive, then become typed records split at their own headings.",
    href: "/integrations/paperless-ngx",
    logos: [recordLogo("paperless-ngx"), recordLogo("docling")],
  },
  {
    industry: "Manufacturing",
    name: "UMH",
    line: "Purchase orders become production ledgers the factory floor reports against.",
    href: "/integrations/umh",
    logos: [{ ...recordLogo("umh"), name: "UMH" }],
  },
  {
    industry: "Construction",
    name: "Speckle",
    line: "Each building-model revision becomes a record of its quantities and what changed.",
    href: "/integrations/speckle",
    logos: [recordLogo("speckle")],
  },
  {
    industry: "Financial",
    name: "Distyra",
    line: "EU bank statements and PSD2 streams, parsed into records a person can check.",
    href: "https://www.distyra.eu",
    // Distyra's own mark, from distyra.eu/assets/brand/distyra-mark.svg.
    logos: [
      {
        name: "Distyra",
        src: "/logos/integrations/distyra-mark.svg",
        width: 280,
        height: 210,
        kind: "mark",
      },
    ],
  },
  {
    industry: "Legal",
    name: "Legal",
    line: "Contracts, case files and matter records. Tell us which system holds yours.",
    href: CTA_URL,
    logos: [],
    placeholder: "Your legal system",
    linkLabel: "Talk to us about it",
  },
];

/*
 * The recipe diagram: one invoice workflow drawn in the homepage's visual
 * language (paper document cards, status pills, dotted history, curved
 * connectors). Numbers are illustrative and add up: 480 + 612 + 192.50.
 */

/** Workflow steps, from the Paperless-ngx record's trigger and actions. */
const FLOW_STEPS = [
  // The trigger names its source by logo: the piece is the Paperless-ngx one.
  { kind: "Trigger", label: "Invoice arrives in", color: "#4f9cf9", source: "paperless-ngx" },
  { kind: "Branch", label: "Classified as an invoice", color: "#9c6bff" },
  { kind: "Read", label: "Fields read by a model", color: "#9c6bff" },
  { kind: "Write", label: "File the invoice record", color: "#46d68c" },
] as const;

const LINE_ITEMS = [
  ["2 \u00d7 240.00", "480.00"],
  ["6 \u00d7 102.00", "612.00"],
  ["1 \u00d7 192.50", "192.50"],
] as const;

const LIFECYCLE = ["Draft", "In review", "Approved"] as const;

const HISTORY = [
  { text: "Fields extracted", actor: "AI agent", color: "#4f9cf9" },
  { text: "Total corrected", actor: "Reviewer", color: "#9c6bff" },
  { text: "Invoice approved", actor: "Finance lead", color: "#46d68c" },
] as const;

/*
 * Geometry shared by the three zones and the connectors between them, so the
 * curves meet the rows they point at. Every zone is DIAGRAM_H tall.
 *   Workflow: four 40px rows, 26px apart; the Write row is centred at 218.
 *   Logic: 56px, 56px and 110px blocks, 8px apart; centred at 28, 92, 183.
 */
const DIAGRAM_H = 238;
const WRITE_Y = 218;
const LOGIC_Y = [28, 92, 183] as const;
const MID_Y = DIAGRAM_H / 2;

function Connector({ from, to }: { from: readonly number[]; to: readonly number[] }) {
  const paths = from.flatMap((y1) =>
    to.map((y2) => `M0 ${y1} C28 ${y1} 28 ${y2} 56 ${y2}`),
  );
  return (
    <svg
      viewBox={`0 0 56 ${DIAGRAM_H}`}
      preserveAspectRatio="none"
      className="hidden h-[238px] w-full lg:block"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.75" />
          <path
            d={d}
            fill="none"
            stroke="rgba(36,215,232,0.9)"
            strokeWidth="1.75"
            strokeDasharray="4 5"
          />
        </g>
      ))}
    </svg>
  );
}

/** Mobile stand-in for the horizontal connectors. */
function DownConnector() {
  return (
    <div className="flex justify-center py-2 lg:hidden" aria-hidden="true">
      <svg width="12" height="28" viewBox="0 0 12 28" fill="none">
        <path
          d="M6 0v22m0 0-5-5M6 22l5-5"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * A vendor wordmark as the row's own end cap: white, full height, flush to the
 * right edge and rounded to match the row (9px corner less the 1px border).
 */
function SourceChip({ slug }: { slug: string }) {
  const record = getIntegration(slug);
  if (!record?.logo) return null;
  return (
    <span className="-mr-3 ml-auto flex shrink-0 items-center self-stretch rounded-r-[8px] bg-white px-3">
      <Image
        src={record.logo.src}
        alt={record.name}
        width={record.logo.width}
        height={record.logo.height}
        className="h-[22px] w-auto"
      />
    </span>
  );
}

function WorkflowZone() {
  return (
    <ol
      aria-label="Workflow steps"
      className="relative mx-auto flex w-full max-w-[320px] flex-col gap-[26px] lg:h-[238px] lg:max-w-none"
    >
      {/* The chain the steps run along. */}
      <span
        className="absolute top-5 bottom-5 left-[17px] w-px border-l border-dashed border-white/35"
        aria-hidden="true"
      />
      {FLOW_STEPS.map((step) => (
        <li
          key={step.kind}
          className="relative flex h-10 items-center gap-2.5 rounded-[9px] border border-white/20 bg-[#1b2226] px-3"
        >
          <span
            className="h-[10px] w-[10px] shrink-0 rounded-[3px]"
            style={{ backgroundColor: step.color }}
            aria-hidden="true"
          />
          <span className="w-[46px] shrink-0 font-mono text-[10.5px] text-t3">
            {step.kind}
          </span>
          <span className="truncate text-[12.5px] text-white/85">{step.label}</span>
          {"source" in step ? <SourceChip slug={step.source} /> : null}
        </li>
      ))}
    </ol>
  );
}

function DataZone() {
  return (
    <div className="relative mx-auto h-[238px] w-full max-w-[300px] lg:max-w-none">
      {/* A receipt behind the invoice, as on the homepage. */}
      <div
        className="absolute top-3 -left-3 h-[70px] w-[112px] -rotate-[7deg] rounded-[10px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        <p className="text-[9px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
          Receipt
        </p>
        <div className="mt-1.5 space-y-1">
          <div className="h-[3px] w-4/5 rounded-full bg-slate-200" />
          <div className="h-[3px] w-3/5 rounded-full bg-slate-200" />
        </div>
        <p className="mt-1.5 text-[10px] font-semibold text-slate-800">&euro;182.40</p>
      </div>

      <figure className="absolute inset-y-0 right-0 left-6 rounded-[12px] bg-white p-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
        <figcaption className="sr-only">
          An invoice record: three line items totalling 1,284.50 euros, approved.
        </figcaption>
        <div className="flex items-baseline justify-between">
          <p className="text-[9.5px] font-semibold tracking-[0.05em] text-slate-500 uppercase">
            Invoice
          </p>
          <p className="font-mono text-[10.5px] font-semibold text-slate-800">INV-2041</p>
        </div>
        <div className="mt-2 space-y-1" aria-hidden="true">
          <div className="h-[3px] w-3/5 rounded-full bg-slate-200" />
          <div className="h-[3px] w-2/5 rounded-full bg-slate-200" />
        </div>

        <dl className="mt-3 space-y-1.5 border-t border-slate-100 pt-2.5" aria-hidden="true">
          {LINE_ITEMS.map(([qty, amount]) => (
            <div key={amount} className="flex items-center gap-2 text-[10px]">
              <span className="h-[3px] flex-1 rounded-full bg-slate-200" />
              <dt className="font-mono text-slate-500">{qty}</dt>
              <dd className="w-[44px] text-right font-mono text-slate-800">{amount}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-2.5 flex items-baseline justify-between border-t border-slate-100 pt-2">
          <p className="text-[10px] font-semibold text-slate-500">Total</p>
          <p className="text-[13px] font-semibold text-slate-900">&euro;1,284.50</p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-700">
            <Check className="h-2.5 w-2.5" aria-hidden="true" />
            Approved
          </span>
          <span className="text-[9.5px] text-slate-400">Due in 14 days</span>
        </div>
      </figure>
    </div>
  );
}

function LogicZone() {
  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col gap-2 lg:h-[238px] lg:max-w-none">
      {/* Lifecycle */}
      <div className="flex h-14 items-center gap-1.5 rounded-[10px] border border-white/20 bg-[#1b2226] px-3">
        {LIFECYCLE.map((stage, i) => {
          const last = i === LIFECYCLE.length - 1;
          return (
            <span key={stage} className="flex items-center gap-1.5">
              <span
                className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                  last
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-white/[0.08] text-white/60"
                }`}
              >
                {stage}
              </span>
              {last ? null : (
                <ArrowRight className="h-3 w-3 text-white/35" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </div>

      {/* The rule that makes it business logic rather than a script. */}
      <div className="flex h-14 items-center gap-2.5 rounded-[10px] border border-[rgba(126,217,167,0.45)] bg-[rgba(70,214,140,0.08)] px-3">
        <Lock className="h-3.5 w-3.5 shrink-0 text-[#7ed9a7]" aria-hidden="true" />
        <div className="leading-[1.3]">
          <p className="text-[12px] font-semibold text-white/90">Only a person can approve</p>
          <p className="text-[10.5px] text-white/50">Each write step names what it may change</p>
        </div>
      </div>

      {/* Operation history */}
      <ol
        aria-label="Operation history"
        className="flex min-h-[110px] flex-1 flex-col justify-center gap-2 rounded-[10px] border border-white/15 bg-black/20 px-3 py-3"
      >
        {HISTORY.map((entry) => (
          <li key={entry.text} className="flex items-center gap-2 text-[11.5px]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-white/80">{entry.text}</span>
            <span className="text-white/40">&middot; {entry.actor}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const ZONES = [
  ["Workflow", "The integration moves the event."],
  ["Data", "A typed record holds what it carried."],
  ["Business logic", "Rules and people decide what changes."],
] as const;

// Literal class names so Tailwind can see them: zones sit in columns 1, 3, 5.
const ZONE_COL_START = ["", "lg:col-start-3", "lg:col-start-5"] as const;

const DIAGRAM_COLS =
  "lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,0.95fr)_56px_minmax(0,1fr)]";

// Frame only; each panel sets its own layout.
const FRAME =
  "rounded-[16px] border border-border-md bg-surface/85 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-7";
const PANEL = `flex flex-col ${FRAME}`;

/** Secondary, but unmistakably a link: a bordered button-weight target. */
function PanelLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  const Icon = external ? ArrowUpRight : href.startsWith("#") ? ArrowDown : ArrowRight;
  const className =
    "group mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-md border border-brand/60 bg-brand-low px-4 text-[14px] font-semibold text-t1 transition-colors hover:border-brand hover:bg-brand-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
  const content = (
    <>
      {children}
      <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** The number, what it counts, and the panel's heading. */
function PanelHead({
  id,
  figure,
  unit,
  title,
}: {
  id: string;
  figure: string;
  unit: string;
  title: string;
}) {
  return (
    <div className="flex items-end gap-4">
      <p className="font-heading text-[52px] leading-[0.9] font-[680] tracking-[-0.03em] text-brand">
        {figure}
      </p>
      <div className="pb-0.5">
        <p className="text-[13px] text-t3">{unit}</p>
        <h3
          id={id}
          className="mt-0.5 font-heading text-[20px] leading-[1.2] font-semibold tracking-[-0.01em] text-t1"
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

function CataloguePanel() {
  return (
    <section className="flex flex-col" aria-labelledby="hero-any-piece">
      <Image
        src="/logos/activepieces/activepieces-logo-light.svg"
        alt={CATALOGUE.name}
        width={945}
        height={147}
        className="h-[22px] w-auto self-start"
      />
      <div className="mt-6">
        <PanelHead
          id="hero-any-piece"
          figure={PIECE_COUNT}
          unit="open-source connectors"
          title={`Use any ${CATALOGUE.name} piece`}
        />
      </div>

      <ul
        aria-label="Some of the pieces in the catalogue"
        className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-8"
      >
        {PIECES.map(([file, name]) => (
          <li
            key={file}
            title={name}
            className="flex aspect-square items-center justify-center rounded-[10px] bg-white"
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
      <p className="mt-3 text-[13px] text-t3">
        {PIECES.length} of them. Email, CRM, finance, storage, data and AI.
      </p>
      <div className="flex-1" aria-hidden="true" />

      <PanelLink href={ACTIVEPIECES_CATALOGUE_URL}>
        Browse all {PIECE_COUNT} pieces
      </PanelLink>
    </section>
  );
}

function IndustryPanel() {
  return (
    <section className="flex min-w-0 flex-col" aria-labelledby="hero-industry">
      <p className="text-[13px] text-t3">Powerhouse integrations</p>
      <h3
        id="hero-industry"
        className="mt-1 font-heading text-[20px] leading-[1.2] font-semibold tracking-[-0.01em] text-t1"
      >
        Built for the work your industry runs on
      </h3>
      <div className="mt-6 flex flex-1 flex-col">
        <IndustryCarousel slides={INDUSTRY_SLIDES} />
      </div>
      <PanelLink href="#records">See all integrations</PanelLink>
    </section>
  );
}

/** A rule with a circled plus on it: vertical on desktop, horizontal below. */
function PlusDivider() {
  return (
    <div className="relative my-8 flex items-center justify-center lg:my-0" aria-hidden="true">
      <span className="absolute inset-x-0 top-1/2 h-px bg-border-md lg:inset-x-auto lg:inset-y-0 lg:top-0 lg:left-1/2 lg:h-auto lg:w-px" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-brand/60 bg-surface shadow-[0_0_0_6px_rgba(18,23,26,0.9)]">
        <Plus className="h-7 w-7 text-brand" strokeWidth={2.25} />
      </span>
    </div>
  );
}

/** The title over each group of panels: the page's second heading level. */
function GroupTitle({
  id,
  title,
  subtitle,
  level = "h2",
}: {
  id: string;
  title: string;
  subtitle: string;
  /** The first group carries the page's h1; the two are styled alike. */
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className="mb-7">
      <Heading
        id={id}
        className="font-heading text-[clamp(32px,3.6vw,48px)] leading-[1.08] font-[660] tracking-[-0.02em] text-balance text-t1"
      >
        {title}
      </Heading>
      <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.6] text-pretty text-t2">
        {subtitle}
      </p>
    </div>
  );
}

function RecipePanel() {
  return (
    <section className={PANEL} aria-labelledby="hero-workflows">
      <div className={`grid grid-cols-1 items-start ${DIAGRAM_COLS}`}>
        <WorkflowZone />
        <Connector from={[WRITE_Y]} to={[MID_Y]} />
        <DownConnector />
        <DataZone />
        <Connector from={[MID_Y]} to={LOGIC_Y} />
        <DownConnector />
        <LogicZone />
      </div>

      {/* One caption per zone, aligned under it on desktop. */}
      <dl className={`mt-6 grid grid-cols-1 gap-y-4 border-t border-border-md pt-5 ${DIAGRAM_COLS}`}>
        {ZONES.map(([term, line], i) => (
          <div key={term} className={ZONE_COL_START[i]}>
            <dt className="text-[13px] font-semibold text-t1">{term}</dt>
            <dd className="mt-0.5 text-[13px] text-t3">{line}</dd>
          </div>
        ))}
      </dl>

      <PanelLink href="/architecture">How the platform fits together</PanelLink>
    </section>
  );
}

export function IntegrationsHero() {
  return (
    <BlogHeroBand>
      <div role="group" aria-labelledby="hero-connect">
        <GroupTitle
          id="hero-connect"
          level="h1"
          title="Connect your existing tools"
          subtitle={`Activepieces support brings ${PIECE_COUNT} ready-made connectors, plus Powerhouse integrations built for your industry. Nothing you run today has to be replaced.`}
        />
        {/* Any piece, plus our own: one panel, joined by the plus. */}
        <div
          className={`${FRAME} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)]`}
        >
          <CataloguePanel />
          <PlusDivider />
          <IndustryPanel />
        </div>
      </div>

      <div className="mt-20">
        <GroupTitle
          id="hero-workflows"
          title="And turn them into reliable enterprise apps"
          subtitle="Combine with auditable data models, controlled execution flows and more."
        />
        <RecipePanel />
      </div>
    </BlogHeroBand>
  );
}

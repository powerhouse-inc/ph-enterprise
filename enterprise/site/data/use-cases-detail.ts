export type UseCaseStep = {
  label: string;
  body: string;
};

export type UseCaseScreenshot = {
  src: string;
  caption: string;
  /** Intrinsic pixel dimensions — used to reserve aspect-ratio space (no layout shift). */
  width: number;
  height: number;
  /**
   * How the shot is placed against its copy.
   * "wide"  — landscape (≳1.4:1); sits beside the copy in a 2-column row.
   * "full"  — square/portrait or dense UI; breaks out to a full-width row so detail stays legible.
   * Defaults to "wide" when omitted.
   */
  layout?: "wide" | "full";
};

export type UseCaseDetailSlug =
  | "service-offering"
  | "onboarding-operational-hub"
  | "rfp-hub";

export type UseCaseDetail = {
  slug: UseCaseDetailSlug;
  title: string;
  domain: string;
  /** One-line summary, used on the index grid and detail hero. */
  oneLiner: string;
  /** Short "in short" framing — a plain description of what this is, not a claim. */
  summary: string;
  accent: string;
  accentSoft: string;
  /** Problem narrative — one or more paragraphs. */
  problem: readonly string[];
  /** Solution narrative — paragraphs of prose. */
  solution: readonly string[];
  /** Optional phased breakdown of the solution (Evaluate / Onboard / Operate, etc.). */
  solutionSteps?: readonly UseCaseStep[];
  /** "How Powerhouse Makes It Possible" — paragraphs. */
  howItWorks: readonly string[];
  /** Outcome bullets. */
  outcomes: readonly string[];
  screenshots: readonly UseCaseScreenshot[];
  /** Optional live URL. */
  liveUrl?: string;
  metaDescription: string;
};

export const USE_CASE_DETAILS: Record<UseCaseDetailSlug, UseCaseDetail> = {
  "service-offering": {
    slug: "service-offering",
    title: "Service Offering",
    domain: "Commercial operations & subscription billing",
    oneLiner:
      "A no-code way to design, price, sell, and bill a productized service — and run the whole subscription lifecycle from one place.",
    summary:
      "A full commercial subscription platform — marketplace, tiered and usage-based pricing, a verifiable billing ledger, and operator analytics — built as configuration rather than bespoke software.",
    accent: "#00D4FF",
    accentSoft: "rgba(0, 212, 255, 0.16)",
    problem: [
      "Pricing lives in spreadsheets nothing enforces. The catalogue customers see drifts from what finance invoices, usage-based pricing needs custom engineering, and no one can say what changed or who approved it. The gap between what you sell and what you bill quietly leaks revenue.",
    ],
    solution: [
      "Stand up a complete, billable service without code. Define the product, build tiers and billing cycles, and add usage metrics with real billing semantics — free limits, overage pricing, cumulative or not. It publishes to a marketplace, and the same system runs the back office: a ledger moving charges from charged → invoiced → paid, on-demand invoices, and a dashboard tracking MRR, plans, and usage.",
    ],
    howItWorks: [
      "One document model drives the marketplace, the billing engine, and the dashboard — so what you sell and what you bill can’t drift apart. Tiers and metrics are data, not code: reshape the commercial model by editing a document. Every change is a signed operation, so the ledger is the document’s own state, not a report built after the fact.",
    ],
    outcomes: [
      "Launch or change an offering in an afternoon — pricing is configuration, not a ticket.",
      "One source of truth — the tier a customer picks is the structure that bills them.",
      "Usage-based pricing out of the box — metrics, limits, and overage, no custom code.",
      "Every charge traces to a signed operation.",
    ],
    screenshots: [
      { src: "/usecases/service-offering/01-product-info.png", width: 1252, height: 1111, layout: "full", caption: "Define the product — name, description, and positioning for the offering." },
      { src: "/usecases/service-offering/02-pricing-matrix.png", width: 1071, height: 1183, layout: "full", caption: "Configurable tiers and usage metrics — cumulative and non-cumulative, with free limits and overage pricing." },
      { src: "/usecases/service-offering/03-marketplace.png", width: 1252, height: 1269, layout: "full", caption: "The published marketplace — customers self-serve onto a plan." },
      { src: "/usecases/service-offering/04-subscription.png", width: 1060, height: 1057, layout: "full", caption: "A live subscription instance with its transparent debt ledger: charged → invoiced → paid." },
      { src: "/usecases/service-offering/05-operator-dashboard.png", width: 1449, height: 1269, layout: "full", caption: "The operator dashboard — MRR, plans, usage, and action items across the book of business." },
    ],
    metaDescription:
      "Service Offering: a no-code subscription platform — marketplace, tiered and usage-based pricing, a verifiable billing ledger, and operator analytics — built as configuration on the Powerhouse framework.",
  },

  "onboarding-operational-hub": {
    slug: "onboarding-operational-hub",
    title: "Onboarding Operational Hub",
    domain: "Legal entity formation & back-office operations",
    oneLiner:
      "A turnkey legal and operational home — entity, payments, compliance, and reporting — delivered to a team as a live, owned workspace rather than a folder of PDFs and a pile of SaaS logins.",
    summary:
      "A legal-and-operations services business delivering its entire customer-facing product as a Powerhouse workspace — entity documents, payment operations, reports, and portable identity all living as documents in a drive the customer owns.",
    accent: "#7A3AFF",
    accentSoft: "rgba(122, 58, 255, 0.18)",
    problem: [
      "Builder teams and DAOs do real economic work before they have a back office for it. Funding, cross-border payouts, compliance, and clean records become a second job in spreadsheets and email. Standing up a legal entity is worse — which structure, which jurisdiction, what tradeoffs — with answers scattered across lawyers and forum posts.",
    ],
    solution: [
      "A complete operational home from day one — a short, legible journey from entity choice to running workspace.",
    ],
    solutionSteps: [
      { label: "Evaluate", body: "Compare the legal options (Swiss Association vs. fiscal host vs. US LLC) across ownership, privacy, liability, and regulatory clarity — a decision made on facts." },
      { label: "Onboard", body: "Sign in with a portable identity, pick a plan, and the entity is formed with licensed counsel: address, VAT docs, templates, founding documents." },
      { label: "Operate", body: "The Hub becomes a living workspace — setup tasks, recurring services (tax filing, payouts, accounting close), legal docs, and reports, all owned by the team." },
    ],
    howItWorks: [
      "The Hub is a set of Powerhouse documents in a drive the customer owns, not records in someone else’s system. Identity is portable, and because every document carries a signed history, the back office is auditable by construction — the reports are the running state, not something generated later. A services company hands customers a real operational home, not a login.",
    ],
    outcomes: [
      "Ops stops being a side job — funding, payouts, and compliance run as workflows.",
      "The entity decision is made on facts, not scattered advice.",
      "The customer owns their back office — docs and records live in a drive they control.",
      "Auditable from day one — every document carries a verifiable history.",
    ],
    screenshots: [
      { src: "/usecases/onboarding-operational-hub/01-compare-structures.png", width: 2128, height: 1225, layout: "wide", caption: "“How it compares” — Swiss Association vs. Fiscal Host vs. US LLC across the criteria that matter." },
      { src: "/usecases/onboarding-operational-hub/02-account-identity.png", width: 2014, height: 931, layout: "wide", caption: "The customer account: operator profile and portable Renown identity." },
      { src: "/usecases/onboarding-operational-hub/03-operational-dashboard.png", width: 2515, height: 1285, layout: "wide", caption: "The live Hub workspace — config, setup tasks, recurring services, documents, and reports." },
    ],
    metaDescription:
      "Onboarding Operational Hub: a legal-and-operations business delivers entity formation, payments, compliance, and reporting as a live, owned Powerhouse workspace — not a folder of PDFs.",
  },

  "rfp-hub": {
    slug: "rfp-hub",
    title: "RFP Hub",
    domain: "Web3 funding discovery & open data standards",
    oneLiner:
      "A neutral aggregation layer that collects funding opportunities from every ecosystem into one open, signed schema — the shared substrate every dashboard, aggregator, and agent can read from.",
    summary:
      "A neutral, public, multi-source data standard — one open, signed, CC0 schema (DAOIP-5) that aggregates web3 funding opportunities from many funders and feeds an entire ecosystem of consumers.",
    accent: "#F2CB29",
    accentSoft: "rgba(242, 203, 41, 0.16)",
    liveUrl: "https://rfp-hub.vetra.io",
    problem: [
      "Web3 funding is scattered across dozens of siloed portals. Applicants check ten places and miss half. Funders rebuild the same listing on every aggregator. There’s no shared format, no trusted single source, and no machine-readable feed. The ecosystem doesn’t need another portal — it needs a common layer underneath them all.",
    ],
    solution: [
      "RFP Hub is that layer — it indexes every kind of open funding opportunity from many funders and normalizes them to one vocabulary.",
    ],
    solutionSteps: [
      { label: "Aggregate", body: "Funding calls flow in through signed submissions, deduplicated across sources, always linking back to the original to apply." },
      { label: "Standardize", body: "Everything maps to one open schema (DAOIP-5, CC0). Each entry carries submitter identity and verification state — provenance-tracked, not just listed." },
      { label: "Discover", body: "A clean public view, searchable and filterable, sorted deterministically by deadline — no ranking, no paid placement. Each entry opens to a full brief with verifiable provenance." },
      { label: "Distribute", body: "Served six ways — GraphQL, JSON snapshots, RSS/Atom, webhooks, IPFS, and the raw log — all the same schema, so any tool can build on it without permission." },
    ],
    howItWorks: [
      "Each funding opportunity is a typed document, and every change is a signed, append-only operation — so the whole index is auditable and replayable. The state projects into many formats from one source, so the six surfaces never drift. And because the schema is open and the code forkable, no operator owns the standard: neutrality enforced by architecture, not promised.",
    ],
    outcomes: [
      "One place to discover funding — every open opportunity in a single neutral index.",
      "An open standard, not a portal — one CC0 schema any tool can build on.",
      "Provenance you can verify — signed operations make every entry auditable.",
      "Consume it any way — GraphQL, JSON, RSS, webhooks, IPFS, and the raw log.",
    ],
    screenshots: [
      { src: "/usecases/rfp-hub/01-aggregation-layer.png", width: 1221, height: 1165, layout: "full", caption: "The hub homepage — “Not in one place. On one layer.” — with live index stats." },
      { src: "/usecases/rfp-hub/02-grant-pools.png", width: 996, height: 1107, layout: "full", caption: "Every open funding opportunity, indexed as DAOIP-5 grant pools, searchable and filterable." },
      { src: "/usecases/rfp-hub/03-rfp-detail-provenance.png", width: 988, height: 1218, layout: "full", caption: "A single RFP with full brief, eligibility, evaluation criteria, and verifiable provenance." },
      { src: "/usecases/rfp-hub/04-export-surfaces.png", width: 1162, height: 1293, layout: "full", caption: "Six ways to consume the hub — GraphQL, JSON snapshots, RSS/Atom, webhooks, IPFS, raw log." },
    ],
    metaDescription:
      "RFP Hub: a neutral aggregation layer that normalizes web3 funding opportunities to one open, signed CC0 schema (DAOIP-5) and serves them via GraphQL, JSON, RSS, webhooks, and IPFS — built on Powerhouse.",
  },
};

export const USE_CASE_ORDER: readonly UseCaseDetailSlug[] = [
  "service-offering",
  "onboarding-operational-hub",
  "rfp-hub",
];

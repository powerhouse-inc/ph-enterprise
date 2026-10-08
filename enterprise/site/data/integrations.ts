/**
 * Integration catalogue.
 *
 * An integration is not a blog post and not a demo. It is a shippable unit
 * with five facets, and the type below carries all five:
 *
 *   connector  - the sync package that watches a system you already run
 *   model      - the typed structure its data becomes, plus a lifecycle
 *   boundary   - what enters, in which direction, and who can read it
 *   surfaces   - where the structured result becomes usable
 *   deployable - code you can run today, with prerequisites and limits
 *
 * Every field here is evidenced by the walkthrough in `data/blog.ts` or by
 * the example repository. Nothing is aspirational. COPY_STANDARD forbids
 * claiming an integration ships before it does, so an entry only exists once
 * there is something to run.
 */

export type IntegrationScopeRow = {
  label: string;
  value: string;
};

/** Shown as a chip on the record header. Keep the set small and honest. */
export type IntegrationStatus = "Available" | "In development";

/**
 * How a status reads on the page. Every integration is a runnable demo on demo
 * data (PRODUCT.md), so "Available" must never read as production-ready: it is
 * shown as what it is, in neutral text, not in proof green.
 */
export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  Available: "Runnable demo",
  "In development": "In development",
};

/** One field of the document model the integration writes into. */
export type ModelField = {
  name: string;
  type: string;
  note: string;
};

/** A package the integration installs, and what it is responsible for. */
export type IntegrationPackage = {
  name: string;
  role: string;
};

/** A place the structured result becomes usable. */
export type IntegrationSurface = {
  name: string;
  role: string;
  /** Deep link to the architecture page, so component names stay explained. */
  href?: string;
};

export type IntegrationStep = {
  label: string;
  body: string;
};

export type IntegrationShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /**
   * A reading guide set beside a tall capture, one stage per group of blocks
   * in the order they appear. Only for portrait shots, where the text can run
   * the height of the image instead of sitting under it.
   */
  stages?: readonly ShotStage[];
};

export type ShotStage = {
  heading: string;
  body: string;
  /** The blocks in this stage, each with the piece that runs it. */
  steps: readonly { label: string; piece: string }[];
};

/**
 * A real editor capture of the model, with the box each field occupies, in
 * the image's own pixels. Lets the record show the model on the UI a person
 * actually uses instead of as a bare table.
 */
export type ModelAnatomy = {
  src: string;
  alt: string;
  width: number;
  height: number;
  spots: readonly { field: string; x: number; y: number; w: number; h: number }[];
};

/**
 * One part of the recipe a case study is built from: the professional system,
 * what connects it (Activepieces pieces or a dedicated connector), the
 * document model it writes into, and the app people work in.
 */
export type RecipePart = {
  kind: "system" | "pieces" | "connector" | "model" | "app";
  label: string;
};

export type VetraLink = { url: string; label?: string };

export type IntegrationEntry = {
  slug: string;
  name: string;
  category: string;
  status: IntegrationStatus;
  summary: string;
  /**
   * The vendor's own wordmark, sized for a light surface. Optional: an
   * integration without a usable mark falls back to its name set in type.
   * width/height are the source viewBox, so callers set height and let the
   * width follow.
   */
  logo?: {
    src: string;
    width: number;
    height: number;
    /**
     * "wordmark" (default) carries the name itself and replaces it. "mark" is
     * a square glyph, so it is set beside the name rather than instead of it.
     */
    kind?: "wordmark" | "mark";
  };
  /** What the integration is allowed to touch, in the order shown on the site. */
  scope: readonly IntegrationScopeRow[];
  /**
   * The events that start work and the things it then does, in the reading
   * order of the Activepieces piece pages the index is modelled on. Only what
   * the record already evidences below; leave empty rather than guess.
   */
  triggers?: readonly string[];
  actions?: readonly string[];
  /**
   * How the integration uses the Activepieces catalogue, where it does. Shown
   * on the card with a link to the catalogue record. Absent when it does not
   * run as pieces.
   */
  activepieces?: string;

  /* ---- index case study ---- */

  /** The industry the case study serves; the card's headline. */
  industry?: string;
  /**
   * What happens, in order: the trigger, the actions and the access rule,
   * written as one list of plain steps.
   */
  steps?: readonly string[];
  /** The case study's recipe, in reading order. */
  recipe?: readonly RecipePart[];
  /**
   * The package page on Vetra that lists the modules the integration ships.
   * Only set where a page exists today; the label says what the page holds
   * when it is not the integration's own package.
   */
  vetra?: VetraLink;

  /* ---- detail page ---- */

  /** Short benefit line set under the name in the detail H1. */
  claim: string;
  /** Reading order of the flow, e.g. `Paperless-ngx -> Invoice`. */
  flow: string;
  /** One sentence on the record card and under the detail H1. */
  oneLiner: string;
  /** Search-result copy. Keep near 155 characters. */
  metaDescription: string;
  /** Defines the third-party system for readers who have not met it. */
  primer?: { label: string; body: string };
  /** Direction of travel, stated plainly. */
  direction: string;
  /** How material gets in. */
  inputs?: readonly string[];
  /**
   * The document model the connector writes into. Absent for an integration
   * that has no model of its own, such as a workflow layer that writes into
   * whichever model you point it at.
   */
  model?: {
    name: string;
    fields: readonly ModelField[];
    lifecycle: readonly string[];
    /** Label over the lifecycle row, when it lists operations rather than states. */
    lifecycleLabel?: string;
    /** Optional: the fields shown on an editor capture, interactively. */
    anatomy?: ModelAnatomy;
  };
  /** The boundary narrative. One idea per paragraph. */
  boundary: readonly string[];
  /** The path a document takes, in order. */
  pipeline?: readonly IntegrationStep[];
  /** Where the structured result shows up. */
  surfaces: readonly IntegrationSurface[];
  /** Packages installed at run time. */
  packages?: readonly IntegrationPackage[];
  /** What you need before you start. */
  requirements?: readonly string[];
  /** Honest constraints. These belong on the page, not in a footnote. */
  limits?: readonly string[];
  /** A real query against the structured result. */
  sample?: { label: string; language: string; code: string };
  /** Runnable example. */
  repoUrl?: string;
  /** The walkthrough post that proves it, if one exists. */
  walkthroughSlug?: string;
  /** Product evidence. */
  shots?: readonly IntegrationShot[];
  /**
   * A short silent walkthrough. When present it opens the record in place of
   * the lead shot, which then joins the gallery. Every figure in it must come
   * from the demo, the same rule the shots follow.
   */
  video?: IntegrationVideo;
  /** The demo scenario, drawn in the hero. */
  scenario?: IntegrationScenario;
  /** The name behind an acronym, shown beside it in the hero. */
  fullName?: string;
  /** The vendor's own site, linked from the hero's meta line. */
  site?: { url: string; label: string };
  /** A close that follows from this record's case; the generic one otherwise. */
  close?: { title: string; body?: string };
  /**
   * "simple": the hero, then How it works, and nothing else. The default is
   * the older seven-section page, kept until every record moves.
   */
  layout?: "simple";
  /** Hero copy for the simple layout. */
  hero?: {
    /** One or two sentences under the title; replaces the one-liner. */
    subtitle: string;
  };
  /** The simple layout's only section: what happens, step by step. */
  howItWorks?: {
    /** Plain text, with optional links. */
    intro: readonly (string | { text: string; href: string })[];
    /**
     * Badge section that runs each step: 0 is Powerhouse, 1.. index into
     * `services`. When set with `services`, the steps are drawn as the
     * design system's stage + diagram instead of a plain list.
     */
    steps: readonly { title: string; body: string; service?: number }[];
    /** The systems the steps run in, in badge order. Square marks only. */
    services?: readonly { name: string; logo: string }[];
    /** What the demo is and where it stops. */
    note?: string;
    /** Caption for the workflow capture shown beside the steps. */
    shotCaption?: string;
    /** A short film of the flow, shown above the steps. */
    video?: {
      src: string;
      poster: string;
      width: number;
      height: number;
      /** What the film shows, for assistive technology. */
      label: string;
      caption?: string;
    };
  };
};

/**
 * The scenario a record's demo runs, drawn in the hero: the system material
 * arrives from, the Powerhouse document it becomes, and the system that
 * document drives and hears back from. Every value must come from the demo
 * run, the same rule the shots follow.
 */
export type IntegrationScenario = {
  source: ScenarioSystem;
  target: ScenarioSystem;
  record: {
    title: string;
    model: string;
    fields: readonly { name: string; value: string }[];
    approval: string;
    evidence: string;
    /** Omitted when the demo stops before a verdict exists. */
    verdict?: string;
  };
  /** Edge labels, in the order the scenario runs. */
  /** `report` is omitted when the integration runs one way. */
  flows: { capture: string; dispatch: string; report?: string };
  caption: string;
};

export type ScenarioSystem = {
  name: string;
  role: string;
  /** Omitted for a target with no mark of its own, such as a drive app. */
  logo?: { src: string; width: number; height: number; kind: "mark" | "wordmark" };
  items: readonly string[];
};

export type IntegrationVideo = {
  src: string;
  /** A real frame, shown at rest, while loading, and under reduced motion. */
  poster: string;
  width: number;
  height: number;
  /** What the video shows, for assistive technology. */
  label: string;
  caption: string;
  /**
   * Scenes of the film, in seconds. When present the film is scroll-driven:
   * the stage pins and scroll position becomes the playhead. The file must
   * then be encoded with dense keyframes, or the scrub stutters.
   */
  chapters?: readonly VideoChapter[];
};

export type VideoChapter = {
  /** Where the scene starts in the film, in seconds. */
  start: number;
  title: string;
  /** One sentence the scene itself shows; no figure the film does not. */
  body: string;
};

/**
 * The invoice document model's lifecycle, as published on
 * /use-cases/invoicing-payouts. Shared, because an integration does not own
 * the model it writes into or reads from.
 */
const INVOICE_LIFECYCLE = [
  "draft",
  "issued",
  "accepted",
  "scheduled",
  "sent",
  "received",
  "closed",
] as const;

const INVOICE_FIELDS = [
  { name: "invoiceNo", type: "String", note: "The issuer's own reference." },
  { name: "currency", type: "String", note: "Currency of the totals." },
  { name: "dateIssued", type: "DateTime", note: "When the invoice was raised." },
  { name: "dateDue", type: "DateTime", note: "When payment falls due." },
  { name: "status", type: "Enum", note: "Position in the lifecycle below." },
  { name: "issuer", type: "Object", note: "Name and country of the party billing you." },
  { name: "totalPriceTaxExcl", type: "Float", note: "Net total across line items." },
  { name: "totalPriceTaxIncl", type: "Float", note: "Gross total across line items." },
  { name: "lineItems", type: "Array", note: "Description, quantity, unit price, tax percent, gross total." },
] as const;

const PAPERLESS: IntegrationEntry = {
  slug: "paperless-ngx",
  name: "Paperless-ngx",
  category: "Document capture",
  status: "Available",
  industry: "Operations",
  steps: [
    "Paperless classifies a document as an invoice",
    "A language model reads the invoice fields",
    "An invoice record is filed for review",
    "Approval and payment stay with their own workflows",
  ],
  recipe: [
    { kind: "system", label: "Paperless-ngx" },
    { kind: "connector", label: "paperless-sync" },
    { kind: "model", label: "Invoice" },
    { kind: "app", label: "Billing dashboard" },
  ],
  summary:
    "Invoices and receipts captured in Paperless-ngx become structured invoice records with line items, human approval, and payment workflows.",
  logo: {
    src: "/logos/integrations/paperless-ngx.svg",
    width: 2670,
    height: 860,
  },
  scope: [
    { label: "Data in", value: "Invoices and receipts" },
    { label: "Structure", value: "Invoice records with line items" },
    { label: "Access", value: "Scoped to approval and payment workflows" },
  ],
  triggers: ["Paperless classifies a document as an invoice"],
  actions: [
    "Read the invoice fields with a language model",
    "File an invoice record for review",
  ],
  activepieces:
    "Its Paperless trigger is also an Activepieces piece, which the UMH workflows use.",

  site: {
    url: "https://github.com/paperless-ngx/paperless-ngx",
    label: "github.com/paperless-ngx",
  },
  claim: "Invoices from Paperless-ngx, filed as structured records",
  layout: "simple",
  hero: {
    subtitle:
      "Paperless receives an invoice PDF by upload, watched folder or email. A language model reads it into a Powerhouse invoice record, filed by month for review in Connect and queryable over GraphQL.",
  },
  howItWorks: {
    intro: [
      "The paperless-sync connector joins Paperless to a Billing drive in Powerhouse. It reads only the documents Paperless has classified as invoices, and it never writes back to the archive.",
    ],
    steps: [
      {
        title: "Paperless receives the invoice",
        body: "Upload the PDF, drop it in the consume folder, or let Paperless collect it from a mailbox. Paperless reads the text and classifies the document as an invoice.",
      },
      {
        title: "The connector hands it to a model",
        body: "A Paperless workflow pushes the invoice to paperless-sync, which sends the extracted text to the configured model. The example uses google/gemini-2.5-flash through OpenRouter.",
      },
      {
        title: "The model fills the invoice record",
        body: "Issuer, payer, invoice number, dates, currency, line items and totals become typed fields on a Powerhouse invoice.",
      },
      {
        title: "It is filed for review",
        body: "The record lands in the Billing drive under the month it belongs to. Open it in Connect and check it against the original scan.",
      },
      {
        title: "Every consumer reads the same state",
        body: "Connect shows the invoice, Switchboard serves it over GraphQL and HTTP, and the Billing dashboard rolls up every invoice by month and status.",
      },
    ],
    note: "The example runs locally in Docker on sample invoices. It accepts PDFs only, and synchronisation runs one way: edits made in Powerhouse do not travel back to Paperless.",
    // Rendered from integration-films/paperless/scene.html, built from the
    // walkthrough's own captures and invoice PT-2026-2041's values.
    video: {
      src: "/integrations/paperless-invoice-12s.mp4",
      poster: "/integrations/paperless-invoice-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film of the flow: invoice PT-2026-2041 from Lumen Type Foundry is read by Paperless, its fields become a typed Powerhouse invoice record, the same invoice opens in Connect, and the Billing dashboard shows it among the rest.",
      caption: "Invoice PT-2026-2041, from the scan to the Billing dashboard.",
    },
  },
  close: {
    title: "Put your own invoices on a record like this.",
  },
  // Invoice PT-2026-2041 from the walkthrough's run of powerhouse-inc/paperless-billing.
  scenario: {
    source: {
      name: "Paperless-ngx",
      role: "Document archive",
      logo: { src: "/logos/integrations/paperless-ngx.svg", width: 2670, height: 860, kind: "wordmark" },
      items: ["Invoice PT-2026-2041", "Uploaded PDF, OCR and classified"],
    },
    target: {
      name: "Billing dashboard",
      role: "Every invoice in the drive, rolled up",
      items: ["Monthly value by status", "Top payers by invoice total"],
    },
    record: {
      title: "Invoice",
      model: "powerhouse/invoice",
      fields: [
        { name: "issuer", value: "Lumen Type Foundry" },
        { name: "invoiceNo", value: "PT-2026-2041" },
        { name: "dateDue", value: "2026-10-01" },
        { name: "totalPriceTaxIncl", value: "13,500.00 EUR" },
      ],
      approval: "Filed for review",
      evidence: "Billing drive, September 2026",
    },
    flows: {
      capture: "Read by a language model",
      dispatch: "Rolled up as invoices arrive",
    },
    caption:
      "The demo scenario: an invoice arrives in Paperless, becomes an invoice record in Powerhouse, and the Billing dashboard rolls it up with the rest.",
  },
  flow: "Paperless-ngx \u2192 Invoice",
  oneLiner:
    "An invoice arrives as a PDF and leaves as a structured record that interfaces, APIs and AI tools can work with.",
  metaDescription:
    "Captured PDFs become typed Powerhouse invoice records with line items, an auditable append-only history that replays deterministically, and a GraphQL API.",

  primer: {
    label: "What is Paperless-ngx?",
    body: "Paperless-ngx is an open-source document manager that you host yourself. Send it a PDF by scan, email, or upload. It runs OCR on the text, assigns a document type and tags, and keeps the file searchable in one archive. The documents stay on infrastructure you control.",
  },

  direction: "Paperless-ngx to Powerhouse, one way.",

  inputs: [
    "Upload a PDF through the Paperless web interface.",
    "Drop a folder of PDFs into the watched consume directory.",
    "Let Paperless collect attachments from a monitored mailbox over IMAP.",
  ],

  model: {
    name: "Invoice",
    fields: INVOICE_FIELDS,
    lifecycle: INVOICE_LIFECYCLE,
  },

  boundary: [
    "Paperless keeps the original document and stays the archive for it. Powerhouse holds the structured representation, and the two are linked rather than merged.",
    "The connector reads documents that Paperless has classified as invoices. It does not reach the rest of the archive, and it does not write back.",
    "Because the structure is defined by the invoice document model, every consumer of the data sees the same typed fields. What a person can read and what an agent can read is decided at this boundary, not per tool.",
    "The invoice record is a log of operations rather than a row that later writes overwrite. Replay the log and the same state returns, so a reviewer's correction sits beside the extracted value instead of replacing it.",
  ],

  pipeline: [
    {
      label: "Capture",
      body: "A PDF reaches Paperless by upload, watched folder, or mailbox. Paperless runs OCR and classifies it as an invoice.",
    },
    {
      label: "Hand off",
      body: "A Paperless workflow pushes documents of that type into the Powerhouse connector. Classification is what triggers the hand-off.",
    },
    {
      label: "Structure",
      body: "The connector sends the extracted text to a configured language model, which maps it onto the invoice document model's fields.",
    },
    {
      label: "File",
      body: "The result lands in the Billing drive as an invoice record, filed under the month it belongs to, ready for review.",
    },
  ],

  surfaces: [
    {
      name: "Connect",
      role: "Review and edit the structured invoice in the operator workspace, filed by month in the Billing drive.",
      href: "/architecture#connect",
    },
    {
      name: "Switchboard",
      role: "Query the same state over GraphQL, or over plain HTTP, from any other application.",
      href: "/architecture#switchboard",
    },
    {
      name: "Billing dashboard",
      role: "Monthly invoice value by status, totals and counts by status, outstanding amounts by due month, and totals across currencies.",
    },
  ],

  packages: [
    {
      name: "@powerhousedao/paperless-sync",
      role: "The connector: watches Paperless and writes invoice records.",
    },
    {
      name: "@powerhousedao/billing",
      role: "The invoice document model and its drive app.",
    },
  ],

  requirements: [
    "Docker, to run the example stack.",
    "An OpenAI-compatible endpoint and API key for field extraction. The example points at OpenRouter by default, and the Anthropic API works without a base URL.",
    "A Paperless-ngx instance. The example brings its own.",
  ],

  limits: [
    "Extraction quality is the model's, not the connector's. Smaller models are noticeably less reliable at the arithmetic on a line-item table.",
    "The example accepts PDFs only. Office documents and .eml files need the optional Tika and Gotenberg services, which stay disabled to keep the stack light.",
    "Synchronisation runs one way. Edits made in Powerhouse do not travel back to Paperless.",
    "The image tag and both package versions form one compatibility set, so move them together.",
  ],

  sample: {
    label: "Ask Switchboard for the structured invoice",
    language: "graphql",
    code: `{
  Invoice {
    documents {
      totalCount
      items {
        state {
          global {
            invoiceNo
            currency
            dateDue
            status
            issuer { name country }
            totalPriceTaxIncl
            lineItems {
              description
              quantity
              taxPercent
            }
          }
        }
      }
    }
  }
}`,
  },

  repoUrl: "https://github.com/powerhouse-inc/paperless-billing",
  walkthroughSlug: "paperless-ngx-pdf-to-structured-data",

  shots: [
    {
      src: "/blog/paperless/invoice-in-connect.png",
      alt: "The invoice open in Powerhouse Connect, under a September 2026 month in the Billing drive: issuer, payer, issue and due dates, currency, and three line items with a total of 13,500.00 EUR.",
      caption:
        "The same invoice in Connect: issuer, payer, dates, currency and line items, now fields rather than pixels.",
      width: 1440,
      height: 944,
    },
    {
      src: "/blog/paperless/billing-dashboard.png",
      alt: "The Powerhouse Billing dashboard: monthly invoice value by status across ten months, and total invoice value by paying entity.",
      caption: "The Billing dashboard over a folder of consumed invoices.",
      width: 3200,
      height: 2000,
    },
  ],
};

/**
 * Sourced from powerhouse-inc/umh-powerhouse: the README walk, the bootstrap
 * script's mapping instructions (which is where the field list and the human
 * gate come from), and .env.example. The walkthrough post carries the long
 * form, including the film.
 */
const UMH: IntegrationEntry = {
  slug: "umh",
  // The acronym is the name people use; the hero spells it out beside it.
  name: "UMH",
  // Always "UMH" on the site; link the vendor rather than spell it out.
  site: { url: "https://www.umh.app", label: "umh.app" },
  category: "Manufacturing operations",
  status: "Available",
  industry: "Manufacturing",
  steps: [
    "A purchase order arrives in Paperless",
    "A Production Ledger is drafted from it",
    "A person approves the order",
    "The order is created on the factory floor",
    "Floor progress lands in the evidence trail",
  ],
  recipe: [
    { kind: "system", label: "UMH factory floor" },
    { kind: "pieces", label: "UMH \u00b7 Paperless \u00b7 OpenRouter" },
    { kind: "model", label: "Production Ledger" },
    { kind: "app", label: "Connect" },
  ],
  vetra: { url: "https://vetra.io/packages/umh-production-ledger" },
  logo: {
    src: "/logos/integrations/umh.svg",
    width: 48,
    height: 48,
    kind: "mark",
  },
  summary:
    "Purchase-order PDFs become Production Ledgers that a person approves, then the factory floor reports back against the commitment.",
  claim: "Purchase orders tracked against the UMH factory floor",
  layout: "simple",
  hero: {
    subtitle:
      "Paperless receives a purchase order and a workflow turns it into a Production Ledger. You approve it, the order goes to the UMH floor, and the floor's production counts are added to the ledger.",
  },
  howItWorks: {
    intro: [
      "Three workflows built from ",
      { text: "Activepieces", href: "https://www.activepieces.com/pieces" },
      " pieces connect Paperless, the Production Ledger and the UMH floor. Each one runs inside Powerhouse, and you can open and edit it in Workflow Studio. You make one decision: approve the order.",
    ],
    steps: [
      {
        title: "Paperless receives the purchase order",
        service: 1,
        body: "Upload the PDF or drop it in the consume folder. Paperless reads the text and tags the document as a purchase order.",
      },
      {
        title: "A workflow drafts the ledger",
        service: 2,
        body: "A model reads the order into a Production Ledger: customer, part, quantity, quality floor and delivery date. The production line comes from the UMH floor's own list.",
      },
      {
        title: "You approve it in Connect",
        service: 3,
        body: "Check each field against the original scan, correct what the model got wrong, then approve.",
      },
      {
        title: "The order goes to the UMH floor",
        service: 4,
        body: "A second workflow creates the order on the floor, stores the order id on the ledger and opens it.",
      },
      {
        title: "The floor reports back",
        service: 4,
        body: "Every 15 seconds a third workflow adds the floor's good parts and scrap to the ledger.",
      },
    ],
    services: [
      { name: "Paperless-ngx", logo: "/logos/integrations/marks/paperless-ngx.svg" },
      { name: "Activepieces", logo: "/logos/integrations/activepieces.svg" },
      { name: "Connect", logo: "/logos/connect-icon.svg" },
      { name: "UMH", logo: "/logos/integrations/umh.svg" },
    ],
    note: "The UMH floor here is a simulator and the orders are fictional. The demo ends when the run completes: the ledger stays open with close-out pending.",
    // Rendered from umh/umh-video/scene.html, cut at 12 s so it ends on the
    // evidence trail: the verdict scene shows a close-out this demo stops before.
    video: {
      src: "/integrations/umh-ledger-12s.mp4",
      poster: "/integrations/umh-ledger-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film of the flow: purchase order BC-2026-0917 arrives in Paperless, becomes a Production Ledger, three workflows carry it through approval to the UMH floor, and the floor's good parts and scrap are added to the ledger.",
      caption:
        "Purchase order BC-2026-0917, from the scan to the floor's readings.",
    },
  },
  flow: "Purchase order \u2192 Production Ledger",
  scope: [
    { label: "Data in", value: "Purchase-order PDFs and machine actuals" },
    { label: "Structure", value: "Production Ledgers with an evidence trail" },
    { label: "Access", value: "Each step carries its own action allow-list" },
  ],
  triggers: [
    "A new purchase order in Paperless",
    "A person approves the order",
    "The floor reports progress",
  ],
  actions: [
    "Draft a Production Ledger from the order",
    "Create the order on the floor",
    "Add floor progress to the evidence trail",
  ],
  activepieces:
    "Runs as three Activepieces workflows, using the UMH, Paperless and document pieces.",

  oneLiner:
    "A purchase order becomes a commitment a person approves, and the factory floor reports back against it.",
  metaDescription:
    "Purchase-order PDFs become Production Ledgers a person approves, then measured against the factory floor on an append-only log with idempotent evidence.",


  direction:
    "Both ways. Approved commitments create orders on the floor, and the floor's own numbers return as evidence.",

  inputs: [
    "Upload a purchase-order PDF through Paperless, or drop it into the watched consume directory. Its text must contain the word order.",
    "The floor's own counters arrive on a polling trigger, carrying good parts, scrap, and the derived OEE.",
  ],

  model: {
    name: "umh/production-ledger",
    fields: [
      { name: "customer", type: "String", note: "The buyer issuing the purchase order." },
      { name: "manufacturer", type: "String", note: "The supplier receiving it." },
      { name: "agreementRef", type: "String", note: "The supply agreement the order cites." },
      { name: "line", type: "String", note: "Production line instance, resolved against the live floor." },
      { name: "partNumber", type: "String", note: "Part or recipe code, resolved against that line." },
      { name: "committedQuantity", type: "Number", note: "The ordered quantity." },
      { name: "committedQualityPct", type: "Number", note: "First-pass yield floor from the quality clause." },
      { name: "yieldComparison", type: "Enum", note: "AT_OR_ABOVE, or STRICTLY_ABOVE when the clause says above." },
      { name: "committedOeeFloorPct", type: "Number", note: "Minimum line OEE from the capacity clause." },
      { name: "oeeMeasurementBasis", type: "Enum", note: "BUYER_MEASURED, SUPPLIER_REPORTED, or NOT_MEASURED." },
      { name: "scrapLiabilityPerUnit", type: "Money", note: "Liability rate per rejected unit." },
      { name: "latePenaltyPerHour", type: "Money", note: "Penalty rate per hour of late delivery." },
      { name: "requestedDeliveryAt", type: "DateTime", note: "Requested delivery, as a UTC timestamp." },
      { name: "orderId", type: "String", note: "The id the floor minted, bound once and never rewritten." },
      { name: "requiredAcknowledgements", type: "Array", note: "MANUFACTURER, CUSTOMER, PRODUCTION or CONTROLLING; CONTROLLING by default." },
    ],
    // The operations this demo dispatches. START_RUN is a manual editor
    // action no workflow sends; CLOSE_OUT and ACKNOWLEDGE are never reached.
    lifecycleLabel: "Operations in this demo, in order",
    lifecycle: [
      "SET_COMMITMENT",
      "SET_SOURCE_DOCUMENT",
      "APPROVE_ORDER",
      "BIND_ORDER_ID",
      "OPEN_LEDGER",
      "RECORD_ACTUALS_SNAPSHOT",
    ],
    // Boxes are measured on the crop, 654 x 646.
    anatomy: {
      src: "/integrations/umh-ledger-commitment-bc.png",
      alt: "The Commitment card of ledger BC-2026-0917 in Connect, closed out: Meridian Metalwerke for BuildCorp AG, order id, window-frame-1, WIN-STD-A, 320 committed at a 98.5% quality floor, and the agreement terms below.",
      // Captured from the BC-2026-0917 ledger (floor order 564971cc); boxes
      // measured on the crop from the DOM.
      width: 848,
      height: 644,
      spots: [
        { field: "manufacturer", x: 21, y: 65, w: 395, h: 54 },
        { field: "customer", x: 432, y: 65, w: 395, h: 54 },
        { field: "orderId", x: 21, y: 135, w: 395, h: 54 },
        { field: "line", x: 432, y: 135, w: 395, h: 54 },
        { field: "partNumber", x: 21, y: 205, w: 395, h: 54 },
        { field: "committedQuantity", x: 432, y: 275, w: 395, h: 54 },
        { field: "committedQualityPct", x: 21, y: 345, w: 395, h: 54 },
        { field: "committedOeeFloorPct", x: 432, y: 345, w: 395, h: 54 },
        { field: "requestedDeliveryAt", x: 21, y: 415, w: 395, h: 54 },
        { field: "agreementRef", x: 21, y: 502, w: 253, h: 36 },
        { field: "scrapLiabilityPerUnit", x: 298, y: 502, w: 253, h: 36 },
        { field: "latePenaltyPerHour", x: 574, y: 502, w: 253, h: 36 },
        { field: "oeeMeasurementBasis", x: 21, y: 590, w: 253, h: 36 },
        { field: "yieldComparison", x: 298, y: 590, w: 253, h: 36 },
        { field: "requiredAcknowledgements", x: 574, y: 590, w: 253, h: 36 },
      ],
    },
  },

  boundary: [
    "Three workflows do the work a custom processor used to, and each write step carries its own allow-list. The step that applies an extracted commitment may dispatch SET_COMMITMENT and nothing else, so the rule holds even when a model wrote the actions.",
    "No workflow approves a ledger. A person approves it in Connect, and that approval is the event the next workflow reacts to: it creates the floor order, binds the id and opens the ledger.",
    "The line and part never come from the model's answer. Its reply is a search key against the floor's own list of lines and recipes, so an invented line matches nothing and the write is skipped. What reaches the ledger came from the floor.",
  ],

  pipeline: [
    // Drafting and line resolution are shown block by block on the workflow
    // capture, so the list starts where that capture ends.
    {
      label: "Create a floor order on purchase order approval",
      body: "Seven blocks, triggered by the reviewer's APPROVE_ORDER. It asserts there is a line to run on, creates the order, then binds the returned id and opens the ledger. Both failure paths write the reason onto the document instead of failing silently.",
    },
    {
      label: "Append floor progress to the ledger evidence trail",
      body: "Four blocks on a polling trigger. It skips readings that counted nothing, finds the ledger bound to the order, checks the ledger is open, and appends one snapshot.",
    },
    {
      label: "Close-out: not in this demo",
      body: "When the floor reports the run complete, the ledger stays open and the dashboard marks it Close-out pending. The ledger package computes close-out in its order poller, and this demo keeps the poller off so the floor workflow is the only writer on the evidence trail.",
    },
  ],

  surfaces: [
    {
      name: "Workflow Studio",
      role: "The three workflows as editable graphs, with every run, its steps and its duration. A reviewer can read what a step did without reading code, and a developer can change it.",
    },
    {
      name: "Connect",
      role: "Review the extracted commitment beside the original scan, approve the order, and watch the evidence trail fill. The ledger is a local-first document, kept in the browser and backed by its operation log.",
      href: "/architecture#connect",
    },
    {
      name: "Switchboard",
      role: "Query ledger state, and the workflow runtime's own run history, over GraphQL.",
      href: "/architecture#switchboard",
    },
    {
      name: "UMH factory floor",
      role: "The approved order becomes a run on the simulated floor, and its counters return as evidence.",
    },
  ],

  packages: [
    {
      name: "@powerhousedao/piece-umh",
      role: "The floor: list lines, create an order, and the trigger that reports progress.",
    },
    {
      name: "@powerhousedao/piece-reactor",
      role: "Document find, create, dispatch and schema. The blocks that touch a ledger.",
    },
    {
      name: "@powerhousedao/piece-paperless-ngx",
      role: "The new-document trigger, which registers its own webhook in Paperless.",
    },
    {
      name: "@powerhousedao/piece-core",
      role: "The branches and assertions that guard each workflow.",
    },
    {
      name: "@activepieces/piece-open-router",
      role: "The extraction and line-matching steps, from the Activepieces catalogue.",
    },
    {
      name: "@activepieces/piece-json",
      role: "Resolves the model's line and part against the floor's own list.",
    },
  ],

  requirements: [
    "Docker with Compose v2. The whole stack runs in it, and the first run pulls about 3 GB.",
    "An OpenRouter key for the two model steps, set as PAPERLESS_AI_API_KEY in .env. The ledger package version, UMH_LEDGER_VERSION, comes pinned in .env.example.",
    "Free host ports: 8000 (Paperless), 3000 (Connect), 4001 (reactor), 8081 (the simulator), 8095 (umh-core), 80 (gateway), 502 (Modbus), 4840\u20134852 (OPC-UA) and 5432 (database). Paperless, Connect, the reactor and the database can be moved with the *_HOST_PORT variables in .env.",
  ],


  repoUrl:
    "https://github.com/powerhouse-inc/umh-powerhouse",
  // The film lives in the walkthrough post, where it is read at the visitor's
  // pace. On the record the hero diagram and the workflow canvas carry the
  // flow, so the page tells it once.
  walkthroughSlug: "united-manufacturing-hub-powered-by-powerhouse",
  primer: {
    label: "What is UMH?",
    body: "UMH is an open-source stack for manufacturing data. It reads machines over protocols such as OPC-UA and Modbus, keeps their history in a time-series database, and makes the shop floor queryable. This example vendors a fixed v1.4.0 deployment of the UMH factory demo, with its machine simulator at v1.1.0 and umh-core pinned at v0.44.8, so the floor runs on your own machines.",
  },
  limits: [
    "The factory floor is a simulator, and the purchase orders, customers and rates are fictional. Purchase order BC-2026-0917 is one of the four sample orders in the repo.",
    "Available means there is something to run. This is a demo on demo data, not a production deployment.",
    "Two steps call OpenRouter, a hosted model API: extraction sends the purchase order's text, and line matching sends the extracted commitment with the floor's list of lines and recipes. Both leave your machines.",
    "The demo stops before close-out. Ledgers reach Close-out pending and stay open, so there is no verdict, run cost or ship-or-hold recommendation yet.",
  ],
  close: {
    title: "Put your own orders on a record like this.",
  },
  // Purchase order BC-2026-0917 on the workflow demo (powerhouse-inc/umh-powerhouse,
  // main). That demo stops before close-out: the poller that computes it is off,
  // and no workflow may dispatch CLOSE_OUT. Show no verdict until one exists.
  // The anatomy capture predates this and shows a closed-out ledger; recapture it.
  scenario: {
    source: {
      name: "Paperless-ngx",
      role: "Document archive",
      logo: { src: "/logos/integrations/paperless-ngx.svg", width: 2670, height: 860, kind: "wordmark" },
      items: ["Purchase order BC-2026-0917", "Scanned PDF, OCR and classified"],
    },
    target: {
      name: "UMH",
      role: "Simulated factory floor",
      logo: { src: "/logos/integrations/umh.svg", width: 48, height: 48, kind: "mark" },
      items: ["Window-frame line", "Good parts, scrap and overall equipment effectiveness (OEE) per run"],
    },
    record: {
      title: "Production Ledger",
      model: "umh/production-ledger",
      fields: [
        { name: "customer", value: "BuildCorp AG" },
        { name: "partNumber", value: "WIN-STD-A" },
        { name: "committedQuantity", value: "320" },
        { name: "committedQualityPct", value: "98.5" },
      ],
      approval: "Approved by a reviewer",
      evidence: "Good parts and scrap, every 15 seconds",
    },
    flows: {
      capture: "Extracted into a draft",
      dispatch: "Order created on approval",
      report: "Progress returns as evidence",
    },
    caption:
      "The demo scenario: a purchase order arrives in Paperless, becomes a Production Ledger in Powerhouse, and the simulated UMH floor's counts are added to it.",
  },
  shots: [
    {
      // Workflow Studio's overview on the demo, captured 2026-10-08 after a
      // run: all three workflows, each with its steps and recent runs. Padded
      // to 16:10 with Studio's own page colour so the card shows it whole.
      src: "/integrations/umh-workflows-overview.png",
      alt: "Workflow Studio's overview of the three UMH workflows: initialize a ledger from a new purchase order (a Paperless trigger and twelve steps), create a floor order on purchase order approval (seven steps, two of them error paths), and append floor progress to the ledger evidence trail (four steps), each marked succeeded with its recent runs.",
      caption:
        "The integration, as three workflows in Workflow Studio: intake, the floor order on approval, and the floor's progress.",
      width: 2758,
      height: 1724,
    },
  ],
};

/**
 * The meta entry. Activepieces is not a system you connect to: it is the layer
 * the other integrations are built in. Sourced from
 * umh-production-ledger/docs/umh-demo-internals.md and the running demo.
 *
 * It has no `model` of its own, deliberately. A workflow writes into whichever
 * document model you point it at.
 */
const ACTIVEPIECES: IntegrationEntry = {
  slug: "activepieces",
  name: "Activepieces",
  category: "Workflow layer",
  status: "Available",
  logo: {
    src: "/logos/integrations/activepieces.svg",
    width: 22,
    height: 19,
    kind: "mark",
  },
  summary:
    "The Activepieces piece catalogue runs inside the reactor, so an integration is a workflow you can read, edit and re-run rather than code you have to deploy.",
  site: { url: "https://www.activepieces.com", label: "activepieces.com" },
  claim: "Integrations built as Activepieces workflows inside the reactor",
  layout: "simple",
  hero: {
    subtitle:
      "The Activepieces piece catalogue runs inside the Powerhouse reactor. An integration becomes a workflow you open, read and change in Workflow Studio, and each step that writes to a document names the operations it may dispatch.",
  },
  howItWorks: {
    intro: [
      "Powerhouse runs the ",
      { text: "Activepieces catalogue", href: "https://www.activepieces.com/pieces" },
      " beside pieces of its own that read and write documents. The UMH integration is built this way, and the film shows its workflows.",
    ],
    steps: [
      {
        title: "A trigger starts the run",
        body: "A piece polls a service, or a document trigger fires on an operation the reactor has just recorded.",
      },
      {
        title: "Guards decide whether to continue",
        body: "Branch and assert blocks stop a run early, or refuse to continue when a precondition does not hold. A run that stops at a guard is a successful run.",
      },
      {
        title: "Steps read what they need",
        body: "Find a document by its state, get a file from a source system, or hand a model the document model's own schema so a prompt cannot drift from it.",
      },
      {
        title: "A model proposes, a query resolves",
        body: "Ask a language model, then resolve its answer against a real list with a query, so what gets written came from the system rather than the model.",
      },
      {
        title: "The write step dispatches operations",
        body: "It dispatches onto a document against the allow-list that step declares. The step that applies an extracted commitment permits SET_COMMITMENT and nothing else.",
      },
    ],
    note: "Twenty-one of the catalogue's pieces declare a runtime dependency and cannot be loaded, because the reactor imports a piece bundle and installs nothing. The rest are self-contained and load normally.",
    // Rendered from integration-films/activepieces/scene.html, built from the
    // UMH demo's Workflow Studio captures.
    video: {
      src: "/integrations/activepieces-workflow-12s.mp4",
      poster: "/integrations/activepieces-workflow-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film: Workflow Studio lists the UMH demo's workflows and connections, the five kinds of block are laid out with the write step allowed to dispatch SET_COMMITMENT only, then the twelve-step workflow that drafts a ledger and the seven-step workflow that creates the floor order are shown as graphs.",
      caption: "Workflow Studio and two of the UMH demo's workflows, block by block.",
    },
  },
  close: {
    title: "Build your own integration as a workflow like this.",
  },
  // The UMH demo's Production Ledger, which three Activepieces workflows write.
  scenario: {
    source: {
      name: "Activepieces",
      role: "Piece catalogue",
      logo: { src: "/logos/integrations/activepieces.svg", width: 22, height: 19, kind: "mark" },
      items: ["Several hundred pieces", "Paperless, OpenRouter and UMH in this demo"],
    },
    target: {
      name: "UMH",
      role: "Simulated factory floor",
      logo: { src: "/logos/integrations/umh.svg", width: 48, height: 48, kind: "mark" },
      items: ["Order created on approval", "Good parts and scrap, every 15 seconds"],
    },
    record: {
      title: "Production Ledger",
      model: "umh/production-ledger",
      fields: [
        { name: "customer", value: "BuildCorp AG" },
        { name: "partNumber", value: "WIN-STD-A" },
        { name: "committedQuantity", value: "320" },
      ],
      approval: "Approved by a reviewer",
      evidence: "SET_COMMITMENT, allowed for this step",
    },
    flows: {
      capture: "Written by a workflow step",
      dispatch: "Order created by a workflow",
      report: "Progress appended by a workflow",
    },
    caption:
      "The scenario from the UMH demo: Activepieces workflows draft a Production Ledger, create the order on the floor after approval, and append the floor's progress.",
  },
  flow: "Any piece \u2192 Document operation",
  scope: [
    { label: "Data in", value: "Whatever a piece's trigger carries" },
    { label: "Structure", value: "Operations on your own document models" },
    { label: "Access", value: "Each write step names the actions it may dispatch" },
  ],

  oneLiner:
    "An integration stops being code somebody has to deploy and becomes a graph you can open, read and change.",
  metaDescription:
    "Activepieces pieces run inside the Powerhouse reactor: composable, observable workflow graphs with per-step action allow-lists, scalable by adding workflows.",

  primer: {
    label: "What is Activepieces?",
    body: "Activepieces is an open-source automation platform with a catalogue of several hundred pieces, each one a connector to a service with its own triggers and actions. Powerhouse runs that catalogue inside the reactor, alongside pieces of its own that read and write documents.",
  },

  direction:
    "Set per workflow. What bounds it is the action list on each step, not the direction of travel.",

  inputs: [
    "A piece's own trigger, such as a new document in an archive or a change on a factory floor.",
    "A document trigger, which sees every operation as it lands and reacts to the ones you name.",
  ],

  boundary: [
    "A workflow step that writes to a document declares the operations it is allowed to dispatch. The step that applies an extracted commitment permits one action type, so a model that returns something else cannot have it applied. The allow-list is the boundary, and it sits next to the step rather than in a policy document.",
    "Creating a document and dispatching into it are separate blocks for this reason. Only the dispatch enforces an allow-list, so building a record empty and dispatching into it is what turns a request into a rule.",
    "Piece code runs under an egress policy that denies private address space, because a piece's configuration is otherwise a request-forgery surface. Credentials stay on the reactor behind a secret reference, so a browser never holds them.",
    "Every run is recorded with its steps, its outcome and its duration. A run that reaches a guard and decides to write nothing is a successful run, not a failure.",
    "A workflow changes a document by dispatching operations into its log. What a run did is readable in the document's history: the operation, the time, and the workflow that dispatched it.",
  ],

  pipeline: [
    {
      label: "Trigger",
      body: "A piece polls a service, or a document trigger fires on an operation the reactor has just recorded.",
    },
    {
      label: "Branch and assert",
      body: "Guards that stop a run early, or refuse to continue when a precondition does not hold.",
    },
    {
      label: "Read",
      body: "Find a document by its state, get a file from a source system, or hand a model the document model's own schema so a prompt cannot drift from it.",
    },
    {
      label: "Decide",
      body: "Ask a language model, or resolve its answer against a real list with a query, so what gets written came from the system rather than the model.",
    },
    {
      label: "Write",
      body: "Dispatch operations onto a document, against the allow-list that step declares.",
    },
  ],

  surfaces: [
    {
      name: "Workflow Studio",
      role: "Build and edit workflows as graphs, hold connections and their secrets, and read every run.",
    },
    {
      name: "Switchboard",
      role: "Runs the workflow runtime, holds the connections, and serves the run history over GraphQL.",
      href: "/architecture#switchboard",
    },
    {
      name: "Connect",
      role: "Where the documents a workflow writes are reviewed and approved by a person.",
      href: "/architecture#connect",
    },
  ],

  packages: [
    {
      name: "@powerhousedao/piece-reactor",
      role: "Document find, create, dispatch and schema. The blocks that touch a document model.",
    },
    {
      name: "@powerhousedao/piece-umh",
      role: "A piece written for one integration, held locally by the reactor that runs it.",
    },
    {
      name: "@activepieces/piece-open-router",
      role: "One of the catalogue's pieces, fetched from the registry at a pinned version.",
    },
  ],

  requirements: [
    "The workflow runtime enabled on the reactor, and Workflow Studio enabled in Connect. Both are configuration, not a separate deployment.",
    "A pinned version for any piece the reactor does not already hold. Without one the name resolves only against local pieces, and an unresolved trigger fails silently.",
  ],

  limits: [
    "Twenty-one of the catalogue's pieces declare a runtime dependency and cannot be loaded, because the reactor imports a piece bundle and installs nothing. The rest are self-contained and load normally.",
    "A workflow cannot call a function in your package. Work that needs a computation over document state stays in the reducer or behind a mutation, not in a graph.",
    "A trigger whose first enable failed backs off, and restarting does not clear the backoff. Toggling the workflow off and on re-enables it.",
    "Nothing re-fires automatically when a step fails against an external system. The trigger has already happened, so a retry is a deliberate act.",
  ],

  shots: [
    {
      src: "/blog/umh-workflows/ap-cover.png",
      alt: "A workflow in Workflow Studio: twelve steps from a new-document trigger through branches, a schema read, a model call and document dispatches, with its two succeeded runs listed below.",
      caption:
        "An integration as a graph. Every step names what it does, and every run it has made is kept beside it.",
      width: 1878,
      height: 1174,
    },
    {
      src: "/blog/umh-workflows/wf-studio.png",
      alt: "Workflow Studio in Connect: a list of workflows and connections on the left, and every run in the drive on the right.",
      caption:
        "Workflow Studio: the workflows in a drive, the connections they use, and every run they have made.",
      width: 3200,
      height: 2000,
    },
    {
      src: "/blog/umh-workflows/wf-create-order.png",
      alt: "The seven-step workflow that creates a floor order on approval, including two error paths that record why an order was not created.",
      caption:
        "Both failure paths are part of the graph: a run that cannot create the order writes the reason onto the document.",
      width: 3200,
      height: 938,
    },
  ],
};

/**
 * Ars Contexta is the system being integrated: an open-source methodology and
 * plugin that derives a markdown knowledge vault, backed by a corpus of 249
 * research claims. This entry covers what changes when those claims become
 * Powerhouse documents. Every field is evidenced by the installed corpus and by
 * github.com/liberuum/powerhouse-knowledge, which is the write path.
 */
const ARS_CONTEXTA: IntegrationEntry = {
  slug: "ars-contexta",
  name: "Ars Contexta",
  category: "Knowledge management",
  status: "Available",
  summary:
    "Claims written as linked markdown become Powerhouse notes with typed relationships, provenance and a lifecycle where approval comes from a different actor than the author.",
  site: {
    url: "https://github.com/agenticnotetaking/arscontexta",
    label: "github.com/agenticnotetaking",
  },
  vetra: {
    url: "https://vetra.io/packages/%40powerhousedao%2Fknowledge-note",
    label: "The Knowledge Vault package on Vetra",
  },
  claim: "Ars Contexta claims, filed as typed notes a person approves",
  layout: "simple",
  hero: {
    subtitle:
      "An agent following the Ars Contexta methodology turns sources into atomic notes with typed links and provenance. It writes through typed operations, and only a different actor can approve a note into canonical knowledge.",
  },
  howItWorks: {
    intro: [
      "The powerhouse-knowledge plugin gives an agent host the Ars Contexta pipeline as skills. The agent writes into the vault through typed operations, and the 249 research claims stay on disk as the methodology a note is checked against.",
    ],
    steps: [
      {
        title: "A source is recorded",
        body: "A source lands in the vault with its origin, its type and a status, before any claim is taken out of it.",
      },
      {
        title: "Each claim becomes a note",
        body: "One note per claim, each carrying an edge back to the source it came from. The skip rate is reported rather than hidden.",
      },
      {
        title: "Links are proposed with a reason",
        body: "Typed links are proposed between the new notes and what the vault already holds, and every link has to state its reason.",
      },
      {
        title: "Older notes are rewoven",
        body: "Older notes are revisited where a new claim changes what they should say, so the graph stays current in both directions.",
      },
      {
        title: "A gate checks, a person approves",
        body: "A quality gate checks description length, connection count and whether each link survives being read back. Approval comes from a different actor than the author, and the model enforces it.",
      },
    ],
    note: "The vault runs on your own reactor with the bai-knowledge-note package. Semantic search needs Switchboard 1.0.50 or newer; older deployments fall back to keyword search.",
    // Rendered from integration-films/ars-contexta/scene.html, built from the
    // Knowledge Vault's own captures. They come from two vaults, so the film
    // shows the flow, not one run.
    video: {
      src: "/integrations/ars-contexta-note-12s.mp4",
      poster: "/integrations/ars-contexta-note-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film of the flow: sources sit in the vault queued for extraction, the Ars Contexta pipeline records, reduces, reflects, reweaves and verifies them into notes, a note reaches canonical once a different actor approves it, and the Knowledge Vault app answers a question from three cited notes.",
      caption: "Sources in the vault, a note through the pipeline, and an answer cited from notes.",
    },
  },
  close: {
    title: "Put your own knowledge on a record like this.",
  },
  // The note "Typed links turn a pile of notes into a map." from the
  // Powerhouse Vault's canonical list, as the Knowledge Vault captures show it.
  scenario: {
    source: {
      name: "Ars Contexta",
      role: "Methodology and agent skills",
      items: ["249 research claims, read from disk", "Sources filed in the vault"],
    },
    target: {
      name: "Knowledge Vault",
      role: "Chat, search and the graph",
      items: ["Answers cited from notes", "Running locally"],
    },
    record: {
      title: "Knowledge note",
      model: "bai/knowledge-note",
      fields: [
        { name: "noteType", value: "concept" },
        { name: "topics", value: "#graph #links" },
        { name: "status", value: "canonical" },
      ],
      approval: "Approved by a different actor",
      evidence: "Typed links turn a pile of notes into a map.",
    },
    flows: {
      capture: "Written through typed operations",
      dispatch: "Read and cited",
    },
    caption:
      "The scenario: an agent following Ars Contexta writes notes into the vault, a different actor approves them, and the Knowledge Vault app answers from them.",
  },
  flow: "Ars Contexta \u2192 Knowledge note",
  scope: [
    { label: "Data in", value: "Research claims, sources and working sessions" },
    { label: "Structure", value: "Atomic notes with typed links and provenance" },
    { label: "Access", value: "The agent may write, and may not approve its own note" },
  ],

  oneLiner:
    "A vault of linked markdown claims becomes a graph the reactor indexes and a person approves into.",
  metaDescription:
    "Ars Contexta claims become Powerhouse notes with typed relationships, provenance, and approval that requires a different actor than the author.",

  primer: {
    label: "What is Ars Contexta?",
    body: "Ars Contexta is an open-source methodology for agent-operated knowledge systems, published as a plugin under MIT. It derives a vault from conversation: atomic claims, maps of content and a processing pipeline, backed by a corpus of 249 research claims that cite one another. What it produces is markdown on disk.",
  },

  direction:
    "One way in. Claims and sources become documents in the vault, while the methodology corpus stays on disk as reference the agent reads.",

  inputs: [
    "The 249 research claims that ship with the plugin, read from disk as the methodology a note is grounded against.",
    "Articles, papers, transcripts and sessions, filed as a source document before anything is extracted from them.",
  ],

  model: {
    name: "bai/knowledge-note",
    fields: [
      { name: "title", type: "String", note: "One claim, written as a sentence." },
      { name: "description", type: "String", note: "A summary, capped at 200 characters." },
      { name: "content", type: "String", note: "The markdown body, with the argument and its references." },
      { name: "noteType", type: "Enum", note: "concept, decision, pattern, architecture, bug-pattern and five more." },
      { name: "status", type: "Enum", note: "Position in the lifecycle below." },
      { name: "topics", type: "Array", note: "Tags the graph clusters and navigates by." },
      { name: "provenance", type: "Object", note: "Author, source origin and the time it was written." },
    ],
    lifecycle: ["draft", "in review", "canonical", "archived"],
  },

  boundary: [
    "A wiki link is text inside a file. The corpus holds 7,684 of them, and nothing outside the file that contains one can say what it means. In the vault a relationship is a typed row in the reactor's own table, so orphan detection, semantic search and map-of-content navigation all read the same edge.",
    "Approval comes from a different actor than the author, and the model enforces it. An agent that drafts a note cannot move it to canonical, so nothing becomes settled knowledge because the thing that wrote it also blessed it.",
    "The agent writes through typed operations and has no free-form path into the graph. A note is assembled from SET_TITLE, SET_DESCRIPTION, SET_CONTENT and ADD_TOPIC, so what it can do to a document is the list of actions the model defines.",
    "The 249 claims stay on disk. They are the methodology a note is checked against rather than documents in your vault, so grounding a note against them writes nothing into the graph.",
  ],

  pipeline: [
    {
      label: "Record",
      body: "A source lands in the vault with its origin, its type and a status, before any claim is taken out of it.",
    },
    {
      label: "Reduce",
      body: "One note per claim, each carrying an edge back to the source it came from. The skip rate is reported rather than hidden.",
    },
    {
      label: "Reflect",
      body: "Typed links are proposed between the new notes and what the vault already holds, and every link has to state its reason.",
    },
    {
      label: "Reweave",
      body: "Older notes are revisited where a new claim changes what they should say, so the graph stays current in both directions.",
    },
    {
      label: "Verify",
      body: "A quality gate checks description length, connection count and whether each link survives being read back.",
    },
  ],

  surfaces: [
    {
      name: "Knowledge Vault app",
      role: "Read the graph, browse notes by map of content, and ask questions of the same index the agent writes into.",
    },
    {
      name: "Connect",
      role: "Review a draft and approve it, which is the step the agent is not allowed to take.",
      href: "/architecture#connect",
    },
    {
      name: "Switchboard",
      role: "Query notes, topics, backlinks and semantic neighbours over GraphQL.",
      href: "/architecture#switchboard",
    },
    {
      name: "Agent host",
      role: "Claude Code, Codex, Cursor, Zed and others read one generated instruction set.",
    },
  ],

  packages: [
    {
      name: "arscontexta",
      role: "The methodology and its 249 claims, published under MIT at agenticnotetaking/arscontexta.",
    },
    {
      name: "powerhouse-knowledge",
      role: "The instruction set and eighteen skills. This is the vault's write path.",
    },
    {
      name: "bai-knowledge-note",
      role: "The Vetra package holding the document models the vault writes into.",
    },
    {
      name: "switchboard-cli",
      role: "Dispatches the actions, and injects the timestamp and action id each one needs.",
    },
  ],

  requirements: [
    "A Powerhouse reactor with the bai-knowledge-note Vetra package deployed.",
    "The Switchboard CLI, pointed at that reactor by profile. There is no default vault, so the target is chosen rather than assumed.",
    "An agent host. Claude Code reads its own frontmatter file, and the rest read the AGENTS.md convention.",
  ],

  limits: [
    "Semantic search needs the Switchboard package at 1.0.50 or newer, which embeds notes and queries on the server. Older deployments fall back to keyword search without saying so.",
    "Batched actions are applied in reverse, so pipeline steps that depend on each other are dispatched one at a time rather than together.",
    "A description over 200 characters fails silently and takes the rest of its batch with it.",
    "An enum value outside the model's set reports success and writes nothing, which is why every write is read back before it is reported.",
  ],

  sample: {
    label: "Ask the graph a question in plain language",
    language: "graphql",
    code: `{
  knowledgeGraphSemanticSearch(
    driveId: "<DRIVE-UUID>"
    query: "how does the reactor store operations?"
    mode: HYBRID
    limit: 5
  ) {
    similarity
    node {
      title
      noteType
      status
    }
  }
}`,
  },

  repoUrl: "https://github.com/liberuum/powerhouse-knowledge",
  shots: [
    {
      src: "/integrations/ars-contexta-graph.png",
      alt: "The 249 Ars Contexta claims drawn as a graph, with the 2,456 links between them and the most connected maps of content labelled.",
      caption:
        "Rendered from the corpus itself: 249 claims and the 2,456 distinct links between them. In the vault each of those lines is a typed edge rather than text inside a file.",
      width: 2880,
      height: 1800,
    },
  ],
};

/**
 * Docling. Evidenced by powerhouse-inc/docling (README, README.service.md,
 * src/*.mjs) and by the vault side on apeiron-M/bai-knowledge-note, branch
 * remote-first-vault: subgraphs/convert (sections, authorize, schema) and
 * editors/knowledge-vault/lib/intake-service.ts (what a published source
 * carries). The service has no document model of its own; the model below is
 * the vault source it feeds, with the fields intake-service sets.
 */
const DOCLING: IntegrationEntry = {
  slug: "docling",
  name: "Docling",
  category: "Document conversion",
  status: "Available",
  industry: "Operations",
  steps: [
    "A file is dropped on the vault's Intake view",
    "Docling converts it and splits it at its own headings",
    "A person confirms which sections to keep",
    "Each kept section is filed as a source",
  ],
  recipe: [
    { kind: "system", label: "Docling" },
    { kind: "connector", label: "docling-service" },
    { kind: "model", label: "Knowledge source" },
    { kind: "app", label: "Knowledge Vault" },
  ],
  // The service is not on Vetra; the vault package holds the Source model
  // and the Knowledge Vault app it files into.
  vetra: {
    url: "https://vetra.io/packages/%40powerhousedao%2Fknowledge-note",
    label: "The Knowledge Vault package on Vetra",
  },
  // The project's own mark, from docling.ai/img/logo.svg.
  logo: {
    src: "/logos/integrations/docling.svg",
    width: 1024,
    height: 1024,
    kind: "mark",
  },
  summary:
    "PDFs, scans and Office files become markdown split at their own headings, and each section a person keeps is filed as a Knowledge Vault source.",
  site: { url: "https://www.docling.ai", label: "docling.ai" },
  claim: "Documents converted by Docling, split into the sections you keep",
  layout: "simple",
  hero: {
    subtitle:
      "Drop a PDF, scan or Office file on the vault's Intake view. Docling converts it to markdown and splits it at its own headings, and each section a person keeps is filed as a Knowledge Vault source.",
  },
  howItWorks: {
    intro: [
      "The docling-service runs in its own container beside the Switchboard. The service knows formats and the vault knows sources, and nothing is filed until a person confirms.",
    ],
    steps: [
      {
        title: "The file goes to the converter",
        body: "The vault's convert route passes it to the service, and its extension picks the parser. Office files, HTML and text need no models and convert at once.",
      },
      {
        title: "A PDF is read cheapest first",
        body: "Docling's own pass reads born-digital pages and plain scans. A garbled text layer falls back to pdf.js, then to Tesseract or Docling's bundled OCR, and the response names the step that produced the text.",
      },
      {
        title: "The service measures what survived",
        body: "It counts how much of the PDF's own text reached the markdown, and lists the formulas and pictures it saw but could not transcribe.",
      },
      {
        title: "You review the sections",
        body: "The vault proposes one section per heading group and folds very small ones into their neighbours. Untick what you do not need and pick the source type.",
      },
      {
        title: "Each kept section is filed",
        body: "It becomes a source in a folder named after the file, with its figures attached, queued for extraction into notes.",
      },
    ],
    note: "Converting writes nothing on its own, and only a signed-in caller can start a conversion: a long book takes minutes of compute.",
    // Rendered from integration-films/docling/scene.html, built from the
    // Knowledge Vault's own captures of the intake flow.
    video: {
      src: "/integrations/docling-sources-12s.mp4",
      poster: "/integrations/docling-sources-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film of the flow: a file is dropped on the vault's Add sources view, Docling splits Design for How People Think into 117 parts for review, a kept section becomes a typed Source record converted by docling.rs, and the files land in the vault queued for extraction.",
      caption: "A book dropped on the vault, split at its headings and filed as sources.",
    },
  },
  close: {
    title: "Put your own documents on a record like this.",
  },
  // Design for How People Think (John Whalen, 2019), as the Knowledge Vault's
  // review capture shows it: 117 parts proposed, sections ticked to keep.
  scenario: {
    source: {
      name: "Docling",
      role: "Document converter",
      logo: { src: "/logos/integrations/docling.svg", width: 1024, height: 1024, kind: "mark" },
      items: ["Design for How People Think, 117 parts", "29 formats, up to 30 MB each"],
    },
    target: {
      name: "Knowledge Vault",
      role: "Sources queued for extraction",
      items: ["One folder per file", "Original file attached to every source"],
    },
    record: {
      title: "Source",
      model: "bai/source",
      fields: [
        { name: "sourceType", value: "ARTICLE" },
        { name: "provenance.tool", value: "docling.rs" },
        { name: "status", value: "extracting" },
      ],
      approval: "Kept by a person at review",
      evidence: "PART III PUTTING THE SIX MINDS TO WORK",
    },
    flows: {
      capture: "Converted, split at its headings",
      dispatch: "Queued for extraction",
    },
    caption:
      "The scenario: Docling converts a book and splits it at its headings, the sections a person keeps become sources in Powerhouse, and the vault queues them for extraction.",
  },
  flow: "Docling → Source",
  scope: [
    { label: "Data in", value: "PDFs, scans, Office files and HTML, 29 formats in all" },
    { label: "Structure", value: "One source per section, cut at the document's own headings" },
    { label: "Access", value: "Converts and proposes. Nothing is filed until a person confirms" },
  ],
  triggers: ["A file is dropped on the vault's Intake view"],
  actions: [
    "Convert it and split it at its own headings",
    "File each section a person keeps as a source",
  ],

  oneLiner:
    "A document is converted to markdown, split along its own headings, and each section a person keeps becomes a source queued for extraction.",
  metaDescription:
    "Docling converts PDFs, scans and Office files to markdown, splits them at their own headings, and files the sections you keep as Knowledge Vault sources.",

  direction:
    "One way in. Files are converted and filed as sources; nothing is written back to the file or to the service.",

  inputs: [
    "Files dropped on the vault's Intake view: PDF, scans, Word, PowerPoint, Excel, HTML, EPUB and the rest of the 29 formats, up to 30 MB each.",
    "Anything else that can send bytes to the vault's convert route with a signed-in bearer, which reaches the same service the app does.",
  ],

  model: {
    name: "bai/source",
    fields: [
      { name: "title", type: "String", note: "The section's own heading, taken from the document." },
      { name: "content", type: "String", note: "The section's markdown, with its figures attached." },
      { name: "sourceType", type: "Enum", note: "ARTICLE, PAPER, BOOK_CHAPTER and five more, chosen per file at review." },
      { name: "provenance.method", type: "String", note: "Always converted, so a converted source is never mistaken for a hand paste." },
      { name: "provenance.tool", type: "String", note: "docling.rs, the engine that read the file." },
      { name: "status", type: "Enum", note: "Position in the lifecycle below. A published source arrives queued." },
      { name: "extractedClaims", type: "Array", note: "The notes later extracted from this source." },
    ],
    lifecycle: ["inbox", "extracting", "extracted", "archived"],
  },

  boundary: [
    "The service knows formats and the vault knows sources. Docling returns markdown and chunks and has never heard of a source; the vault decides what one is. That keeps the converter replaceable, and keeps vault rules out of a process that only reads files.",
    "Converting writes nothing. The vault cuts the document at the shallowest heading level that actually divides it, shows the proposed sections, and files only the ones a person keeps. A 400-page book becomes its parts, not the thousands of chunks the converter emits.",
    "Conversion runs in its own container, apart from the Switchboard, and only a signed-in caller can start one. A long book takes minutes of compute, so an anonymous request is refused even on a vault with authentication switched off.",
  ],

  pipeline: [
    {
      label: "Convert",
      body: "The file goes to the vault's convert route, which passes it to the service. Its extension picks the parser. Office files, HTML and text need no models and convert at once.",
    },
    {
      label: "Read a PDF, cheapest first",
      body: "Docling's own pass reads born-digital pages and plain scans. A garbled text layer falls back to pdf.js, then to Tesseract or Docling's bundled OCR, and the response names the step that produced the text.",
    },
    {
      label: "Measure what survived",
      body: "The service counts how much of the PDF's own text reached the markdown, and lists the formulas and pictures it saw but could not transcribe.",
    },
    {
      label: "Review the sections",
      body: "The vault proposes one section per heading group and folds very small ones into their neighbours. A person unticks what they do not need and picks the source type.",
    },
    {
      label: "File and queue",
      body: "Each kept section becomes a source in a folder named after the file, with its figures attached, queued for extraction into notes.",
    },
  ],

  surfaces: [
    {
      name: "Knowledge Vault app",
      role: "Drop files, read each proposed section, untick the ones to leave out, and file the rest.",
    },
    {
      name: "Switchboard",
      role: "The convert subgraph reports whether a service is configured, whether PDFs are ready, and which formats it reads.",
      href: "/architecture#switchboard",
    },
    {
      name: "Service health",
      role: "GET /health tells a broken service apart from one still waiting for its PDF models, and the vault shows both states.",
    },
  ],

  packages: [
    {
      name: "@powerhousedao/docling-service",
      role: "The conversion service, published as a container image to cr.vetra.io and GHCR rather than to npm.",
    },
    {
      name: "docling.rs",
      role: "The native conversion engine the service runs, built for glibc on x64 and arm64.",
    },
    {
      name: "pdfjs-dist",
      role: "Reads a PDF's text layer for the fallback step and for the coverage check.",
    },
    {
      name: "bai-knowledge-note",
      role: "The vault package: its convert subgraph, the Intake view and the source model.",
    },
  ],

  requirements: [
    "Docker, or Bun to run the service without a container.",
    "About 700 MB of models on a volume for PDFs and images, fetched once with npm run fetch-models. Every other format converts without them.",
    "A Knowledge Vault whose Switchboard points at the service through CONVERT_SERVICE_URL.",
    "Memory sized to the largest document rather than to traffic. A 238-page book peaked at 9.6 GB, so allow about 12 GB.",
    "A reverse proxy that allows long requests and large bodies. nginx defaults to 60 seconds and 1 MB; deploy/nginx.conf in the repository has working settings.",
  ],

  limits: [
    "One conversion runs at a time per instance, because the models are mutable sessions. A second caller is told to retry, so throughput comes from more replicas.",
    "A long document holds one HTTP connection for minutes. The service writes a keep-alive byte so proxies do not cut it, which means an error after that first byte arrives as a 200 with the real status in the body.",
    "Chunking converts the file a second time, chosen because the cheaper path paired table cells wrongly. On a 238-page book that is 155 seconds converting and 178 seconds chunking.",
    "Display formulas are located and kept as pictures rather than decoded. Decoding 79 formulas on a CPU did not finish in ten minutes.",
  ],

  sample: {
    label: "Convert a file against the service directly",
    language: "bash",
    code: `curl -s -X POST "http://localhost:5011/convert?filename=report.pdf" \\
  --data-binary @report.pdf`,
  },

  repoUrl: "https://github.com/powerhouse-inc/docling",
  shots: [
    {
      // Rendered from src/fixtures/paper.docling.json in the service repo:
      // real block positions, labels and page numbers. The fixture trims text
      // to ~60 characters, so no text or character counts are shown.
      src: "/integrations/docling-cover.png",
      alt: "Docling's layout reading of a 23-page arXiv paper: every page drawn as its text blocks, headings, tables and figures, beside the 17 headings it found with their page numbers.",
      caption:
        "Rendered from the service's own test fixture: Docling's reading of a 23-page paper, page by page, and the 17 headings it found. One of them, Lemma 5.1, is a misread, shown as Docling returned it.",
      width: 2880,
      height: 1800,
    },
  ],
};

/**
 * Speckle. Evidenced by powerhouse-inc/speckle-package at 1.0.1: README,
 * docs/SETUP.md, both v1 schemas, processors/speckle-sync-runner and the
 * speckle-hotspots subgraph. 1.0.1 is on registry.vetra.io. The Vetra Cloud
 * "3D Models" add-on that installs it is vetra-cloud-package#92 and
 * powerhouse-k8s-hosting#216, both merged 2026-09-26. Screenshots are the
 * repository's own, from docs/images.
 */
const SPECKLE: IntegrationEntry = {
  slug: "speckle",
  name: "Speckle",
  category: "Building models",
  status: "Available",
  industry: "Construction",
  steps: [
    "A person runs a sync from the Sync Console",
    "Each model and revision is mirrored",
    "Volume, area and length are totalled per category",
    "Changes between revisions are recorded; nothing is written back",
  ],
  recipe: [
    { kind: "system", label: "Speckle" },
    { kind: "connector", label: "Sync runner" },
    { kind: "model", label: "Speckle Project" },
    { kind: "app", label: "Model Explorer" },
  ],
  vetra: { url: "https://vetra.io/packages/speckle-package" },
  // Speckle's own wordmark, from speckle.systems/assets/images/logo-full.svg.
  logo: {
    src: "/logos/integrations/speckle.svg",
    width: 100,
    height: 24,
  },
  summary:
    "Each revision of a Speckle building model becomes a record of its quantities and of what changed, while the 3D model itself stays in Speckle.",
  site: { url: "https://speckle.systems", label: "speckle.systems" },
  claim: "Speckle model revisions, measured and compared element by element",
  layout: "simple",
  hero: {
    subtitle:
      "A person runs a sync, and each revision of a Speckle building model becomes a Powerhouse record of its quantities and of what changed. The geometry stays in Speckle, and nothing is written back.",
  },
  howItWorks: {
    intro: [
      "The sync runner in speckle-package reads Speckle on request and writes what it finds onto a Speckle Project record. It runs on the Switchboard with a service credential and never writes back to Speckle.",
    ],
    steps: [
      {
        title: "Name the Speckle project",
        body: "In the Sync Console, name the Speckle server and project, check that both resolve, and pick the record to mirror into.",
      },
      {
        title: "Run a sync",
        body: "Run sync records a request on the sync document. The sync runner on the Switchboard reacts to that request, not to a timer.",
      },
      {
        title: "The runner reads the new versions",
        body: "It walks each model's recent versions and the objects in them, up to the caps set in the console. Versions it has already pulled are skipped.",
      },
      {
        title: "Each revision is totalled and compared",
        body: "Each revision gets its volume, area and length per category, and each pair of revisions gets the elements added, modified and removed.",
      },
      {
        title: "The results land on the record",
        body: "They arrive on the Speckle Project record as operations. Writing the same revision again changes nothing, so a repeated sync is safe.",
      },
    ],
    note: "The demo project is Nordkai Bridge on a local Speckle server. A sync runs when someone asks for one: auto-sync needs a webhook from Speckle that the package does not ship yet.",
    // Rendered from integration-films/speckle/scene.html, built from the
    // record's own captures of the Nordkai Bridge project.
    video: {
      src: "/integrations/speckle-revision-12s.mp4",
      poster: "/integrations/speckle-revision-12s-poster.jpg",
      width: 1920,
      height: 1080,
      label:
        "A twelve-second film of the flow: the four revisions of the Nordkai Bridge model in Speckle are read, the latest becomes a Speckle Project record with its volume, area and change counts, the Model Explorer paints the changed elements, and the churn view shows which categories kept moving.",
      caption: "Nordkai Bridge, from four revisions in Speckle to what each one changed.",
    },
  },
  close: {
    title: "Put your own models on a record like this.",
  },
  // Nordkai Bridge (be4c927cce), as the record's Model Explorer captures show it.
  scenario: {
    source: {
      name: "Speckle",
      role: "Building model platform",
      logo: { src: "/logos/integrations/speckle.svg", width: 100, height: 24, kind: "wordmark" },
      items: ["Nordkai Bridge, 4 revisions", "Revit models, synced on request"],
    },
    target: {
      name: "Model Explorer",
      role: "The model with its changes painted in",
      items: ["Modified amber, removed red", "A timeline of every revision"],
    },
    record: {
      title: "Speckle Project",
      model: "speckle/project",
      fields: [
        { name: "revision", value: "69b4e8994f" },
        { name: "objects", value: "38" },
        { name: "volume", value: "543.76 m\u00b3" },
        { name: "changed", value: "+0 ~12 \u22125" },
      ],
      approval: "Synced on request",
      evidence: "Volume \u221234 m\u00b3, area \u221262 m\u00b2",
    },
    flows: {
      capture: "Read on request",
      dispatch: "Painted onto the model",
    },
    caption:
      "The demo scenario: Nordkai Bridge's revisions in Speckle become a Speckle Project record in Powerhouse, and the Model Explorer paints what each revision changed.",
  },
  flow: "Speckle → Speckle Project",
  scope: [
    { label: "Data in", value: "Models, revisions and element quantities" },
    { label: "Structure", value: "Per-category totals and a change entry per revision" },
    { label: "Access", value: "Reads Speckle. Nothing is written back" },
  ],
  triggers: ["A person runs a sync from the Sync Console"],
  actions: [
    "Mirror each model and revision",
    "Total volume, area and length per category",
    "Record what changed between revisions",
  ],

  oneLiner:
    "A building model's revisions become a record of its quantities and of what changed, element by element, while the geometry stays in Speckle.",
  metaDescription:
    "Speckle revisions become Powerhouse records: volume, area and length per category, and every element added, modified or removed between versions.",

  primer: {
    label: "What is Speckle?",
    body: "Speckle is an open-source data platform for building and construction models. Design tools such as Revit and Rhino, and IFC files, publish into it, and each publish is a new version of the model. Speckle stores the geometry and draws it in the browser.",
  },

  direction:
    "Speckle to Powerhouse, one way. The geometry stays in Speckle and is drawn from there.",

  inputs: [
    "A Speckle project on your own server or a hosted one, named by server address and project id in the Sync Console.",
    "Models from Speckle's connectors and from IFC imports. Both ways of recording quantities are read, so an IFC building is totalled as well as a native model.",
  ],

  model: {
    name: "speckle/project",
    fields: [
      { name: "serverUrl", type: "URL", note: "The Speckle server the project lives on." },
      { name: "projectId", type: "String", note: "The Speckle project this record mirrors." },
      { name: "models", type: "Array", note: "Each model in the project, with its latest version and version count." },
      { name: "revisions", type: "Array", note: "One per version: its message, author, source tool and object count." },
      { name: "revisions.categories", type: "Array", note: "Volume, area, length and count per category, for that revision." },
      { name: "revisions.truncated", type: "Boolean", note: "Set when a revision hit the object cap, so a partial total is never shown as complete." },
      { name: "changes", type: "Array", note: "One per pair of revisions: counts added, modified and removed, and the category deltas." },
      { name: "changes.touchedElements", type: "Array", note: "Each element touched, keyed on the design tool's own id so it can be followed across edits." },
    ],
    lifecycle: ["SET_PROJECT_IDENTITY", "UPSERT_MODEL", "UPSERT_REVISION", "RECORD_CHANGE"],
  },

  boundary: [
    "The geometry never leaves Speckle. Speckle already stores the model and draws it well, so the record holds only what Speckle does not keep: what each revision meant for the numbers, and when it happened.",
    "A change is keyed on the element's id in the design tool, not on Speckle's object id, which is a hash of the content. An edited wall therefore reads as one modification rather than a deletion and an addition, and its history follows it across revisions.",
    "Rooms, storeys and display meshes are kept out of the totals. They carry quantities of their own, and adding the air in a room to the concrete in its walls gives a number that means nothing.",
    "The sync runs with a service credential held on the Switchboard. A collaborator's own Speckle token stays private to them, is never shared with others on the drive, and is used only for checks in their editor.",
  ],

  pipeline: [
    {
      label: "Connect",
      body: "In the Sync Console, name the Speckle server and project, check that both resolve, and pick the record to mirror into.",
    },
    {
      label: "Request a sync",
      body: "Run sync records a request on the sync document. The sync runner on the Switchboard reacts to that request, not to a timer.",
    },
    {
      label: "Read Speckle",
      body: "The runner walks each model's recent versions and the objects in them, up to the caps set in the console. Versions it has already pulled are skipped.",
    },
    {
      label: "Total and compare",
      body: "Each revision gets its totals per category, and each pair of revisions gets the elements added, modified and removed.",
    },
    {
      label: "Write the record",
      body: "The results land on the Speckle Project record as operations. Writing the same revision again changes nothing, so a repeated sync is safe.",
    },
  ],

  surfaces: [
    {
      name: "Model Explorer",
      role: "The 3D model with its changes painted in, a revision timeline, quantities with deltas, and trends across the history.",
    },
    {
      name: "Sync Console",
      role: "The connection, a live check against Speckle, the caps, the run button and every run with its outcome.",
    },
    {
      name: "Speckle Workspace",
      role: "Every mirrored project on the drive, drive-wide totals, and one feed of every model change.",
    },
    {
      name: "Switchboard",
      role: "Runs the sync, serves the records and the analytics over GraphQL, and ranks the elements that change most often.",
      href: "/architecture#switchboard",
    },
  ],

  packages: [
    {
      name: "speckle-package",
      role: "Both document models, the sync runner, the analytics, the editors and the drive app, in one package on the Vetra registry.",
    },
    {
      name: "@speckle/viewer",
      role: "Draws the model inside the Model Explorer, so each element can be painted by what happened to it.",
    },
  ],

  requirements: [
    "A Switchboard with speckle-package installed. On Vetra Cloud, the 3D Models add-on installs it for the environment.",
    "A Speckle server: your own, or a hosted one such as app.speckle.systems. Speckle ships only as container images, so a local server needs Docker.",
    "A Speckle access token on the Switchboard for private projects. Without one, only public projects sync.",
    "For the full local demo: Docker with Compose v2, Node 24 or newer, and about 6 GB of disk.",
  ],

  limits: [
    "A sync starts when someone asks for one. The console has an auto-sync switch, but it needs a webhook from Speckle into the Switchboard, which the package does not ship yet.",
    "Each sync reads a capped number of versions per model and objects per version. A revision that hits the cap is marked partial rather than shown as complete.",
    "Removed elements are fetched one at a time to show them, so that view is capped and says when it has truncated.",
    "A collaborator's token is kept in the document's private local scope, which suits a trusted internal drive. A production deployment should move it to sign-in with Speckle or a dedicated secret store.",
  ],

  sample: {
    label: "Ask Switchboard for the elements that change most",
    language: "graphql",
    code: `{
  speckleHotspots {
    hotspots(projectDocumentId: "<mirror-id>", minTouches: 2, limit: 10) {
      identity
      speckleType
      touches
      added
      modified
      removed
      lastDetectedAt
    }
  }
}`,
  },

  repoUrl: "https://github.com/powerhouse-inc/speckle-package",
  shots: [
    {
      src: "/integrations/speckle/model-explorer.png",
      alt: "The Model Explorer: a list of mirrored revisions, the building model with its changed elements coloured, and the revision timeline below.",
      caption:
        "The Model Explorer. Added elements are green, modified amber and removed red, and the timeline steps through every mirrored revision.",
      width: 1420,
      height: 940,
    },
    {
      src: "/integrations/speckle/drive-app.png",
      alt: "The Speckle Workspace drive app: every mirrored project as a card with its Speckle preview, and portfolio totals across projects.",
      caption:
        "The drive app: every mirrored project on the drive, with totals across all of them.",
      width: 1420,
      height: 900,
    },
    {
      src: "/integrations/speckle/element-panel.png",
      alt: "An element selected in the Model Explorer, with its properties and the list of revisions that touched it.",
      caption:
        "Selecting an element shows what the design tool recorded about it, and every revision that touched it.",
      width: 893,
      height: 502,
    },
    {
      src: "/integrations/speckle/analytics-over-time.png",
      alt: "Charts of quantities and revisions over calendar time, with a hover readout.",
      caption:
        "Quantities and revisions over calendar time, read from the records rather than recomputed in the browser.",
      width: 1390,
      height: 602,
    },
    {
      src: "/integrations/speckle/churn-and-hotspots.png",
      alt: "A heatmap of changes by category and period, beside a ranked list of the elements changed most often.",
      caption:
        "Where the model keeps changing: churn by category and period, and the elements touched most often.",
      width: 1390,
      height: 519,
    },
  ],
};

export const INTEGRATIONS: readonly IntegrationEntry[] = [
  PAPERLESS,
  UMH,
  ACTIVEPIECES,
  ARS_CONTEXTA,
  DOCLING,
  SPECKLE,
] as const;

/**
 * What an index case study needs. Narrower than a record, so an integration
 * that is still being prepared can be listed before its detail page exists.
 */
export type IntegrationCard = {
  slug: string;
  name: string;
  status: IntegrationStatus;
  industry: string;
  logo?: IntegrationEntry["logo"];
  oneLiner: string;
  steps: readonly string[];
  recipe: readonly RecipePart[];
  shot?: IntegrationShot;
  /** Where the card leads: the detail page, or the vendor while there is none. */
  href: string;
  linkLabel: string;
  walkthroughSlug?: string;
  vetra?: VetraLink;
};

function toCard(entry: IntegrationEntry): IntegrationCard {
  const { industry, steps, recipe } = entry;
  if (!industry || !steps || !recipe) {
    throw new Error(`Integration "${entry.slug}" is listed without industry, steps or recipe`);
  }
  return {
    slug: entry.slug,
    name: entry.name,
    status: entry.status,
    industry,
    logo: entry.logo,
    oneLiner: entry.oneLiner,
    steps,
    recipe,
    // The frame is 16/10, so the first shot must be one that fits it.
    shot: entry.shots?.[0],
    href: `/integrations/${entry.slug}`,
    linkLabel: `Open the ${entry.name} record`,
    walkthroughSlug: entry.walkthroughSlug,
    vetra: entry.vetra,
  };
}

/**
 * Distyra, in preparation. Only the card exists: it has no record, and so no
 * detail page, until the integration is built. The steps describe Distyra's
 * own Connect and Enrichment products (distyra.eu) and the record they will
 * feed; confirm the model name when the integration lands.
 */
const DISTYRA: IntegrationCard = {
  slug: "distyra",
  name: "Distyra",
  status: "In development",
  industry: "Financial",
  // Distyra's own mark, from distyra.eu/assets/brand/distyra-mark.svg.
  logo: {
    src: "/logos/integrations/distyra-mark.svg",
    width: 280,
    height: 210,
    kind: "mark",
  },
  oneLiner:
    "European bank statements and PSD2 streams become typed transaction records, with each counterparty recognised the way European formats write it.",
  steps: [
    "Distyra Connect reads a bank statement or a PSD2 stream",
    "Distyra Enrichment names the counterparty and categorises each transaction",
    "Each transaction is filed as a typed record for review",
  ],
  recipe: [
    { kind: "system", label: "Distyra" },
    { kind: "model", label: "Bank transaction" },
    { kind: "app", label: "Connect" },
  ],
  href: "https://www.distyra.eu",
  linkLabel: "Visit Distyra",
};

/**
 * The case studies on the integrations index, in page order. Activepieces is
 * the catalogue the others are built in, so the index shows it in the hero
 * rather than as one integration among several. Ars Contexta is a
 * methodology, not a connector, and is reached from its own record.
 */
export const LISTED_INTEGRATIONS: readonly IntegrationCard[] = [
  toCard(PAPERLESS),
  toCard(UMH),
  toCard(DOCLING),
  toCard(SPECKLE),
  DISTYRA,
];

/** The catalogue record the index links to from its catalogue band. */
export const CATALOGUE = ACTIVEPIECES;

/** Detail pages and sitemap both read this order. */
export const INTEGRATION_ORDER: readonly string[] = INTEGRATIONS.map(
  (entry) => entry.slug,
);

export function getIntegration(slug: string): IntegrationEntry | undefined {
  return INTEGRATIONS.find((entry) => entry.slug === slug);
}

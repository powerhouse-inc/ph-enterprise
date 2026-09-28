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

  claim: "Invoices, structured on arrival.",
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
 * gate come from), and .env.example. No walkthrough post exists yet, so
 * `walkthroughSlug` stays unset.
 */
const UMH: IntegrationEntry = {
  slug: "umh",
  name: "United Manufacturing Hub",
  category: "Manufacturing operations",
  status: "Available",
  logo: {
    src: "/logos/integrations/umh.svg",
    width: 48,
    height: 48,
    kind: "mark",
  },
  summary:
    "Purchase-order PDFs become Production Ledgers that a person approves, then the factory floor reports back against the commitment until the run closes out.",
  claim: "Commitments, measured against the floor.",
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
    "A purchase order becomes a commitment a person approves, and the factory floor reports back against it until the run closes out.",
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
      { name: "line", type: "Enum", note: "Production line instance, resolved against the live floor." },
      { name: "partNumber", type: "Enum", note: "Part or recipe code, resolved against that line." },
      { name: "committedQuantity", type: "Number", note: "The ordered quantity." },
      { name: "committedQualityPct", type: "Number", note: "First-pass yield floor from the quality clause." },
      { name: "yieldComparison", type: "Enum", note: "AT_OR_ABOVE, or STRICTLY_ABOVE when the clause says above." },
      { name: "committedOeeFloorPct", type: "Number", note: "Minimum line OEE from the capacity clause." },
      { name: "oeeMeasurementBasis", type: "Enum", note: "BUYER_MEASURED, SUPPLIER_REPORTED, or NOT_MEASURED." },
      { name: "scrapLiabilityPerUnit", type: "Number", note: "Liability rate per rejected unit." },
      { name: "latePenaltyPerHour", type: "Number", note: "Penalty rate per hour of late delivery." },
      { name: "requestedDeliveryAt", type: "DateTime", note: "Requested delivery, as a UTC timestamp." },
      { name: "orderId", type: "String", note: "The id the floor minted, bound once and never rewritten." },
      { name: "requiredAcknowledgements", type: "Array", note: "CONTROLLING, PRODUCTION, or both." },
    ],
    lifecycle: [
      "SET_COMMITMENT",
      "APPROVE_ORDER",
      "BIND_ORDER_ID",
      "OPEN_LEDGER",
      "START_RUN",
      "RECORD_ACTUALS_SNAPSHOT",
      "CLOSE_OUT",
      "ACKNOWLEDGE",
    ],
    // Boxes are measured on the crop, 654 x 646.
    anatomy: {
      src: "/integrations/umh-ledger-commitment.png",
      alt: "The Commitment card of a closed-out production ledger in Connect: manufacturer, customer, order id, line, part, quantities, quality and OEE floors, requested delivery, and the agreement terms below.",
      width: 654,
      height: 646,
      spots: [
        { field: "manufacturer", x: 14, y: 64, w: 312, h: 60 },
        { field: "customer", x: 327, y: 64, w: 312, h: 60 },
        { field: "orderId", x: 14, y: 134, w: 312, h: 60 },
        { field: "line", x: 327, y: 134, w: 312, h: 60 },
        { field: "partNumber", x: 14, y: 204, w: 312, h: 60 },
        { field: "committedQuantity", x: 327, y: 274, w: 312, h: 60 },
        { field: "committedQualityPct", x: 14, y: 344, w: 312, h: 60 },
        { field: "committedOeeFloorPct", x: 327, y: 344, w: 312, h: 60 },
        { field: "requestedDeliveryAt", x: 14, y: 414, w: 312, h: 60 },
        { field: "agreementRef", x: 14, y: 500, w: 200, h: 42 },
        { field: "scrapLiabilityPerUnit", x: 226, y: 500, w: 200, h: 42 },
        { field: "latePenaltyPerHour", x: 437, y: 500, w: 200, h: 42 },
        { field: "oeeMeasurementBasis", x: 14, y: 588, w: 200, h: 42 },
        { field: "yieldComparison", x: 226, y: 588, w: 200, h: 42 },
        { field: "requiredAcknowledgements", x: 437, y: 588, w: 200, h: 42 },
      ],
    },
  },

  boundary: [
    "Three workflows do the work a custom processor used to, and each write step carries its own allow-list. The step that applies an extracted commitment may dispatch SET_COMMITMENT and nothing else, so the rule holds even when a model wrote the actions.",
    "Nothing in the workflows approves, opens, starts or signs a ledger. A person does that in the editor, and their approval is the event the next workflow reacts to.",
    "The line and part never come from the model's answer. Its reply is a search key against the floor's own list of lines and recipes, so an invented line matches nothing and the write is skipped. What reaches the ledger came from the floor.",
  ],

  pipeline: [
    // Drafting and line resolution are shown block by block on the workflow
    // capture, so the list starts where that capture ends.
    {
      label: "Create the floor order on approval",
      body: "Seven blocks, triggered by the reviewer's APPROVE_ORDER. It asserts there is a line to run on, creates the order, then binds the returned id and opens the ledger. Both failure paths write the reason onto the document instead of failing silently.",
    },
    {
      label: "Append floor progress to the evidence trail",
      body: "Four blocks on a polling trigger. It skips readings that counted nothing, finds the ledger bound to the order, checks the ledger is open, and appends one snapshot.",
    },
    {
      label: "Close out",
      body: "Still a human action in the editor. The verdict, conformance dimensions and costs come from a calculation the workflow cannot call.",
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
      name: "@activepieces/piece-open-router",
      role: "The extraction step, from the Activepieces catalogue.",
    },
  ],

  requirements: [
    "Docker, for the factory simulator and the Paperless archive.",
    "Bun, to run the reactor, the seed and the verification script.",
    "An OpenRouter key for extraction. Without one everything else still runs and the extraction step fails with a 401.",
    "Free host ports 18000 and 18081. The demo deliberately avoids the canonical 8000 and 8081 so it cannot talk to another factory by accident.",
  ],


  repoUrl:
    "https://github.com/powerhouse-inc/umh-production-ledger/tree/demo/umh-workflow-stack/demo",
  video: {
    // Keyframe every 5 frames so scroll-scrubbing seeks cheaply.
    src: "/integrations/umh-ledger-scrub.mp4",
    // The intake frame, so the film at rest matches the rail's first chapter.
    poster: "/integrations/umh-ledger-poster-intake.jpg",
    width: 1280,
    height: 720,
    label:
      "A fifteen-second walkthrough: a purchase order is extracted into a typed production ledger, three workflows move it through human approval to the factory floor, the floor reports good parts and scrap, and the ledger is checked against the contract and put on hold.",
    caption:
      "Fifteen seconds, end to end: a purchase order becomes a ledger, the floor reports against it, and the contract decides ship or hold. Figures are from the demo run.",
    // Scene starts and titles match umh-video/scene.html.
    chapters: [
      {
        start: 0,
        title: "01 · Intake",
        body: "A purchase order arrives in Paperless, and a workflow extracts its commitment.",
      },
      {
        start: 2.85,
        title: "02 · Document model",
        body: "It becomes a typed production ledger through SET_COMMITMENT, an operation the workflow is allow-listed to dispatch.",
      },
      {
        start: 5.6,
        title: "03 · Workflows",
        body: "Three workflows built from pieces, and editable in Connect, carry the order through human approval to the factory floor.",
      },
      {
        start: 8.7,
        title: "04 · Evidence",
        body: "The UMH floor reports good parts and scrap, and each reading is appended to the ledger as a snapshot.",
      },
      {
        start: 12.2,
        title: "05 · Verdict",
        body: "In the demo run, 320 good and 6 scrap is 98.2% against a contracted 98.5%, so the ledger is marked non-conforming and held.",
      },
    ],
  },
  walkthroughSlug: "united-manufacturing-hub-powered-by-powerhouse",
  shots: [
    {
      src: "/integrations/umh-workflow-canvas.png",
      alt: "The Workflow Studio canvas for the workflow that drafts a ledger from a purchase order: a Paperless trigger, a purchase-order branch, then twelve blocks down to applying the resolved line and part.",
      caption:
        "The integration, as a workflow: twelve blocks from a new document in Paperless to a draft ledger with its line and part resolved.",
      width: 1680,
      height: 2794,
      stages: [
        {
          heading: "Trigger and guard",
          body: "Paperless fires on a new document, and a branch stops anything that is not a purchase order.",
          steps: [
            { label: "New document", piece: "Paperless-ngx" },
            { label: "Is it a purchase order?", piece: "Branch" },
          ],
        },
        {
          heading: "Draft the ledger",
          body: "The extractor reads the ledger's own schema at run time. The apply step may dispatch SET_COMMITMENT and nothing else.",
          steps: [
            { label: "Read the ledger's own schema", piece: "Reactor" },
            { label: "Extract the commitment", piece: "OpenRouter" },
            { label: "Create the draft ledger", piece: "Reactor" },
            { label: "Apply the extracted commitment", piece: "Reactor" },
            { label: "Fetch the original scan", piece: "Paperless-ngx" },
            { label: "Attach the scan to the ledger", piece: "Reactor" },
          ],
        },
        {
          heading: "Resolve the line and part",
          body: "The model's answer is only a search key. It is resolved against the floor's own catalogue, so an invented line matches nothing.",
          steps: [
            { label: "List the floor's lines", piece: "UMH" },
            { label: "Ask which line and part", piece: "OpenRouter" },
            { label: "Resolve it against the floor", piece: "JSON query" },
            { label: "Did it resolve to a real line?", piece: "Branch" },
          ],
        },
        {
          heading: "Apply, or leave it for review",
          body: "Only a resolved line and part are written. Anything else leaves the reviewer's blocker in place.",
          steps: [{ label: "Apply the line and part", piece: "Reactor" }],
        },
      ],
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
  claim: "Integrations, built as workflows.",
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
  claim: "Claims, typed and queryable.",
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
  // The project's own mark, from docling.ai/img/logo.svg.
  logo: {
    src: "/logos/integrations/docling.svg",
    width: 1024,
    height: 1024,
    kind: "mark",
  },
  summary:
    "PDFs, scans and Office files become markdown split at their own headings, and each section a person keeps is filed as a Knowledge Vault source.",
  claim: "Whole documents, split where the author split them.",
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
  // Speckle's own wordmark, from speckle.systems/assets/images/logo-full.svg.
  logo: {
    src: "/logos/integrations/speckle.svg",
    width: 100,
    height: 24,
  },
  summary:
    "Each revision of a Speckle building model becomes a record of its quantities and of what changed, while the 3D model itself stays in Speckle.",
  claim: "Every revision, measured and compared.",
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
 * The records listed on the integrations index. Activepieces is the catalogue
 * the others are built in, so the index shows it as its own band rather than
 * as one integration among several. Ars Contexta is a methodology, not a
 * system you connect. Both keep their detail pages.
 */
export const LISTED_INTEGRATIONS: readonly IntegrationEntry[] = [
  PAPERLESS,
  UMH,
  DOCLING,
  SPECKLE,
] as const;

/** The catalogue record the index links to from its catalogue band. */
export const CATALOGUE = ACTIVEPIECES;

/** Detail pages and sitemap both read this order. */
export const INTEGRATION_ORDER: readonly string[] = INTEGRATIONS.map(
  (entry) => entry.slug,
);

export function getIntegration(slug: string): IntegrationEntry | undefined {
  return INTEGRATIONS.find((entry) => entry.slug === slug);
}

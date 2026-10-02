/**
 * Blog content lives here as typed blocks rather than MDX: the site has no
 * markdown pipeline, and blocks keep the renderer (components/blog) in charge
 * of type, spacing, and code framing instead of a stylesheet full of
 * `prose-*` overrides.
 *
 * Media blocks carry `src: null` while the asset is still being produced. The
 * renderer skips those, so an unfinished slot stays visible here (with its
 * intended path and caption) without shipping a placeholder to the page.
 */

/** A run of body text. Objects add a link or inline code to the run. */
export type BlogInline =
  | string
  | { text: string; href: string }
  | { code: string };

export type BlogBlock =
  | { type: "heading"; text: string; id?: string }
  | { type: "paragraph"; spans: readonly BlogInline[] }
  | { type: "list"; items: readonly (readonly BlogInline[])[] }
  | { type: "code"; language: string; label?: string; code: string }
  /**
   * A comparison table. The first cell of each row is its row header; on
   * mobile each row stacks, with the column headers repeated as labels.
   */
  | {
      type: "table";
      caption?: string;
      columns: readonly string[];
      rows: readonly (readonly (readonly BlogInline[])[])[];
    }
  | {
      type: "media";
      kind: "image" | "video";
      /** null until the asset exists; the block is skipped while it is null. */
      src: string | null;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
      /** Video only: a real frame shown before the reader presses play. */
      poster?: string;
      /** Image only: CSS width cap, for a UI crop shown near its real size. */
      displayWidth?: number;
    }
  | { type: "note"; spans: readonly BlogInline[] }
  /**
   * Opening primer: a quiet labelled block that defines the subject for
   * readers who have not met it, set in smaller type than the body.
   */
  | { type: "primer"; label: string; spans: readonly BlogInline[] }
  | {
      type: "resources";
      title: string;
      /** Sits inline between paragraphs rather than closing the post. */
      compact?: boolean;
      items: readonly { label: string; href: string; note: string }[];
    };

export type BlogPost = {
  slug: string;
  title: string;
  /**
   * Deck under the H1, also the summary on the index card. One entry per
   * paragraph, so the lede reads as short blocks rather than one dense run.
   */
  summary: readonly string[];
  /** Search-result copy. Keep near 155 characters. */
  metaDescription: string;
  /** ISO date, used for display and for the article JSON-LD. */
  date: string;
  author: string;
  category: string;
  readingMinutes: number;
  body: readonly BlogBlock[];
};

const PAPERLESS_BILLING_REPO =
  "https://github.com/powerhouse-inc/paperless-billing";

const PAPERLESS_POST: BlogPost = {
  slug: "paperless-ngx-pdf-to-structured-data",
  title: "Paperless-ngx - Automated PDF processing with Powerhouse",
  summary: [
    "This blog will show you how you can convert unstructured PDFs into structured, queryable data, thus eliminating tedious manual entry and accelerating accounting and operational workflows.",
    "We will use Paperless-ngx, which is good at turning incoming files into an organized document archive, saving finance and operations teams from manual data entry.",
    "And Powerhouse, which makes structured documents available through interfaces, APIs and AI tools.",
    "We combined them and followed one invoice through a workflow to see the result.",
  ],
  metaDescription:
    "Convert unstructured PDFs into structured, queryable data with Paperless-ngx and Powerhouse. A local Docker example that follows one invoice end to end.",
  date: "2026-09-02",
  author: "Powerhouse",
  category: "Integrations",
  readingMinutes: 7,
  body: [
    {
      type: "primer",
      label: "What is Paperless-ngx?",
      spans: [
        { text: "Paperless-ngx", href: "https://docs.paperless-ngx.com" },
        " is an open-source document manager that you host yourself. Send it a PDF by scan, email, or upload. It runs OCR on the text, assigns a document type and tags, and keeps the file searchable in one archive. The documents stay on infrastructure you control.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The demo runs locally from a small Docker-based repository. A configured language model extracts the invoice fields, so you provide your own API key. The example uses ",
        { text: "OpenRouter", href: "https://openrouter.ai" },
        " by default, and other providers can be configured.",
      ],
    },
    {
      type: "resources",
      title: "Explore and clone the repo",
      compact: true,
      items: [
        {
          label: "powerhouse-inc/paperless-billing",
          href: PAPERLESS_BILLING_REPO,
          note: "Everything this walkthrough runs on: the Docker Compose stack, the bootstrap script and the start commands.",
        },
      ],
    },

    { type: "heading", text: "Starting with Paperless" },
    {
      type: "paragraph",
      spans: [
        "The Docker Compose file begins with a deliberately slim ",
        { text: "Paperless-ngx", href: "https://docs.paperless-ngx.com" },
        " setup. It runs the Paperless application with Redis as its task broker. Application data goes to SQLite, stored in Paperless's data volume.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "This example accepts PDFs only. Paperless can use Tika and Gotenberg to ingest Office documents and ",
        { code: ".eml" },
        " files, but those services stay disabled here to keep the setup lightweight.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "We added Powerhouse Switchboard, Powerhouse Connect and a bootstrap service. The bootstrap creates the Billing drive, connects it to Paperless and registers the synchronization workflow.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "To run the example, check out the repository and copy its environment template:",
      ],
    },
    {
      type: "code",
      language: "bash",
      code: `git clone https://github.com/powerhouse-inc/paperless-billing.git
cd paperless-billing
cp .env.example .env`,
    },
    {
      type: "paragraph",
      spans: [
        "The template already points at ",
        { text: "OpenRouter", href: "https://openrouter.ai" },
        ", so an OpenRouter API key is the only value you have to supply. Paste it into ",
        { code: ".env" },
        ":",
      ],
    },
    {
      type: "code",
      language: "bash",
      label: ".env",
      code: `PAPERLESS_AI_BASE_URL=https://openrouter.ai/api/v1
PAPERLESS_AI_MODEL=google/gemini-2.5-flash
PAPERLESS_AI_API_KEY=your_openrouter_key_here`,
    },
    {
      type: "paragraph",
      spans: [
        "Those first two lines are already filled in for you, so the key is the only edit you need to make. Any OpenAI-compatible endpoint works if you point ",
        { code: "PAPERLESS_AI_BASE_URL" },
        " elsewhere and set a matching ",
        { code: "PAPERLESS_AI_MODEL" },
        ". Leave the base URL empty to call the Anthropic API directly, in which case the key is an Anthropic one.",
      ],
    },
    {
      type: "note",
      spans: [
        "Extraction quality is the model's, not the pipeline's. The default above, ",
        { code: "google/gemini-2.5-flash" },
        ", produced the screenshots below and read every field of this invoice set correctly. Smaller models are noticeably less reliable at the arithmetic on a line-item table, so if totals come out wrong, change the model before suspecting the integration.",
      ],
    },
    { type: "paragraph", spans: ["Then start the stack:"] },
    { type: "code", language: "bash", code: "./start.sh" },
    {
      type: "paragraph",
      spans: [
        "The script starts the Docker services, waits for them to become ready, configures the integration and opens both interfaces:",
      ],
    },
    {
      type: "list",
      items: [
        [
          "Paperless at ",
          { code: "localhost:8000" },
          ", using ",
          { code: "admin / paperless" },
          " as the demo credentials.",
        ],
        ["Connect at ", { code: "localhost:3000" }, "."],
        [
          "Switchboard's GraphQL API at ",
          { code: "localhost:4001/graphql" },
          ".",
        ],
      ],
    },
    {
      type: "note",
      spans: [
        "The reactor installs two packages from the Vetra registry: ",
        { code: "@powerhousedao/paperless-sync" },
        " for the integration and ",
        { code: "@powerhousedao/billing" },
        " for the invoice document model and its drive app. The image tag and both package versions form one compatibility set, so move them together.",
      ],
    },

    { type: "heading", text: "One invoice across multiple interfaces" },
    {
      type: "paragraph",
      spans: [
        "After startup, Paperless contains no invoices. Connect opens the newly created Billing drive, which holds the configuration that connects it to Paperless.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Upload a PDF invoice through Paperless. The bootstrap configuration creates an Invoice document type that matches documents containing the word “invoice”. A Paperless workflow then pushes the new document into the Powerhouse integration.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/drop-into-paperless.png",
      width: 1440,
      height: 810,
      alt: "A PDF named PT-2026-2041.pdf dragged over the Paperless document list, which has dimmed to show its \u201cDrop files to begin upload\u201d overlay.",
      caption:
        "Step 1. PT-2026-2041.pdf is dropped onto the Paperless document list at localhost:8000.",
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/invoice-in-paperless.png",
      width: 1440,
      height: 810,
      alt: "The archived document open in Paperless: a details form titled PT-2026-2041 with document type Invoice, beside a preview of the original scan showing three line items and a total due of \u20ac13,500.00.",
      caption:
        "Step 2. Paperless archives it as PT-2026-2041 and classifies it as an Invoice. The scan itself is still a scan: three line items, \u20ac13,500.00 due.",
    },
    {
      type: "paragraph",
      spans: ["Shortly afterwards, a corresponding invoice appears in Connect."],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/invoice-in-connect.png",
      width: 1440,
      height: 944,
      alt: "The same invoice open in Powerhouse Connect, under a September 2026 month in the Billing drive: issuer, payer, issue and due dates, currency, and the same three line items with a total of 13,500.00 EUR.",
      caption:
        "Step 3. The same invoice in Connect, filed under September 2026: issuer, payer, dates, currency and the same three line items, now fields rather than pixels.",
    },
    {
      type: "paragraph",
      spans: [
        "The invoice is no longer only a PDF. Its issuer, invoice number, issue and due dates, currency, status, totals and line items are represented in a Powerhouse invoice document managed by Switchboard.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The same data is available programmatically through Switchboard's GraphQL API:",
      ],
    },
    {
      type: "code",
      language: "graphql",
      code: `{
  Invoice {
    documents {
      totalCount
      items {
        name
        state {
          global {
            invoiceNo
            currency
            dateIssued
            dateDue
            status
            issuer { name country }
            totalPriceTaxExcl
            totalPriceTaxIncl
            lineItems {
              description
              quantity
              unitPriceTaxExcl
              taxPercent
              totalPriceTaxIncl
            }
          }
        }
      }
    }
  }
}`,
    },
    { type: "paragraph", spans: ["Or over HTTP, asking for fewer fields:"] },
    {
      type: "code",
      language: "bash",
      code: `curl -s http://localhost:4001/graphql \\
  -H 'content-type: application/json' \\
  -d '{"query":"{ Invoice { documents { totalCount items { name state { global { invoiceNo currency totalPriceTaxIncl issuer { name } } } } } } }"}'`,
    },
    {
      type: "paragraph",
      spans: [
        "The full query returns the structured invoice. The response below is truncated to a single item:",
      ],
    },
    {
      type: "code",
      language: "json",
      label: "Response, truncated to one of 26 invoices",
      code: `{
  "data": {
    "Invoice": {
      "documents": {
        "totalCount": 26,
        "items": [
          {
            "name": "PT-2026-2041",
            "state": {
              "global": {
                "invoiceNo": "PT-2026-2041",
                "currency": "EUR",
                "dateIssued": "2026-09-01T00:00:00.000Z",
                "dateDue": "2026-10-01T00:00:00.000Z",
                "status": "ISSUED",
                "issuer": {
                  "name": "Lumen Type Foundry",
                  "country": "Portugal"
                },
                "totalPriceTaxExcl": 11250,
                "totalPriceTaxIncl": 13500,
                "lineItems": [
                  {
                    "description": "Brand identity system",
                    "quantity": 2,
                    "unitPriceTaxExcl": 3000,
                    "taxPercent": 20,
                    "totalPriceTaxIncl": 7200
                  },
                  {
                    "description": "Typeface licence, 5 seats",
                    "quantity": 1,
                    "unitPriceTaxExcl": 450,
                    "taxPercent": 20,
                    "totalPriceTaxIncl": 540
                  },
                  {
                    "description": "UX research workshop",
                    "quantity": 4,
                    "unitPriceTaxExcl": 1200,
                    "taxPercent": 20,
                    "totalPriceTaxIncl": 5760
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}`,
    },
    {
      type: "paragraph",
      spans: [
        "Paperless remains the interface for the original document. Connect provides a visual interface for the structured invoice, and GraphQL makes the same state available to other applications.",
      ],
    },

    { type: "heading", text: "Where AI enters the flow" },
    {
      type: "paragraph",
      spans: [
        "Paperless handles document ingestion and extracts the text from the uploaded PDF. The paperless-sync integration sends that text to the configured language model. The model identifies the invoice fields and maps them into a Powerhouse invoice document.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless's own optional AI functionality stays disabled in this example. The Powerhouse integration uses the model for one job: turning extracted invoice text into structured data.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless extracts the document's content, the model structures it, and Powerhouse makes the result programmable.",
      ],
    },

    { type: "heading", text: "Invoices from email" },
    {
      type: "paragraph",
      spans: [
        "Manual upload shows the mechanism, but invoices usually arrive by email.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless can watch a mailbox itself. Two things need to exist for that: an account that says where the mailbox is, and a rule that says which messages to take from it. Both live under ",
        { code: "Mail" },
        " in the left sidebar, at ",
        { code: "localhost:8000/mail" },
        ".",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/mail-settings.png",
      width: 3024,
      height: 1764,
      alt: "The Mail Settings page in Paperless, reached from the Mail item in the left sidebar, showing a Mail accounts table with one Gmail account on imap.gmail.com and a Mail rules table that still reads \u201cNo mail rules defined\u201d.",
      caption:
        "Step 1. Mail in the sidebar opens Mail Settings: accounts on top, rules underneath. Add Account and Add Rule open the same forms shown below.",
    },
    {
      type: "paragraph",
      spans: [
        "The account is the IMAP connection. Give it a name, the mail host and port, the security setting the host expects, and the login. This example points at a throwaway Gmail mailbox: ",
        { code: "imap.gmail.com" },
        " on port 993 over SSL. Gmail wants an app password here rather than the account password. Any IMAP provider works; the host, port and security setting come from whoever runs the mailbox.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/mail-account.png",
      width: 1968,
      height: 1230,
      alt: "The Edit mail account dialog in Paperless, filled in for Gmail: IMAP server imap.gmail.com, port 993, security SSL, a Gmail username, a masked password and a UTF-8 character set.",
      caption:
        "Step 2. The connection. Test checks the credentials against the server before you save.",
    },
    {
      type: "paragraph",
      spans: [
        "The rule decides what Paperless does with the mail it finds. Point it at the account, set the folder to ",
        { code: "INBOX" },
        ", set the consumption scope to attachments only, and filter filenames with ",
        { code: "*.pdf" },
        " so nothing but invoices gets consumed. Assigning the Invoice document type here is what hands the result to the Powerhouse workflow.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/mail-rule.png",
      width: 1920,
      height: 1043,
      alt: "The Create new mail rule dialog in Paperless, pointed at the Gmail account: folder INBOX, consumption scope set to only process attachments, a *.pdf filename filter, an action of flagging the mail, and Invoice set as the assigned document type.",
      caption:
        "Step 3. The rule. Note the action: flag the mail rather than mark it read, so opening a message in a mail client does not make Paperless skip it.",
    },
    {
      type: "paragraph",
      spans: [
        "With both saved, send a PDF invoice to the monitored address. Paperless checks the mailbox on a schedule, and the Process Mail button on the account runs the check immediately.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/email-inbox.png",
      width: 1440,
      height: 520,
      alt: "A webmail inbox holding one message from billing@atlasfreight.example, titled Invoice DE-2026-3077, with a PDF attachment named DE-2026-3077.pdf.",
      caption:
        "Step 4. The invoice arrives the way invoices usually do: a message with a PDF attached.",
    },
    {
      type: "paragraph",
      spans: [
        "On the next mail check the attachment is consumed, archived in Paperless, and passed through the same pipeline as the manual upload. It lands in the Billing drive as a structured invoice, filed under the month it belongs to.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/email-invoice-in-connect.png",
      width: 1440,
      height: 512,
      alt: "The October 2026 month in the Powerhouse Connect Billing drive, listing invoice DE-2026-3077 from Atlas Freight Forwarding with its issue date, due date, EUR currency and an amount of 6,783.00.",
      caption:
        "Step 5. The emailed attachment as a draft invoice under October 2026: DE-2026-3077, 6,783.00 EUR.",
    },
    {
      type: "paragraph",
      spans: [
        "Because the attachment is already a PDF, the optional Tika and Gotenberg services are not required. The input method has changed. The downstream workflow has not.",
      ],
    },

    { type: "heading", text: "From individual documents to a dataset" },
    {
      type: "paragraph",
      spans: [
        "One invoice demonstrates the integration. A larger collection shows why the structured representation matters.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Drop a folder of PDFs into the repository's ",
        { code: ".local/consume" },
        " directory. Paperless processes each document. The integration creates a corresponding Powerhouse invoice and updates the Billing dashboard.",
      ],
    },
    {
      type: "paragraph",
      spans: ["The dashboard builds as invoices arrive. It reports:"],
    },
    {
      type: "list",
      items: [
        ["Monthly invoice value by status."],
        ["Invoice counts and totals by status."],
        ["Outstanding amounts and cash flow by due month."],
        ["Category and payment-term breakdowns."],
        ["Totals across currencies."],
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/billing-dashboard.png",
      width: 3200,
      height: 2000,
      alt: "The Powerhouse Billing dashboard: monthly invoice value by status across ten months, and total invoice value by paying entity.",
      caption: "The Billing dashboard over a folder of consumed invoices.",
    },
    {
      type: "paragraph",
      spans: [
        "Paperless remains the archive for the original documents. Powerhouse provides the structured state that interfaces, APIs, analytics and AI tools can work with.",
      ],
    },

    { type: "heading", text: "Building other workflows" },
    {
      type: "paragraph",
      spans: [
        "This example uses invoices, but the integration pattern is more general. Keep the application that already handles part of a process well, then represent its important data as structured Powerhouse documents.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless continues to handle document ingestion and archiving. The Powerhouse integration adds a document model, synchronization, a programmable API and domain-specific interfaces on top of it.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The same pattern applies to other document systems, operational tools and industry workflows.",
      ],
    },
    {
      type: "resources",
      title: "Run it yourself",
      items: [
        {
          label: "Paperless Billing example",
          href: PAPERLESS_BILLING_REPO,
          note: "The Docker Compose stack, bootstrap script and start commands used in this post.",
        },
        {
          label: "Vetra",
          href: "https://vetra.io",
          note: "Browse packages and build your own workflow in Vetra Studio.",
        },
      ],
    },
  ],
};


/** Vetra Academy, where Powerhouse terms are explained on first use. */
const ACADEMY = "https://academy.vetra.io/academy";
const UMH_REPO = "https://github.com/powerhouse-inc/umh-powerhouse";
const UMH_LEDGER_PACKAGE = "https://vetra.io/packages/umh-production-ledger";
const UMH_FACTORY_DEMO_REPO =
  "https://github.com/united-manufacturing-hub/umh-factory-demo";

const UMH_POST: BlogPost = {
  slug: "united-manufacturing-hub-powered-by-powerhouse",
  title: "Following a purchase order from a scanned PDF to the UMH factory floor",
  summary: [
    "A purchase order arrives as a scanned PDF in Paperless-ngx, and the factory floor reports its counts through UMH.",
    "This walkthrough follows one order from the scan to the floor, with a Powerhouse ledger holding the contract terms and the counts side by side.",
  ],
  metaDescription:
    "A scanned purchase order becomes a production ledger that records what the UMH factory floor makes against the contract. A local Docker example, walked through.",
  date: "2026-09-11",
  author: "Powerhouse",
  category: "Integrations",
  readingMinutes: 12,
  body: [
    {
      type: "note",
      spans: [
        "This is an integration example you can run from ",
        { text: "its GitHub repository", href: UMH_REPO },
        ". The factory here is a simulator and the purchase orders are fictional. The contract terms come from a scanned PDF, the counts come from machines over OPC-UA and Modbus, and one record holds both.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/hero-paperless-connect.png",
      width: 1424,
      height: 489,
      alt: "Paperless on the left holding three purchase-order scans; Connect on the right showing the PL Dashboard drive with three ledgers.",
      caption:
        "Paperless holds the scans. Connect holds the ledgers they became.",
    },
    {
      type: "primer",
      label: "What is UMH?",
      spans: [
        { text: "UMH", href: "https://www.umh.app" },
        " is an open-source data infrastructure for factories that you host yourself. It reads machines over industrial protocols, normalises what they say into a Unified Namespace, and stores the history in TimescaleDB. From there it computes good counts, scrap, first-pass yield and overall equipment effectiveness per workcell.",
      ],
    },


    { type: "heading", text: "What runs in the demo" },
    {
      type: "paragraph",
      spans: [
        "The Docker Compose file starts with the same slim ",
        { text: "Paperless-ngx", href: "https://github.com/paperless-ngx/paperless-ngx" },
        " setup as the ",
        {
          text: "Paperless Billing example",
          href: "/blog/paperless-ngx-pdf-to-structured-data",
        },
        ": Redis as task broker, SQLite for application data, PDF input only. Tika and Gotenberg stay off.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Everything runs in Docker: the two systems being integrated, and Powerhouse beside them. The ", { text: "Switchboard", href: `${ACADEMY}/Learn/switchboard/what-is-switchboard` }, " image holds the ", { text: "reactor", href: `${ACADEMY}/Learn/architecture/the-big-picture` }, " and the workflow runtime, the ", { text: "Connect", href: `${ACADEMY}/Learn/connect/what-is-connect` }, " image holds Workflow Studio and the ledger ", { text: "editors", href: `${ACADEMY}/Learn/editors/what-is-an-editor` }, ", and both install the ",
        { text: "ledger package", href: UMH_LEDGER_PACKAGE },
        " from the Vetra registry at startup. A seed script then creates the two ", { text: "drives", href: `${ACADEMY}/Learn/document-models/documents-and-drives` }, ", the connections and the three workflows. It looks before it writes, so you can run it again after a restart.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The new part is a vendored copy of the ",
        { text: "UMH factory demo", href: UMH_FACTORY_DEMO_REPO },
        ". It runs a machine simulator with four production lines and thirteen workcells that speak OPC-UA and Modbus, ",
        { code: "umh-core" },
        " with protocol converters that feed the Unified Namespace and a historian bridge, TimescaleDB behind pgbouncer, and an nginx gateway for the simulator UI and two small APIs for cost rates and stop reasons. The ledger does not use Grafana, so the compose file omits it.",
      ],
    },
    {
      type: "code",
      language: "text",
      label: "What runs where",
      code: `paperless-ngx       the document archive               port 8000
redis               paperless's task queue
switchboard         the reactor and workflow runtime   port 4001
connect             Workflow Studio, ledger editors    port 3000
machine simulator   OPC-UA and Modbus machines         port 8081, via nginx
umh-core            the Unified Namespace and historian
timescaledb         machine history, behind pgbouncer  port 5432
nginx               cost-rate and stop-reason APIs     port 80`,
    },
    {
      type: "note",
      spans: [
        "The demo publishes the standard ports. Stop any Paperless, factory simulator or PostgreSQL you already run on 8000, 8081 or 5432 before you start it.",
      ],
    },

    { type: "heading", text: "The three workflows that connect the systems" },
    {
      type: "paragraph",
      spans: [
        "The integration is three workflows, built from the piece catalogue ",
        { text: "Activepieces", href: "https://www.activepieces.com" },
        " publishes. They run inside the reactor, and you read and edit them in Workflow Studio.",
      ],
    },
    {
      type: "list",
      items: [
        [
          "Draft a ledger from a purchase order. Twelve blocks, from the archive's new-document trigger to a draft ledger with its line and part filled in.",
        ],
        [
          "Create the floor order on approval. Seven blocks, triggered by a reviewer approving, ending with the floor's own order id bound to the ledger.",
        ],
        [
          "Append floor progress to the evidence trail. Four blocks on a polling trigger, two of which are guards that decide to write nothing.",
        ],
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh-workflows/wf-draft-ledger.png",
      width: 3200,
      height: 1182,
      alt: "Workflow Studio showing the twelve-step workflow that drafts a ledger from a purchase order, with two succeeded runs beneath it.",
      caption:
        "The first workflow in Workflow Studio: its twelve steps, and the two runs it has made.",
    },

    { type: "heading", text: "Turning a scanned order into a draft ledger" },
    {
      type: "paragraph",
      spans: [
        "After startup the PL Dashboard drive contains its Paperless connection and nothing else. The repository ships four sample purchase orders in ",
        { code: "demo-pdfs/" },
        ".",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Copy one into ",
        { code: ".local/consume/" },
        ", or upload it in Paperless. Paperless runs OCR, the document type matches on the word ",
        { code: "order" },
        ", and the workflow pushes the document to the Powerhouse integration. About a minute later a DRAFT production ledger appears in Connect with the original scan attached.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Click View Order PDF. The scan opens beside the extracted commitment, so you can check each field against the source.",
      ],
    },
    {
      type: "media",
      kind: "image",
      // A later run than the steps above: the badge reads CLOSED OUT, which
      // the current demo never reaches. Recapture on a draft ledger.
      src: "/blog/umh/ledger-order-pdf.png",
      width: 1648,
      height: 1270,
      alt: "A Production Ledger in Connect: the commitment fields on the left, the original purchase-order PDF open and readable on the right.",
      caption:
        "A ledger beside the scan it came from, so each extracted field can be checked against the source. This capture comes from an earlier build that still closed ledgers out.",
    },
    {
      type: "paragraph",
      spans: [
        "The purchase order is now a ", { text: "Powerhouse document", href: `${ACADEMY}/Learn/document-models/documents-and-drives` }, " managed by Switchboard. It holds the customer, manufacturer, part number, production line, committed quantity, quality floor, OEE floor, requested delivery time, and the contract's own scrap-liability and late-delivery rates. The GraphQL API returns the same state:",
      ],
    },
    {
      type: "code",
      language: "bash",
      code: `curl -s http://localhost:4001/graphql/production-ledger \\
  -H 'content-type: application/json' \\
  -d '{"query":"{ ProductionLedger { documents { items { state { global { status customer partNumber committedQuantity committedQualityPct orderId } } } } } }"}'`,
    },
    {
      type: "code",
      language: "json",
      code: `{
  "status": "DRAFT",
  "customer": "Kestrel Drive Systems B.V.",
  "partNumber": "THT-MAIN-A",
  "committedQuantity": 1200,
  "committedQualityPct": 99,
  "orderId": null
}`,
    },
    {
      type: "paragraph",
      spans: [
        "Paperless remains the interface for the original document. Connect provides the review and approval interface. GraphQL serves the same state to other applications.",
      ],
    },

    { type: "heading", text: "How a model reads the purchase order" },
    {
      type: "paragraph",
      spans: [
        "A supplier that trades over EDI never needs a model here. The rest receive purchase orders as PDFs, and each customer lays them out its own way: a form from one, a letter from another, German number formats from a third. A template breaks on the next customer. Reading those documents is the model's job.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless extracts the text, and the model turns it into the commitment: customer, part, quantity, quality floor and delivery time. The step that applies the answer may dispatch ",
        { code: "SET_COMMITMENT" },
        " and nothing else, and a person approves what it filled in.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/ledger-review-panel.png",
      width: 1090,
      height: 905,
      // A 2x capture of one panel: at column width the UI reads at 1.6x.
      displayWidth: 560,
      alt: "The Review incoming order panel on a draft ledger, awaiting approval: customer, UMH line, part number, quantity and date wanted, with an Approve order button.",
      caption:
        "The model's answers, as the reviewer sees them. Nothing reaches the floor until someone clicks Approve order.",
    },
    {
      type: "paragraph",
      spans: [
        "If you correct a field before approving, the editor records your value beside the extracted one. On one sample order the model dropped the time from “28 September 2026, 14:39”, on an order whose late rate is 250 EUR an hour.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "We wrote test documents for this step, each with the outcome it should produce. They are the cases a template cannot handle, and the ones where a wrong answer would be expensive.",
      ],
    },
    {
      type: "table",
      columns: ["Document", "What it tests", "Expected outcome"],
      rows: [
        [
          ["A letter order"],
          ["No field labels, no table, the quantity written out in words."],
          ["The same commitment a form would give."],
        ],
        [
          ["German number and date formats"],
          ["“1.200 Stück”, a delivery calendar week (KW 38), and an ambiguous 09/03/2026."],
          ["1,200 units, with the ambiguous date left for the reviewer instead of guessed."],
        ],
        [
          ["A delivery note"],
          ["Looks like an order and contains the word, but records 112 units delivered."],
          ["No commitment, or a visibly empty one. A plausible 112-unit commitment is the worst result."],
        ],
        [
          ["An injection attempt"],
          ["A clause telling the processing agent to approve the order and open the ledger."],
          [
            "Only ",
            { code: "SET_COMMITMENT" },
            ". The ledger stays a draft with no approver.",
          ],
        ],
        [
          ["An incomplete order"],
          ["No quantity and no delivery date."],
          [
            "A partial draft, which ",
            { code: "OPEN_LEDGER" },
            " refuses to open.",
          ],
        ],
      ],
    },
    {
      type: "paragraph",
      spans: [
        "These are expected outcomes. This post does not report runs against them.",
      ],
    },

    { type: "heading", text: "When orders arrive through EDI or an ERP" },
    {
      type: "paragraph",
      spans: [
        "A scanned PDF sits at one end of the intake spectrum. ",
        {
          text: "Electronic data interchange (EDI)",
          href: "https://en.wikipedia.org/wiki/Electronic_data_interchange",
        },
        " anchors the other, the industry standard between established trading partners. An ",
        {
          text: "EDI 850 purchase order",
          href: "https://x12.org/products/transaction-sets",
        },
        " arrives structured: nothing needs reading, no model proposes anything, and its segments map onto the ledger's commitment fields.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Suppliers below the tier where a customer mandates EDI receive their purchase orders as email attachments and scans. The terms that price a mistake sit in prose clauses on the page. Paperless handles that path, and this example takes it. Swap the intake for EDI or an ",
        {
          text: "ERP",
          href: "https://en.wikipedia.org/wiki/Enterprise_resource_planning",
        },
        " order record and the rest of the workflow holds, because the ledger needs one thing from intake: a structured commitment.",
      ],
    },

    { type: "heading", text: "Approving the order and sending it to the floor" },
    {
      type: "paragraph",
      spans: [
        "The reviewer clicks Approve order, and the editor dispatches ",
        { code: "APPROVE_ORDER" },
        " on the ledger.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The operation checks before it writes. It refuses a ledger that is not a draft, one that is already approved, an approval that names no approver, and a commitment still missing its manufacturer, customer, quantity or delivery time. Then it records who approved, when, which scan they approved against, and each field they corrected, with the extracted value beside theirs.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Approval also freezes the commitment. After it, the ledger refuses ",
        { code: "SET_COMMITMENT" },
        ", so the quantity, the quality floor and the delivery time cannot change while parts are being made.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The second workflow reacts to the approval. It runs in the reactor, which holds the connection to the factory with its key behind a secret reference, so the browser never talks to the floor.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh-workflows/wf-create-order-steps.png",
      width: 2000,
      height: 640,
      alt: "Workflow Studio showing Create the floor order on approval, seven steps: document event trigger, read the approved ledger, does it already name an order, is there a line to run it on, create the order on the floor, bind the id and open the ledger, and two error steps that say why the order was not created or that there is no line to run it on.",
      caption:
        "The second workflow, seven steps. If there is no line to run on, or the floor does not create the order, an error step records the reason on the ledger.",
    },
    {
      type: "paragraph",
      spans: [
        "It reads the approved ledger, checks whether it already names an order and whether there is a line to run on, then creates the order on the floor, binds the id the floor returns and opens the ledger.",
      ],
    },
    {
      type: "media",
      kind: "image",
      // Cropped from ledger-order-pdf.png, clear of its CLOSED OUT badge.
      src: "/blog/umh/ledger-approved-record.png",
      width: 682,
      height: 328,
      displayWidth: 682,
      alt: "The ledger's Record panel after approval: approved by piet@meridianmetalwerke.de at 9/11/2026, 4:49:51 PM, source scan attached, nothing changed on review; below it the Order ID field holding the floor's order id and the UMH line.",
      caption:
        "The result: the ledger names who approved and when, and the Order ID field holds the id the floor returned.",
    },
    {
      type: "paragraph",
      spans: [
        "Read that order id as if an external system had issued it, because in a plant one does. The simulator stands in for two layers a plant keeps apart. An enterprise resource planning (ERP) system mints the order id, the number finance, planning and the shop floor all quote. A manufacturing execution system (MES) then dispatches the job to a line. This demo has neither, so the ledger posts the order and takes back the id, inverting the real control direction. UMH ships an ",
        { code: "erp-receiver" },
        " and an ",
        { code: "erp-order-bridge" },
        " for the correct path, and they sit in the factory config waiting for an ERP to talk to them.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/simulator-orders-highlighted.png",
      width: 1280,
      height: 800,
      alt: "The machine simulator's Orders view with the ledger's order id highlighted in the table.",
      caption:
        "The simulator's Orders view. Approving a ledger adds a row like the highlighted one.",
    },
    {
      type: "paragraph",
      spans: [
        "The third workflow watches the floor. Its trigger fires once per order per change, carrying the counts and the derived OEE, and two guards stand between it and the ledger: a run that counted nothing stops, and a ledger that is not open stops. Evidence counts only while the commitment is in force, from the moment the ledger opens.",
      ],
    },
    {
      type: "code",
      language: "json",
      code: `{
  "startedAt": "2026-09-02T09:58:29.867Z",
  "scannedRef": "window-frame-1",
  "snapshots": [
    { "capturedAt": "09:58:49Z", "quantityCompleted": 0, "quantityScrap": 0, "orderStatus": "IN_PROGRESS" },
    { "capturedAt": "09:59:19Z", "quantityCompleted": 1, "quantityScrap": 0, "orderStatus": "IN_PROGRESS" },
    { "capturedAt": "09:59:50Z", "quantityCompleted": 2, "quantityScrap": 0, "orderStatus": "IN_PROGRESS" }
  ]
}`,
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh-workflows/wf-append-evidence.png",
      width: 3200,
      height: 836,
      alt: "The four-step workflow that appends floor progress to the evidence trail, with its trigger, two branch guards and a dispatch.",
      caption:
        "Four blocks, two of them guards. A run that stops at a guard succeeded and decided to write nothing.",
    },
    {
      type: "paragraph",
      spans: [
        "The snapshot id is derived from the order and the moment it was captured, so a replayed delivery carries an id the ledger already holds, and the ledger refuses it instead of appending the same reading twice.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/evidence-trail.png",
      width: 1696,
      height: 1948,
      alt: "The Evidence Trail panel: live floor status, committed against good and scrap, the completion bar, and the expanded snapshot list.",
      caption:
        "The evidence trail fills as the run proceeds: committed against good and scrap, with every snapshot kept.",
    },
    {
      type: "paragraph",
      spans: [
        "The floor reports more than this deployment reads. The historian on the same machine holds OEE per workcell and stop hours attributed to reason codes, while the REST path here returns counters only. Two things come next: filters on the evidence trail for scrap, quality and efficiency, and a chart that draws any machine signal against the commitment.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Powerhouse sends the floor one thing, the order a person approved, and reads everything after that. The ledger cannot start, stop or change a machine.",
      ],
    },

    { type: "heading", text: "Reading the ledger's operation history" },
    {
      type: "paragraph",
      spans: [
        "A Powerhouse document is a log of ", { text: "operations", href: `${ACADEMY}/Learn/foundations/thinking-in-operations` }, ", and the state you see is the result of replaying that log. Connect shows the log in the document's ", { text: "history view", href: `${ACADEMY}/Build/BuildingUserExperiences/DocumentTools/OperationHistory` }, ". Each entry names the operation, the time, and the actor that dispatched it, whether a reviewer or one of the workflows.",
      ],
    },
    {
      type: "code",
      language: "text",
      label: "The operations on one ledger, in order",
      code: `SET_COMMITMENT            <- first workflow, the extracted commitment
SET_SOURCE_DOCUMENT       <- first workflow, the scan attached
SET_COMMITMENT            <- first workflow, the line and part from the floor
APPROVE_ORDER             <- reviewer, in Connect
BIND_ORDER_ID             <- second workflow, the id the floor returned
OPEN_LEDGER               <- second workflow
RECORD_ACTUALS_SNAPSHOT   <- third workflow, one per floor reading`,
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/history.png",
      width: 1280,
      height: 800,
      alt: "Connect's history view for a ledger: one row per operation, in order.",
      caption: "One row per operation, in the order they were dispatched.",
    },
    {
      type: "paragraph",
      spans: [
        "The log accepts appends only. Replay it and you get the same ledger, reading for reading.",
      ],
    },

    { type: "heading", text: "Where the demo stops" },
    {
      type: "paragraph",
      spans: [
        "When the floor reports the order complete, the ledger stays open and the dashboard marks it Close-out pending. This demo ends there.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The ledger package defines a close-out. It compares the evidence with the commitment and records four things:",
      ],
    },
    {
      type: "code",
      language: "text",
      code: `conformance   quantity met - yield >= floor - OEE >= floor or NOT MEASURED - finished by the due date
run cost      scrap x internal scrap rate  +  stop hours x internal downtime rate   (UMH cost tables)
exposure      yield below floor -> the PO's non-conformance clause and its per-reject rate
              hours to the requested delivery time, and the PO's late rate if you miss it
ship / hold   CONFORMS with a delivery window left -> ship; otherwise hold, failing dimensions listed`,
    },
    {
      type: "paragraph",
      spans: [
        "The package computes that close-out in its order poller, a ", { text: "processor", href: `${ACADEMY}/Learn/switchboard/processors-and-read-models` }, ". This demo keeps the poller off, because the floor workflow already writes the evidence trail and two writers on one append-only trail would record every reading twice. None of the three workflows may dispatch ",
        { code: "CLOSE_OUT" },
        ", so no verdict, run cost or ship-or-hold recommendation appears yet.",
      ],
    },

    { type: "heading", text: "All ledgers on one dashboard" },
    {
      type: "paragraph",
      spans: [
        "The drive's root view, the PL Dashboard, puts every ledger in one table.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "A row gives you the commitment from a purchase order, the id of the order the floor is running, that order's live status, production against what was promised, and yield.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "UMH draws better charts from this data than we do, decomposed per ISO 22400. The row exists because one ", { text: "document model", href: `${ACADEMY}/Learn/document-models/your-first-document-model` }, " holds both halves, the contract and the counts, and a workflow keeps the machine half current.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Copy all four sample purchase orders into ",
        { code: ".local/consume/" },
        ". Each becomes a ledger, and the view updates as they progress: ledgers by stage, conformance breaches across all of them, per-ledger progress against commitment, and search across customer, part, line and order id.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/umh/connect-dashboard.png",
      width: 2880,
      height: 1800,
      alt: "The PL Dashboard: stage counts across the top, one row per ledger with floor status and progress.",
      caption:
        "The dashboard over four consumed purchase orders, each a ledger at its own stage.",
    },

    { type: "heading", text: "How the demo compares to a plant" },
    {
      type: "paragraph",
      spans: [
        "The demo takes shortcuts a plant cannot. Read this before you draw conclusions from a screenshot.",
      ],
    },
    {
      type: "table",
      columns: ["Area", "In this demo", "In a plant"],
      rows: [
        [
          ["Order id"],
          ["The ledger posts the order to the simulator and binds the id it returns."],
          ["The ERP mints the id, and the ledger reads it."],
        ],
        [
          ["ERP and MES"],
          ["One simulator process issues the order and executes it."],
          ["Two systems: the ERP issues the order, and the MES dispatches it to a line."],
        ],
        [
          ["Machine data"],
          ["A workflow polls the simulator's API. The Unified Namespace path exists in the codebase and is not registered here."],
          ["The ledger reads evidence from the Unified Namespace."],
        ],
        [
          ["Orders on the floor"],
          ["The simulator runs in manual ERP mode, so the only orders on the floor are the ones approved ledgers create."],
          ["The ledger's order runs alongside the rest of the plant's work."],
        ],
        [
          ["Run length"],
          [
            "Some screenshots come from runs cut to 20 units after extraction, through the same ",
            { code: "SET_COMMITMENT" },
            " a reviewer would use, so a run finishes in minutes.",
          ],
          ["The full committed quantity."],
        ],
        [
          ["Close-out"],
          ["Ledgers stop at Close-out pending and stay open. No verdict, run cost or ship-or-hold recommendation appears."],
          ["The ledger package's close-out records conformance, run cost, exposure and a ship-or-hold recommendation."],
        ],
        [
          ["Extraction model"],
          ["OpenRouter, a hosted model API, so the purchase order's text leaves your machines for that one step."],
          ["A model you choose, which can run inside your network, depending on the deployment."],
        ],
        [
          ["Orders and rates"],
          ["Four sample purchase orders and one simulated plant. Customer names, parts and rates are fictional."],
          ["Your customers, parts and contract rates."],
        ],
        [
          ["Conformance rules"],
          ["Derived from the clauses on the sample PDFs."],
          ["Checked against how the plant measures a run."],
        ],
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Some screenshots in this post come from an earlier build that still closed ledgers out, so they show close-out steps and states this demo does not reach.",
      ],
    },

    { type: "heading", text: "Using the same pattern for other workflows" },
    {
      type: "paragraph",
      spans: [
        "The example uses purchase orders and a simulated factory. The pattern is general: keep the systems that already do their part well, here the document archive and the shop-floor data layer, and represent the commitments that span them as structured Powerhouse documents.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless keeps ingesting and archiving. UMH keeps transporting and storing machine data. The Powerhouse integration adds a document model, a human review gate, an append-only operation log, a programmable API and domain-specific interfaces. It writes nothing back to the archive, and it sends the floor only the orders a person approved.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "We wired purchase orders to a factory floor. Your commitment will be a different one, against different systems.",
      ],
    },

    { type: "heading", text: "Running the demo on your machine" },
    {
      type: "paragraph",
      spans: [
        "The demo runs on your machine from ",
        { text: "its own repository", href: UMH_REPO },
        ". You need Docker with Compose v2, and an ",
        { text: "OpenRouter", href: "https://openrouter.ai" },
        " key for the extraction step. The first run pulls about 3 GB.",
      ],
    },
    {
      type: "code",
      language: "bash",
      code: `git clone https://github.com/powerhouse-inc/umh-powerhouse.git
cd umh-powerhouse
cp .env.example .env   # set PAPERLESS_AI_API_KEY and UMH_LEDGER_VERSION
./start.sh             # starts the stack, seeds drives, connections and workflows`,
    },
    {
      type: "paragraph",
      spans: [
        "When the stack is up, ",
        { code: "start.sh" },
        " opens Paperless and the PL Dashboard drive in Connect.",
      ],
    },
    {
      type: "paragraph",
      spans: ["The interfaces:"],
    },
    {
      type: "list",
      items: [
        [
          "Paperless at ",
          { code: "localhost:8000" },
          ", using ",
          { code: "admin / paperless" },
          " as the demo credentials.",
        ],
        ["Connect, with Workflow Studio, at ", { code: "localhost:3000" }, "."],
        [
          "Switchboard's GraphQL playground at ",
          { code: "localhost:4001/graphql" },
          ".",
        ],
        ["The machine simulator at ", { code: "localhost:8081" }, "."],
      ],
    },
    {
      type: "resources",
      title: "Links from this post",
      items: [
        {
          label: "UMH x Powerhouse demo",
          href: UMH_REPO,
          note: "The compose file, the three workflow definitions, the seed and the sample purchase orders used in this post.",
        },
        {
          label: "UMH factory demo",
          href: UMH_FACTORY_DEMO_REPO,
          note: "The upstream factory simulator, which also runs on its own.",
        },
        {
          label: "UMH",
          href: "https://www.umh.app",
          note: "The open-source factory data infrastructure the simulated floor runs on.",
        },
        {
          label: "Paperless-ngx",
          href: "https://github.com/paperless-ngx/paperless-ngx",
          note: "The document archive that receives the purchase orders.",
        },
        {
          label: "The ledger package on Vetra",
          href: UMH_LEDGER_PACKAGE,
          note: "The Production Ledger document model and editors the demo installs.",
        },
        {
          label: "The UMH integration",
          href: "/integrations/umh",
          note: "The integration record: the scenario, the workflow and the film.",
        },
      ],
    },
  ],
};

/**
 * The Paperless walkthrough, linked from the landing page's integration card.
 * Exported so that card cannot drift from the real route.
 */
export const PAPERLESS_POST_SLUG = PAPERLESS_POST.slug;

/** Newest first. The index and the sitemap both read this order. */
export const UMH_POST_SLUG = UMH_POST.slug;

export const BLOG_POSTS: readonly BlogPost[] = [UMH_POST, PAPERLESS_POST] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

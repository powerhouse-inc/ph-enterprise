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
  | {
      type: "media";
      kind: "image" | "video";
      /** null until the asset exists; the block is skipped while it is null. */
      src: string | null;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
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
  slug: "paperless-powered-by-powerhouse",
  title: "Paperless, powered by Powerhouse",
  summary: [
    "Paperless-ngx is good at turning incoming files into an organized document archive.",
    "Powerhouse makes structured documents available through interfaces, APIs and AI tools.",
    "We combined them and followed one invoice through a workflow to see the result.",
  ],
  metaDescription:
    "An invoice enters through Paperless-ngx and leaves as structured, queryable data in the Powerhouse stack. A local Docker example, walked through end to end.",
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
PAPERLESS_AI_MODEL=openai/gpt-oss-120b
PAPERLESS_AI_API_KEY=your_openrouter_key_here`,
    },
    {
      type: "paragraph",
      spans: [
        "Those first two lines ship filled in, so the key is the only edit. Any OpenAI-compatible endpoint works if you point ",
        { code: "PAPERLESS_AI_BASE_URL" },
        " elsewhere and set a matching ",
        { code: "PAPERLESS_AI_MODEL" },
        ". Leave the base URL empty to call the Anthropic API directly, in which case the key is an Anthropic one.",
      ],
    },
    {
      type: "note",
      spans: [
        "Extraction quality is the model's, not the pipeline's. The screenshots below were produced with ",
        { code: "google/gemini-2.5-flash" },
        ", which read every field of this invoice set correctly. Smaller models are noticeably less reliable at the arithmetic on a line-item table, so if totals come out wrong, change the model before suspecting the integration.",
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

    { type: "heading", text: "One invoice, multiple interfaces" },
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
      width: 1440,
      height: 704,
      alt: "The Mail Settings page in Paperless, reached from the Mail item in the left sidebar, showing a Mail accounts table with one account and a Mail rules table with one rule.",
      caption:
        "Step 1. Mail in the sidebar opens Mail Settings: accounts on top, rules underneath. Add Account and Add Rule open the same forms shown below.",
    },
    {
      type: "paragraph",
      spans: [
        "The account is the IMAP connection. Give it a name, the mail host and port, the security setting the host expects, and the login. In this example the mailbox is a throwaway ",
        { code: "greenmail" },
        " container on the compose network, so the host is a service name rather than a public domain and the port is plain IMAP with no encryption. Against a real provider this is where TLS and the provider's own hostname go.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/mail-account.png",
      width: 1440,
      height: 664,
      alt: "The Edit mail account dialog in Paperless, with fields for name, IMAP server, IMAP port, IMAP security, username, password and character set filled in for a local greenmail server.",
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
      width: 1440,
      height: 1064,
      alt: "The Edit mail rule dialog in Paperless: folder INBOX, consumption scope set to only process attachments, a *.pdf filename filter, an action of flagging the mail, and Invoice set as the assigned document type.",
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


const UMH_REPO =
  "https://github.com/powerhouse-inc/umh-production-ledger/tree/demo/umh-workflow-stack/demo";
const UMH_FACTORY_DEMO_REPO =
  "https://github.com/united-manufacturing-hub/umh-factory-demo";

const UMH_POST: BlogPost = {
  slug: "united-manufacturing-hub-powered-by-powerhouse",
  title: "The United Manufacturing Hub, powered by Powerhouse",
  summary: [
    "Paperless-ngx is good at turning incoming files into an organized document archive.",
    "The United Manufacturing Hub is good at turning machine signals into one queryable stream.",
    "We combined the three and followed one purchase order from a scanned PDF to the factory floor.",
  ],
  metaDescription:
    "A purchase order enters as a scanned PDF and ends as a production ledger measured against what the machines actually did. A local Docker example, walked through.",
  date: "2026-09-11",
  author: "Powerhouse",
  category: "Integrations",
  readingMinutes: 12,
  body: [
    {
      type: "note",
      spans: [
        "This is an integration example. The factory here is a simulator and the purchase orders are fictional. The contract terms come from a scanned PDF, the counts come from machines over OPC-UA and Modbus, and one record holds both.",
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
      label: "What is the United Manufacturing Hub?",
      spans: [
        "UMH is an open-source data infrastructure for factories that you host yourself. It reads machines over industrial protocols, normalises what they say into a Unified Namespace, and stores the history in TimescaleDB. From there it computes good counts, scrap, first-pass yield and overall equipment effectiveness per workcell.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "UMH knows what the machines did. It has no field for what was promised. The quality floor, the delivery date and the rate that prices a rejected part live in the sales contract, and that is the half Powerhouse holds.",
      ],
    },

    { type: "heading", text: "Starting with Paperless and a factory" },
    {
      type: "paragraph",
      spans: [
        "The Docker Compose file starts with the same slim Paperless-ngx setup as the ",
        {
          text: "Paperless Billing example",
          href: "/blog/paperless-powered-by-powerhouse",
        },
        ": Redis as task broker, SQLite for application data, PDF input only. Tika and Gotenberg stay off.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Docker carries the two systems being integrated and nothing else. The reactor and Connect run on the host from this project, which is what lets a workflow you edit take effect without rebuilding an image. A seed script creates the two drives, the connections and the workflows, and is idempotent by name.",
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
      code: `Docker    machine simulator   OPC-UA and Modbus, port 18081
          paperless-ngx       the document archive, port 18000
          redis               paperless's task queue

Host      switchboard         the reactor, port 4001 - workflow runtime inside it
          connect             port 3001 - Workflow Studio and the ledger editors`,
    },
    {
      type: "note",
      spans: [
        "Both Docker ports are deliberately not the canonical ones. A standalone factory or archive publishes 8081 and 8000, and this demo must not talk to one by accident.",
      ],
    },

    { type: "heading", text: "The integration is three workflows" },
    {
      type: "paragraph",
      spans: [
        "The work that used to sit in a custom processor is now three workflows, built from the same piece catalogue ",
        { text: "Activepieces", href: "https://www.activepieces.com" },
        " publishes. They run inside the reactor, and you read and edit them in Workflow Studio rather than in a repository.",
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
        "The first workflow, and its runs. Every step is readable, and so is every run it has made.",
    },
    {
      type: "paragraph",
      spans: [
        "The reason to care is not that a graph is prettier than code. It is that each step which writes to a document declares the operations it may dispatch. The step applying the extracted commitment permits ",
        { code: "SET_COMMITMENT" },
        " and nothing else, so a model returning anything else cannot have it applied. The rule sits next to the step instead of in a document describing intent.",
      ],
    },

    { type: "heading", text: "One purchase order, multiple interfaces" },
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
      src: "/blog/umh/ledger-draft-review.png",
      width: 2880,
      height: 1800,
      alt: "The DRAFT ledger in Connect: the review panel on the left, the original purchase-order scan open on the right.",
      caption:
        "The draft ledger beside the scan it came from, so each extracted field can be checked against the source.",
    },
    {
      type: "paragraph",
      spans: [
        "The purchase order is now a Powerhouse document managed by Switchboard. It holds the customer, manufacturer, part number, production line, committed quantity, quality floor, OEE floor, requested delivery time, and the contract's own scrap-liability and late-delivery rates. The GraphQL API returns the same state:",
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

    { type: "heading", text: "Where AI enters the flow" },
    {
      type: "paragraph",
      spans: [
        "Paperless ingests the PDF and extracts its text. A step in the workflow hands that text to the configured model along with the ledger's own state schema, read at run time, so the prompt cannot drift from the document model the way a hardcoded field list would. The next step dispatches what came back, permitting ",
        { code: "SET_COMMITMENT" },
        " and nothing else. Approval, opening, close-out and acknowledgement stay with people.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The model proposes and a person approves. If you change a field before approving, for example the requested delivery time, the editor records the change on the document as a correction with the extracted value and your value side by side. On one sample order the model read “28 September 2026, 14:39” and dropped the time. The review gate catches that class of error, and the late-delivery rate on that order makes each lost hour worth 250 EUR.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The production line is the sharper case. A purchase order cannot name one, because it names a line in the manufacturer's own plant, so the extraction is told to leave it unset. Four later blocks fill it: list the floor's live lines, ask the model which line and part fit, then use its reply as a search key against the floor's own catalogue. An invented line matches nothing, a real part on the wrong line matches nothing, and a refusal matches nothing. Each returns empty and the write is skipped, leaving the reviewer's blocker in place. What reaches the ledger came from the floor, which is a stronger guarantee than checking the model's answer is not empty.",
      ],
    },

    { type: "heading", text: "Orders from EDI and ERP" },
    {
      type: "paragraph",
      spans: [
        "A scanned PDF sits at one end of the intake spectrum. Electronic data interchange (EDI) anchors the other, the industry standard between established trading partners. An EDI 850 purchase order arrives structured: nothing needs reading, no model proposes anything, and its segments map onto the ledger's commitment fields. Use that link where you have it, and the extraction step in this example disappears.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Suppliers below the tier where a customer mandates EDI receive their purchase orders as email attachments and scans. The terms that price a mistake sit in prose clauses there, not in segments. Paperless handles that path, and this example takes it. Swap the intake for EDI or an ERP order record and the rest of the workflow holds, because the ledger needs one thing from intake: a structured commitment.",
      ],
    },

    { type: "heading", text: "From the ledger to the factory floor" },
    {
      type: "paragraph",
      spans: [
        "Approving dispatches an ordinary APPROVE_ORDER, and the second workflow reacts to it. The editor used to post to the factory itself and hand the minted id into the approval, which put a browser in conversation with a factory. The reactor is the side holding that connection, its key behind a secret reference, so the work moved there. The workflow asserts there is a line to run on, creates the order, binds the id the floor returns, and opens the ledger.",
      ],
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
        "Approving the ledger creates the order on the floor. The simulator's Orders table gains the row.",
    },
    {
      type: "paragraph",
      spans: [
        "The third workflow watches the floor. Its trigger fires once per order per change, carrying the counts and the derived OEE, and two guards stand between it and the ledger: a run that counted nothing stops, and a ledger that is not open stops. Evidence only means something between the baseline being frozen and the commitment ceasing to be in force.",
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
        "The snapshot id is derived from the order and the moment it was captured, so a replayed delivery produces an id the reducer already holds and is refused, rather than appending the same reading twice.",
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
        "Data flows in one direction. Powerhouse reads from the floor and has no write path to it. The ledger cannot start, stop or change a machine.",
      ],
    },

    { type: "heading", text: "The document history" },
    {
      type: "paragraph",
      spans: [
        "A Powerhouse document is a log of operations, and the state you see is the result of replaying that log. Connect shows the log in the document's history view. Each entry names the operation, the time, and the actor that dispatched it, whether a reviewer or one of the workflows.",
      ],
    },
    {
      type: "code",
      language: "text",
      label: "The operation log for one ledger",
      code: `  index  time (UTC)  operation
      0  10:12:25    SET_COMMITMENT            <- extractor
      1  10:12:25    SET_SOURCE_DOCUMENT       <- scan attached
      2  10:19:20    APPROVE_ORDER             <- reviewer
      3  10:19:20    SET_COMMITMENT            <- order id bound
      7  10:19:56    OPEN_LEDGER
      8  10:20:12    START_RUN                 <- workflow, floor timestamp
   9...29            RECORD_ACTUALS_SNAPSHOT   x 21
     30  10:25:42    CLOSE_OUT                 <- processor, on floor complete
     31  10:26:18    ACKNOWLEDGE               <- controlling`,
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
        "The log accepts appends only. If a rate table changes next quarter, the rates this close-out used stay in the record, and a replay reproduces the same figures.",
      ],
    },

    { type: "heading", text: "Closing the run" },
    {
      type: "paragraph",
      spans: [
        "When the floor reports the order complete, a processor closes the ledger out. There is no button, so nobody selects which evidence the close-out reads. It compares the evidence with the commitment and records four things:",
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
        "The internal rates price the run because in-process scrap does not reach the customer. The contract rates size the exposure because the customer measures yield per delivered lot. The panel shows both next to each other: for the window-frame part, 45 EUR to bin a unit and 180 EUR if the customer rejects one.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Settlement is out of scope. No money changes hands in this workflow. It issues no invoice, applies no penalty, negotiates no missed shipment date, records no customer inspection result, and carries no counterparty signature. The exposure figure is a projection against the contract's own rates, and every surface labels it as one. The record is unilateral, and it stops at the plant's own doorstep on a single decision, ship or hold. Settlement between a buyer and a supplier is a different document, and a different demo.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Controlling acknowledges the close-out. Production can read the record and cannot edit it, so the figure production reports is the figure controlling sees. A site that wants segregation of duties adds a second required acknowledgement. Two exits cover runs that do not complete: ",
        { code: "CLOSE_EARLY" },
        " closes a partial run against a written reason, and ",
        { code: "VOID_LEDGER" },
        " retires the ledger when the floor cancels the order.",
      ],
    },

    { type: "heading", text: "From individual ledgers to a dashboard" },
    {
      type: "paragraph",
      spans: [
        "One ledger shows the mechanism. The drive's root view shows why the record exists, so spend your time here.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "A row gives you the commitment from a purchase order, the id of the order the floor is running, that order's live status, production against what was promised, yield, and the verdict. It reaches from a contract clause a salesperson typed months ago to a counter that moved four seconds ago.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "The document archive holds the promise and knows nothing about the machines. The shop-floor data layer holds the machines and has no field for the promise. UMH draws better charts from this data than we do, decomposed per ISO 22400. The row exists because a document model holds both halves and a read-only processor keeps the machine half current.",
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
    {
      type: "paragraph",
      spans: [
        "Paperless keeps the original purchase orders. UMH keeps the record of what the machines did. Powerhouse keeps the document that binds the two.",
      ],
    },

    { type: "heading", text: "What the demo fakes" },
    {
      type: "paragraph",
      spans: [
        "The demo takes shortcuts a plant cannot. Read this before you draw conclusions from a screenshot.",
      ],
    },
    {
      type: "list",
      items: [
        [
          "The ledger creates the production order. Approving posts to the simulator and binds the id it returns. In a plant the ERP mints that id and the ledger reads it. The simulator also plays ERP and MES at once, one process both issuing the order and executing it, where a plant separates the two.",
        ],
        [
          "Evidence arrives by polling the simulator's API rather than through the Unified Namespace. The UNS path exists in the codebase and is not registered here.",
        ],
        [
          "Close-out is not in a workflow. The verdict, conformance dimensions and costs come from a calculation over the ledger's state, and a workflow cannot call a function. Everything up to it is the workflow's; closing out stays a human action in the editor.",
        ],
        [
          "The simulator dispatches round-robin and generates a competing order every 30 seconds. A ledger's order shares its line with four others, so a full-size purchase order takes hours. For the recordings we reduced the committed quantity to 20 units after extraction, through the same ",
          { code: "SET_COMMITMENT" },
          " operation a reviewer would use.",
        ],
        [
          "Four sample purchase orders, one simulated plant. The customer names, parts and rates are fictional. The contract clauses on the PDFs are the ones the ledger reads. We derived the conformance rules from those clauses, and a plant would check them against how it measures a run.",
        ],
      ],
    },

    { type: "heading", text: "Building other workflows" },
    {
      type: "paragraph",
      spans: [
        "The example uses purchase orders and a simulated factory. The pattern is general: keep the systems that already do their part well, here the document archive and the shop-floor data layer, and represent the commitments that span them as structured Powerhouse documents.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Paperless keeps ingesting and archiving. UMH keeps transporting and storing machine data. The Powerhouse integration adds a document model, a human review gate, an append-only operation log, a programmable API and domain-specific interfaces, with no write path into either system.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "We wired purchase orders to a factory floor. Your commitment will be a different one, against different systems.",
      ],
    },

    { type: "heading", text: "Run it yourself" },
    {
      type: "paragraph",
      spans: [
        "The demo runs on your machine from ",
        { text: "the ledger package's own repository", href: UMH_REPO },
        ". You need Docker, ",
        { text: "bun", href: "https://bun.sh" },
        ", and an ",
        { text: "OpenRouter", href: "https://openrouter.ai" },
        " key for the extraction step. Without the key everything else still works and that one step fails with a 401.",
      ],
    },
    {
      type: "code",
      language: "bash",
      code: `cp demo/.env.example demo/.env   # your OpenRouter key
bun install

bun run demo:up                  # the floor and the archive, in Docker
./demo/start.sh                  # the reactor and Connect - leave running
bun run demo:seed                # drives, connections and workflows`,
    },
    {
      type: "paragraph",
      spans: [
        "The seed prints the Connect links when it finishes. To check the whole path end to end, ",
        { code: "bun run demo:verify" },
        " uploads a real purchase order, waits for the workflow and reads the ledger that came out. It ends in fourteen passed checks, or names the one that failed and why.",
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
          { code: "localhost:18000" },
          ", using ",
          { code: "admin / paperless" },
          " as the demo credentials.",
        ],
        ["Connect, with Workflow Studio, at ", { code: "localhost:3001" }, "."],
        [
          "Switchboard's GraphQL playground at ",
          { code: "localhost:4001/graphql" },
          ".",
        ],
        ["The machine simulator at ", { code: "localhost:18081" }, "."],
      ],
    },
    {
      type: "resources",
      title: "Run it yourself",
      items: [
        {
          label: "The UMH demo",
          href: UMH_REPO,
          note: "The compose file, the workflow definitions, the seed and the sample purchase orders used in this post.",
        },
        {
          label: "UMH factory demo",
          href: UMH_FACTORY_DEMO_REPO,
          note: "The upstream factory simulator, which also runs on its own.",
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

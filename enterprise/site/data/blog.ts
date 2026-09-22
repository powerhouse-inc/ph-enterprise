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

/**
 * The Paperless walkthrough, linked from the landing page's integration card.
 * Exported so that card cannot drift from the real route.
 */
export const PAPERLESS_POST_SLUG = PAPERLESS_POST.slug;

/** Newest first. The index and the sitemap both read this order. */
export const BLOG_POSTS: readonly BlogPost[] = [PAPERLESS_POST] as const;

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

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
      type: "paragraph",
      spans: ["Shortly afterwards, a corresponding invoice appears in Connect."],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/upload-to-connect.png",
      width: 1440,
      height: 1163,
      alt: "The line items and totals printed on the uploaded PDF, above the same three line items and the same total rendered as structured fields in the Powerhouse Connect invoice.",
      caption:
        "The uploaded PDF in Paperless, and the invoice it becomes in Connect: same three line items, same \u20ac13,500.00.",
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
        "Under Paperless's mail settings, add an email account and create a rule that matches PDF attachments. Paperless checks the inbox periodically, consumes matching attachments and passes them through the same document-processing pipeline.",
      ],
    },
    {
      type: "paragraph",
      spans: [
        "Send a PDF invoice to the monitored address. On the next mail check, it appears in Paperless and then as a structured invoice in the Billing drive.",
      ],
    },
    {
      type: "media",
      kind: "image",
      src: "/blog/paperless/email-to-connect.png",
      width: 1440,
      height: 1009,
      alt: "A supplier invoice arriving as a PDF attachment in a mail client, above the same invoice rendered as structured line items in the Powerhouse Connect Billing drive.",
      caption:
        "The invoice arrives as an email attachment, and lands in the Billing drive as structured data.",
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

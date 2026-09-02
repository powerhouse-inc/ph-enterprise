export type IntegrationScopeRow = {
  label: string;
  value: string;
};

export type IntegrationEntry = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /**
   * The vendor's own wordmark, sized for a light surface. Optional: an
   * integration without a usable mark falls back to its name set in type.
   * width/height are the source viewBox, so callers set height and let the
   * width follow.
   */
  logo?: { src: string; width: number; height: number };
  /** What the integration is allowed to touch, in the order shown on the site. */
  scope: readonly IntegrationScopeRow[];
};

export const INTEGRATIONS: readonly IntegrationEntry[] = [
  {
    slug: "paperless-ngx",
    name: "Paperless-ngx",
    category: "Invoice automation",
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
  },
] as const;

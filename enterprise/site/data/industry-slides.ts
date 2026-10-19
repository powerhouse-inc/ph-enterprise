import type { IndustrySlide, SlideLogo } from "@/components/integration/industry-carousel";
import { getIntegration } from "@/data/integrations";
import { CTA_URL } from "@/lib/site";

/*
 * Shared by the homepage hero and the integrations hero, so the two carousels
 * never drift apart.
 */

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
export const INDUSTRY_SLIDES: readonly IndustrySlide[] = [
  {
    industry: "Operations",
    name: "Paperless-ngx",
    line: "Scans, emails and uploads land in one archive, then leave as typed invoice records.",
    href: "/integrations/paperless-ngx",
    logos: [recordLogo("paperless-ngx")],
  },
  {
    industry: "Manufacturing",
    name: "UMH",
    line: "Purchase orders become production ledgers the factory floor reports against.",
    href: "/integrations/umh",
    logos: [{ ...recordLogo("umh"), name: "UMH" }, recordLogo("paperless-ngx")],
  },
  {
    industry: "Operations",
    name: "Docling",
    line: "PDFs, scans and Office files become markdown, split at the author's own headings.",
    href: "/integrations/docling",
    logos: [recordLogo("docling")],
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

export const CANONICAL_SITE_URL = "https://enterprise.powerhouse.io";
export const BAI_SITE_URL = "https://bai.powerhouse.io";
export const BAI_ENGAGEMENT_URL = `${BAI_SITE_URL}/#contact`;
export const ASSESSMENT_EMAIL_URL =
  "mailto:hello@powerhouse.inc?subject=5-Day%20Assessment%20Request";

// Canonical CTA label. COPY_STANDARD.md's controlled-language rules require
// one verb phrase per action; every assessment CTA renders this string.
export const CTA_LABEL = "Request an assessment";

export const SITE_NAME = "Powerhouse Enterprise";
export const SITE_TITLE =
  "Powerhouse Enterprise - AI-Ready Workflow Software";
export const SITE_DESCRIPTION =
  "Turn workflows into software you own. Powerhouse gives sensitive, document-heavy workflows shared structure, permissions, and history, creating operational software that teams and AI can use safely.";

export function siteUrl() {
  // Until the canonical domain has DNS, absolute URLs (og:image, canonical,
  // sitemap) must point at the domain actually serving the site, or link
  // preview scrapers fail to fetch the image. VERCEL_PROJECT_PRODUCTION_URL
  // switches to the custom domain automatically once it is attached.
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : CANONICAL_SITE_URL);
  return url.replace(/\/$/, "");
}

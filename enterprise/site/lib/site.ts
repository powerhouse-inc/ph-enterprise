export const CANONICAL_SITE_URL = "https://enterprise.powerhouse.io";
export const BAI_SITE_URL = "https://bai.powerhouse.io";
export const BAI_ENGAGEMENT_URL = `${BAI_SITE_URL}/#contact`;
export const ASSESSMENT_EMAIL_URL =
  "mailto:hello@powerhouse.inc?subject=5-Day%20Assessment%20Request";

export const SITE_NAME = "Powerhouse Enterprise";
export const SITE_TITLE =
  "Powerhouse Enterprise - Owned AI Workflow Software";
export const SITE_DESCRIPTION =
  "Turn private, document-heavy workflows into AI powered software you own. Powerhouse is the open-source platform for structured workflow software with scoped AI assistance, human approval, and attributable history.";

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_SITE_URL).replace(
    /\/$/,
    "",
  );
}

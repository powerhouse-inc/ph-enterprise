import type { PrivacyFeature, TierItem } from "./types";

export const PRIVACY_FEATURES: PrivacyFeature[] = [
  {
    title: "Data residency",
    body: "All business data is stored on infrastructure you control. Self-host on your own servers, or deploy on Vetra Cloud with contractual data residency guarantees. No data replication to third-party systems unless you explicitly configure it.",
  },
  {
    title: "Immutable audit trail",
    body: "Every operation — human or AI — is cryptographically signed, timestamped, and appended to an immutable history. The audit trail is not a log; it is the data structure. Supports SOX, GDPR, and HIPAA compliance workflows when paired with your policies and third-party audit.",
  },
  {
    title: "Ready for what's coming",
    body: "The EU AI Act enters full enforcement on 2 August 2026 and requires transparency in AI-user interactions (Article 50), human oversight of consequential AI decisions (Article 14), data provenance tracking, and algorithmic accountability. Powerhouse's architecture supports these requirements: built-in transparency UI, immutable audit trails, scoped agent permissions, and human-in-the-loop by default.",
  },
  {
    title: "Data portability",
    body: "Your data is JSON. Your schemas are typed definitions you own. Your application code is TypeScript. If you leave, everything comes with you. The entire stack is open source.",
  },
];

export const TIER_ITEMS: TierItem[] = [
  {
    tier: "Local models",
    description:
      "For your most sensitive data: legal communications, personnel files, board financials, and trade secrets. Open-source models run on your hardware, inside your network.",
  },
  {
    tier: "Frontier commercial models",
    description:
      "For confidential work that can use redacted, summarized, or pre-approved data. The integration layer controls exactly what reaches the external model.",
  },
  {
    tier: "General-purpose models",
    description:
      "For non-confidential tasks like drafting, formatting, research, and translation.",
  },
];

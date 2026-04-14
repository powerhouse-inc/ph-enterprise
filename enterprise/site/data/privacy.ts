import type { PrivacyFeature, TierItem } from "./types";

export const PRIVACY_FEATURES: PrivacyFeature[] = [
  {
    title: "Data residency",
    body: "All business data is stored on infrastructure you control. Self-host on your own servers, or deploy on Vetra Cloud with contractual data residency guarantees. No data replication to third-party systems unless you explicitly configure it.",
  },
  {
    title: "Immutable audit trail",
    body: "Every operation — human or AI — is cryptographically signed, timestamped, and appended to an immutable history. The audit trail is not a log; it is the data structure. SOX, GDPR, HIPAA: compliance is structural, not retrofitted.",
  },
  {
    title: "Ready for what's coming",
    body: "The EU AI Act and emerging AI regulations will require transparency into AI decision-making, data provenance tracking, and algorithmic accountability. Powerhouse's architecture is structurally ready. Organizations adopting now won't need to retrofit when regulation arrives.",
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
      "For the most sensitive data — privileged legal communications, raw personnel files, board-level financials, trade secrets. Open-source models on your hardware. Nothing leaves your network.",
    accent: "#00D4FF",
  },
  {
    tier: "Frontier commercial models",
    description:
      "For less sensitive but still confidential work — operating on censored summaries, redacted extracts, or pre-approved data shapes. The integration layer controls what reaches the external model.",
    accent: "#7A3AFF",
  },
  {
    tier: "General-purpose models",
    description:
      "For non-confidential tasks — drafting, formatting, research, translation.",
    accent: "#F3F5F7",
  },
];

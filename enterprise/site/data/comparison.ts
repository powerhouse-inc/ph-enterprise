import type { ComparisonRow } from "./types";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Data privacy",
    legacy: "Default deployment processes customer data on vendor infrastructure",
    powerhouse: "Local deployment options keep data on customer infrastructure",
  },
  {
    dimension: "AI architecture",
    legacy: "Months of custom integration per system",
    powerhouse: "Structured data layer with built-in AI endpoints",
  },
  {
    dimension: "Agent control",
    legacy: "Prompt-based with unpredictable scope",
    powerhouse: "Specification-driven with sandboxed permissions",
  },
  {
    dimension: "Integration",
    legacy: "Point-to-point adapters with limited data scoping",
    powerhouse: "Standards-based with per-agent data isolation",
  },
  {
    dimension: "Time to value",
    legacy: "Typical 6–18 month integration projects",
    powerhouse: "Standards-based integration with rapid agent deployment",
  },
  {
    dimension: "Compliance",
    legacy: "Audit trails reconstructed after the fact",
    powerhouse: "Cryptographically signed, immutable history",
  },
  {
    dimension: "Regulatory readiness",
    legacy: "Compliance work needed when AI regulations arrive",
    powerhouse:
      "Architecture supports EU AI Act transparency requirements (Article 50).",
  },
  {
    dimension: "Vendor lock-in",
    legacy: "Multi-year contracts, proprietary formats",
    powerhouse: "Open source, JSON data, portable schemas",
  },
];

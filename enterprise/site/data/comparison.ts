import type { ComparisonRow } from "./types";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Data privacy",
    legacy: "Your data leaves your network for processing",
    powerhouse: "Data stays on your infrastructure — always",
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
    legacy: "Point-to-point adapters, no data scoping",
    powerhouse: "Standards-based with per-agent data isolation",
  },
  {
    dimension: "Time to value",
    legacy: "6–18 month integration projects",
    powerhouse: "Connect existing systems — agents work immediately",
  },
  {
    dimension: "Compliance",
    legacy: "Audit trails reconstructed after the fact",
    powerhouse: "Cryptographically signed, immutable history",
  },
  {
    dimension: "Regulatory readiness",
    legacy: "Retrofit required when AI regulations arrive",
    powerhouse: "Built for EU AI Act transparency requirements",
  },
  {
    dimension: "Vendor lock-in",
    legacy: "Multi-year contracts, proprietary formats",
    powerhouse: "Open source, JSON data, portable schemas",
  },
];

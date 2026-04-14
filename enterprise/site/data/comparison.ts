import type { ComparisonRow } from "./types";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Data privacy",
    legacy: "Business data sent to external AI services",
    powerhouse: "Data stays on your infrastructure; local models for sensitive workflows",
  },
  {
    dimension: "AI readiness",
    legacy: "Separate integration per system; months of work",
    powerhouse: "Structured data layer with AI endpoints from your business schemas",
  },
  {
    dimension: "Agent control",
    legacy: "Prompt-based; unpredictable scope",
    powerhouse: "Specification-driven; sandboxed permissions; full operation history",
  },
  {
    dimension: "Integration",
    legacy: "Point-to-point adapters, no data scoping",
    powerhouse: "Standards-based with built-in data isolation per agent and workflow",
  },
  {
    dimension: "Time to value",
    legacy: "6–18 month integration projects",
    powerhouse: "Connect existing systems, structure data, agents work immediately",
  },
  {
    dimension: "Compliance",
    legacy: "Audit trails reconstructed after the fact",
    powerhouse: "Cryptographically signed, immutable — the history is the data",
  },
  {
    dimension: "Regulatory readiness",
    legacy: "Retrofit required when AI regulations arrive",
    powerhouse: "Architecture already meets EU AI Act transparency requirements",
  },
  {
    dimension: "Vendor lock-in",
    legacy: "Multi-year contracts, proprietary formats",
    powerhouse: "Open source, JSON data, portable schemas",
  },
];

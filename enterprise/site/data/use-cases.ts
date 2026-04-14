import type { UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  {
    industry: "Legal",
    icon: "balance",
    color: "#00D4FF",
    summary:
      "Contract review, due diligence, compliance monitoring, matter management. AI agents that read and reason over privileged legal documents — on local models, on your servers.",
    capabilities: [
      "Multi-agent legal workflows",
      "Privileged document processing",
      "Full audit trail",
      "Regulator-defensible",
    ],
    baiLink: "https://bai.powerhouse.io",
    componentLink: { label: "See how Clint powers multi-agent legal workflows", href: "/clint" },
  },
  {
    industry: "HR",
    icon: "users",
    color: "#7A3AFF",
    summary:
      "Recruitment screening, employee records management, performance analysis, policy compliance. Personnel data stays on your infrastructure — never processed by external AI services.",
    capabilities: [
      "Scoped PII processing",
      "GDPR structural compliance",
      "Sandboxed agent access",
      "On-premise only",
    ],
    baiLink: "https://bai.powerhouse.io",
    componentLink: { label: "See how Renown governs identity and PII access", href: "/renown" },
  },
  {
    industry: "Procurement",
    icon: "file-text",
    color: "#00D4FF",
    summary:
      "Vendor evaluation, contract negotiation support, spend analysis, supplier risk assessment. Negotiation positions and pricing data are your most sensitive competitive assets — they stay on local models.",
    capabilities: [
      "Competitive data isolation",
      "Contract monitoring agents",
      "Sanitized external access",
      "Tiered model routing",
    ],
    baiLink: "https://bai.powerhouse.io",
    componentLink: { label: "See how Switchboard scopes data per integration", href: "/switchboard" },
  },
  {
    industry: "Finance",
    icon: "bar-chart",
    color: "#7A3AFF",
    summary:
      "Financial reporting, forecasting, expense management, audit preparation. Board-level financials processed by local AI models on your hardware. Every AI-assisted financial operation is audit-ready by default.",
    capabilities: [
      "Cryptographic audit trail",
      "SOX / GAAP compliance",
      "Agent exception flagging",
      "Immutable operation history",
    ],
    baiLink: "https://bai.powerhouse.io",
    componentLink: { label: "See how Connect provides audit-ready business modules", href: "/connect" },
  },
];

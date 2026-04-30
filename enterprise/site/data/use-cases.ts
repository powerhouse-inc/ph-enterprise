import type { UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  {
    industry: "Legal",
    icon: "balance",
    color: "#00D4FF",  // cyan
    summary:
      "Contract review, due diligence, compliance monitoring, matter management. AI agents that read and reason over privileged legal documents — on local models, on your servers.",
  },
  {
    industry: "HR",
    icon: "users",
    color: "#7A3AFF",  // purple
    summary:
      "Recruitment screening, employee records management, performance analysis, policy compliance. Personnel data stays on your infrastructure — never processed by external AI services.",
  },
  {
    industry: "Procurement",
    icon: "file-text",
    color: "#F2CB29",  // gold
    summary:
      "Vendor evaluation, contract negotiation support, spend analysis, supplier risk assessment. Negotiation positions and pricing data are your most sensitive competitive assets — they stay on local models.",
    href: "/procurement",
  },
  {
    industry: "Finance",
    icon: "bar-chart",
    color: "#21FFB4",  // green
    summary:
      "Financial reporting, forecasting, expense management, audit preparation. Board-level financials processed by local AI models on your hardware. Every AI-assisted financial operation is audit-ready by default.",
  },
];

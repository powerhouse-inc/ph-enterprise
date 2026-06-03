import type { UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  {
    industry: "Legal",
    icon: "balance",
    color: "#00D4FF", // cyan
    summary:
      "Contract review, due diligence, compliance monitoring, matter management. AI agents that read and reason over privileged legal documents — on local models, on your servers.",
    href: "/legal",
  },
  {
    industry: "HR",
    icon: "users",
    color: "#7A3AFF", // purple
    summary:
      "Personnel data management, policy compliance, HR records workflows. Personnel data stays on infrastructure you control — never processed by external AI services where local deployment is configured.",
    href: "/hr",
  },
  {
    industry: "Procurement",
    icon: "file-text",
    color: "#F2CB29", // gold
    summary:
      "Vendor evaluation workflows, contract negotiation support, spend analysis, supplier risk assessment. Negotiation positions and pricing data are sensitive competitive assets — local model processing keeps them on infrastructure you control where configured.",
    href: "/procurement",
  },
  {
    industry: "Finance",
    icon: "bar-chart",
    color: "#21FFB4", // green
    summary:
      "Financial reporting workflows, forecasting, expense management, audit preparation. Board-level financials processed by local AI models on your hardware where configured. AI-assisted financial operations are designed to support audit through cryptographically signed activity logs.",
    href: "/finance",
  },
];

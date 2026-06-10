import type { UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  {
    industry: "Legal",
    icon: "balance",
    color: "#00D4FF", // cyan
    summary:
      "Contract review, due diligence, compliance monitoring, and matter management. AI agents reason over privileged documents on models you run, so private material can stay within your control.",
    href: "/legal",
  },
  {
    industry: "HR",
    icon: "users",
    color: "#7A3AFF", // purple
    summary:
      "Personnel data management, policy compliance, and HR records workflows. With local deployment, sensitive employee data can sit on infrastructure you own rather than a vendor's.",
    href: "/hr",
  },
  {
    industry: "Procurement",
    icon: "file-text",
    color: "#F2CB29", // gold
    summary:
      "Vendor evaluation, negotiation support, spend analysis, and supplier risk assessment. With local deployment, your pricing and negotiation positions stay yours, not training data for someone else's model.",
    href: "/procurement",
  },
  {
    industry: "Finance",
    icon: "bar-chart",
    color: "#21FFB4", // green
    summary:
      "Financial reporting, forecasting, expense management, and audit preparation. AI-assisted steps are logged and cryptographically signed to support audit-ready reporting.",
    href: "/finance",
  },
];

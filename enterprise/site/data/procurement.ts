export type ProcurementParagraph = {
  body: string;
};

export type ProcurementStat = {
  value: string;
  label: string;
};

export type ProcurementProblem = {
  title: string;
  body: string;
};

export type ProcurementCapability = {
  title: string;
  body: string;
  icon: "bot" | "shield" | "cloud" | "bell";
};

export type ProcurementDocumentModel = {
  name: string;
  description: string;
};

export type ProcurementWorkflowFeature = {
  title: string;
  body: string;
};

export type ProcurementComparisonRow = {
  dimension: string;
  currentState: string;
  powerhouseState: string;
};

export type ProcurementRegulation = {
  title: string;
  body: string;
};

export type ProcurementCompetitor = {
  title: string;
  body: string;
};

export type ProcurementCta = {
  title: string;
  body: string;
  href: string;
  label: string;
  external?: boolean;
};

export const PROCUREMENT_BREADCRUMBS = [
  { label: "Enterprise Home", href: "/" },
  { label: "Proof", href: "/#proof" },
  { label: "Procurement" },
] as const;

export const PROCUREMENT_SECTION_LINKS = [
  { label: "Why local", href: "#why-local" },
  { label: "Workflow", href: "#workflow" },
  { label: "Compliance", href: "#compliance" },
  { label: "Get started", href: "#get-started" },
] as const;

export const PROCUREMENT_HERO = {
  eyebrow: "Procurement",
  headline: [
    "Your suppliers ship AI-generated proposals.",
    "You evaluate them by hand.",
  ] as const,
  subhead:
    "79% of supplier teams use AI to draft RFPs. Only 4% of procurement teams have meaningful AI on the evaluation side. The volume is up. The quality is harder to read. Your negotiation positions are too sensitive to send to commercial AI services. Powerhouse is the workflow layer that closes the asymmetry — locally, defensibly, on your data.",
  primaryCta: {
    label: "Map workflow with BAI",
    href: "https://bai.powerhouse.io/#contact",
    external: true,
  },
  secondaryCta: {
    label: "See the architecture",
    href: "/architecture",
  },
} as const;

export const PROCUREMENT_VOLUME_PARAGRAPHS: readonly ProcurementParagraph[] = [
  {
    body:
      "In 2023, 34% of supplier teams used GenAI to draft proposals. By late 2025, that number was 68%. By Q1 2026, it is 79%. Pure-AI entrants like AutogenAI went from zero to $36M ARR and a £1.4B valuation in under three years. Some enterprises now field 200+ RFPs per quarter, with AI auto-completing 70-90% of standard questions. The first incumbents are gone — Bidding Ltd in the UK wound down in 2025; the founders relaunched as an AI tool.",
  },
  {
    body:
      "The buyer side has not moved. 42% of CPOs rank RFP/RFQ generation as their top GenAI use case, but only 4% of procurement teams have meaningful AI deployed on the evaluation side. 54% of organizations report measurable pitch-volume increases — the median is +8 per month, +62% in Professional Services. Federal agencies have shipped triage tools such as GSA CALI, IRS AICDT, and Army DORA. Your team probably has not.",
  },
] as const;

export const PROCUREMENT_STATS: readonly ProcurementStat[] = [
  {
    value: "79%",
    label: "Suppliers using AI to write proposals (Loopio 2025/26)",
  },
  {
    value: "4%",
    label: "Buyers with meaningful AI on the evaluation side (Deloitte CPO 2025)",
  },
  {
    value: "$53B",
    label:
      "Gartner forecast for SCM plus agentic AI software by 2030, up from under $2B in 2025",
  },
  {
    value: "200+",
    label: "RFPs per quarter at large enterprises (Inventive.ai 2026)",
  },
] as const;

export const PROCUREMENT_PROBLEMS: readonly ProcurementProblem[] = [
  {
    title: "Pricing leaks become competitor signal",
    body:
      "Your floor price, your walk-away point, your concessions across vendors — pasted into a commercial AI service, this data may be retained, used for training, or exposed depending on the vendor's terms of service. Some commercial AI providers do not train on customer data by default; others do. The risk depends on the specific terms of the AI service you use.",
  },
  {
    title: "Supplier data is privileged",
    body:
      "Vendor pricing terms, capacity disclosures, and financial performance are often contractually confidential. Sending that material to a third-party API may breach confidentiality obligations depending on the specific contract and the AI service's data handling terms.",
  },
  {
    title: "Generic AI evaluations do not survive audit",
    body:
      "\"Commercial AI scored these vendors 3, 4, and 7\" is not a defensible procurement decision. Regulators increasingly require human oversight, audit trails, and decision traceability for AI-assisted evaluations.",
  },
] as const;

export const PROCUREMENT_CAPABILITIES: readonly ProcurementCapability[] = [
  {
    title: "Local triage of inbound proposals",
    body:
      "AI agents run on your hardware or your private cloud to triage incoming RFP responses against your evaluation criteria. Compliance checks, completeness scoring, and anomaly flagging happen before a human reviewer touches the proposal. Your scoring rubrics, your weights, your model choice. Suppliers do not see the agent, and your data stays on your infrastructure when configured for local deployment.",
    icon: "bot",
  },
  {
    title: "Vendor evaluation with audit trail",
    body:
      "Every AI-assisted scoring decision is logged with timestamp, author, and the underlying signal that drove it. Reviewers can drill from a final score into the agent reasoning and the supplier evidence. The audit trail is not bolted on — it is how the data is structured.",
    icon: "shield",
  },
  {
    title: "Sandboxed external access for general tasks",
    body:
      "Some procurement work does not require confidentiality — drafting standard RFP boilerplate, summarizing public market reports, or translating supplier responses. Powerhouse routes those tasks to commercial APIs through Switchboard with explicit data-scope policies. Sensitive workflows stay local. General tasks use the cloud. The boundary is enforced architecturally.",
    icon: "cloud",
  },
  {
    title: "Contract monitoring agents",
    body:
      "Once a contract is awarded, agents track delivery, milestone compliance, SLA breaches, and change orders against the negotiated terms. Exceptions are flagged for human review. Renewals get a 90-day heads-up with usage data and renegotiation positions pre-prepared.",
    icon: "bell",
  },
] as const;

export const PROCUREMENT_DOCUMENT_MODELS: readonly ProcurementDocumentModel[] = [
  {
    name: "RFP",
    description:
      "Request for proposal with structured questions, evaluation criteria, weights, and lifecycle states including DRAFT, OPEN, EVALUATING, AWARDED, and ARCHIVED.",
  },
  {
    name: "Vendor Response",
    description:
      "Supplier submissions with completeness flags, AI triage results, and human review state.",
  },
  {
    name: "Evaluation Scorecard",
    description:
      "Per-criterion scores with author attribution and supporting evidence.",
  },
  {
    name: "Vendor Profile",
    description:
      "Aggregated supplier intelligence spanning past performance, financial signals, and risk flags.",
  },
  {
    name: "Contract",
    description:
      "Awarded terms with milestone tracking, SLAs, and renewal triggers.",
  },
  {
    name: "Spend Analysis",
    description:
      "Period snapshots of category spend, vendor concentration, and savings tracking.",
  },
] as const;

export const PROCUREMENT_WORKFLOW_FEATURES: readonly ProcurementWorkflowFeature[] =
  [
    {
      title: "Drive app: Procurement Workspace",
      body:
        "A single workspace for active RFPs, in-flight evaluations, and contract monitoring.",
    },
    {
      title: "Real-time collaboration",
      body:
        "Your evaluation committee scores in parallel, with conflicts merged at the operation level.",
    },
    {
      title: "Approval gates",
      body:
        "RFP issuance, scoring thresholds, and contract award all require human sign-off.",
    },
    {
      title: "Operation history",
      body:
        "Every change is signed and immutable, so the audit trail is the data instead of a separate reporting layer.",
    },
  ] as const;

export const PROCUREMENT_COMPARISON_ROWS: readonly ProcurementComparisonRow[] = [
  {
    dimension: "Inbound triage",
    currentState:
      "Manual review of every proposal, regardless of completeness.",
    powerhouseState:
      "Local agent flags incomplete or non-compliant submissions before human review.",
  },
  {
    dimension: "Evaluation consistency",
    currentState:
      "Evaluators apply criteria differently and scores drift by reviewer.",
    powerhouseState:
      "Specification-driven scoring with full reviewer attribution and reasoning trail.",
  },
  {
    dimension: "Sensitive data exposure",
    currentState:
      "Pricing analysis gets pasted into commercial AI tools.",
    powerhouseState:
      "Local models run on your hardware, and competitive data never leaves your infrastructure.",
  },
  {
    dimension: "Audit defensibility",
    currentState:
      "Decision rationale is reconstructed later from inboxes and meeting notes.",
    powerhouseState:
      "Cryptographic operation history makes every decision auditable end-to-end.",
  },
  {
    dimension: "Vendor monitoring",
    currentState:
      "Quarterly check-ins catch missed SLA breaches after the fact.",
    powerhouseState:
      "Continuous agent monitoring flags exceptions in real time.",
  },
  {
    dimension: "Renewal preparation",
    currentState:
      "Teams scramble 30 days out with incomplete usage data.",
    powerhouseState:
      "A 90-day heads-up arrives with usage data and renegotiation positions prepared.",
  },
  {
    dimension: "Regulatory readiness",
    currentState:
      "EU AI Act and UK PPN 017 compliance work is added after the workflow ships.",
    powerhouseState:
      "The architecture supports EU AI Act and UK PPN 017 transparency, traceability, and human oversight requirements; engagement-specific compliance assessment still required.",
  },
] as const;

export const PROCUREMENT_REGULATIONS: readonly ProcurementRegulation[] = [
  {
    title: "EU AI Act — Art. 14 Human Oversight",
    body:
      "Powerhouse approval gates enforce human-in-the-loop checkpoints by design — the agent proposes, the human approves, and both are recorded in operation history.",
  },
  {
    title: "UK PPN 017 — AI Disclosure in Government Tenders",
    body:
      "Public-sector buyers and suppliers must disclose AI use in procurement processes. Powerhouse can generate the disclosure record directly from operation history instead of relying on manual after-the-fact reporting.",
  },
  {
    title: "EU AI Act — Art. 12 Logging",
    body:
      "Every AI-assisted decision is timestamped, attributed, and replayable. The cryptographic operation log is the audit log, so there is no separate compliance system to maintain.",
  },
] as const;

export const PROCUREMENT_COMPETITORS: readonly ProcurementCompetitor[] = [
  {
    title: "AutogenAI, Loopio, Responsive",
    body:
      "Best-in-class on the supplier side for drafting, auto-completion, and content libraries. They make your suppliers faster. They do not help you read what is coming in.",
  },
  {
    title: "Lazarus AI and RikAI",
    body:
      "Strong AI evaluation in federal and defense procurement. Powerful, but deeply scoped to public-sector source selection rather than commercial buyer workflows. The horizontal buyer-side SKU is still open.",
  },
  {
    title: "Generic GenAI assistants",
    body:
      "Copilot and ChatGPT Enterprise are designed primarily for general-purpose productivity work rather than specialized procurement workflows. For confidential pricing data, auditable evaluation flows, or specification-driven scoring, dedicated procurement infrastructure is typically needed.",
  },
] as const;

export const PROCUREMENT_CTAS: readonly ProcurementCta[] = [
  {
    title: "Map your procurement rollout",
    body:
      "Map your current procurement workflows, evaluate deployment boundaries, and identify the first buyer-side AI workflow to run on Powerhouse.",
    href: "mailto:hello@powerhouse.inc?subject=Procurement%20Workflow%20Planning",
    label: "Start planning",
  },
  {
    title: "Explore the platform",
    body:
      "See how Clint, Connect, Switchboard, and Renown work together for procurement teams.",
    href: "/architecture",
    label: "See the platform",
  },
  {
    title: "Request a demo",
    body:
      "See the procurement workspace with a real RFP evaluation flow running on local AI.",
    href: "https://bai.powerhouse.io/#contact",
    label: "Map workflow",
    external: true,
  },
] as const;

export const PROCUREMENT_FOOTER_HOOK =
  "Your suppliers ship AI. Your evaluators ship judgment. Powerhouse ships the workflow.";

export type IndustryReportSlug = "finance" | "legal" | "hr";

export type IndustryDriver = {
  title: string;
  body: string;
};

export type IndustryMetric = {
  value: string;
  label: string;
  source: string;
  sourceHref: string;
};

export type IndustrySource = {
  label: string;
  href: string;
};

export type IndustryReport = {
  slug: IndustryReportSlug;
  sector: string;
  eyebrow: string;
  accent: string;
  accentSoft: string;
  secondaryAccent: string;
  headline: string;
  subhead: string;
  snapshot: readonly [string, string];
  drivers: readonly [IndustryDriver, IndustryDriver, IndustryDriver];
  metrics: readonly [IndustryMetric, IndustryMetric, IndustryMetric];
  mandate: string;
  mandateLabel: string;
  primaryCtaLabel: string;
  metaDescription: string;
  sources: readonly IndustrySource[];
};

export const INDUSTRY_REPORTS = {
  finance: {
    slug: "finance",
    sector: "Finance",
    eyebrow: "2026 Finance Operations Report",
    accent: "#21FFB4",
    accentSoft: "rgba(33, 255, 180, 0.18)",
    secondaryAccent: "#00D4FF",
    headline: "Agentic finance is arriving before the control layer is ready.",
    subhead:
      "Finance teams are being asked to speed up month-end close, defend deposits, absorb private-market complexity, and prove every AI-assisted number without exporting regulated financial data.",
    snapshot: [
      "Finance enters 2026 with margin pressure, payment-system disruption, and AI moving from analyst copilot to governed agentic execution.",
      "The battleground is no longer dashboards: it is controlled automation across close, cash, credit, fraud, and board reporting.",
    ],
    drivers: [
      {
        title: "Agentic ERP leaves pilot mode",
        body:
          "Cloud ERP finance is shifting from GenAI query interfaces to agents for reconciliation, collections, controls monitoring, forecasting, and autonomous transaction processing.",
      },
      {
        title: "Tokenized money pressures deposits",
        body:
          "Stablecoins and tokenized deposits are becoming a board-level infrastructure question as banks decide whether to issue, custody, process, or partner.",
      },
      {
        title: "Private credit retailises",
        body:
          "Private credit is scaling past institutional channels into wealth products, forcing stronger liquidity, valuation, disclosure, and risk-data operating models.",
      },
    ],
    metrics: [
      {
        value: "30%",
        label:
          "faster financial close forecast for finance teams using cloud ERP with embedded AI assistants by 2028",
        source: "Gartner, 2026",
        sourceHref:
          "https://www.gartner.com/en/newsroom/press-releases/2026-02-24-gartner-predicts-embedded-ai-in-cloud-erp-applications-will-drive-a-30-percent-faster-financial-close-by-2028",
      },
      {
        value: "$2T+",
        label:
          "private credit AUM expected in 2026, expanding the volume of confidential data finance teams must monitor without exposing it to external AI tools",
        source: "Moody's, 2026",
        sourceHref:
          "https://www.moodys.com/web/en/us/insights/credit-risk/outlooks/private-credit-2026.html",
      },
      {
        value: "$250B -> $3.7T",
        label:
          "forecast range for payment stablecoins by 2030, creating new treasury, liquidity, fraud, and settlement workflows that need agentic monitoring without leaking financial data",
        source: "Deloitte, 2026",
        sourceHref:
          "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks/banking-industry-outlook.html",
      },
    ],
    mandate:
      "Build a governed finance operating layer across ERP, treasury, risk, and reporting. Sensitive close, forecast, credit, and audit workflows should run through scoped agents with approval gates, immutable logs, and explicit data-boundary policies before tokenized settlement and AI-enabled fraud change the control environment around them.",
    mandateLabel: "Bottom line for CFOs",
    primaryCtaLabel: "Assess finance AI readiness",
    metaDescription:
      "A concise 2026 finance operations report covering agentic ERP, stablecoins, private credit retailisation, and governed AI controls.",
    sources: [
      {
        label: "Deloitte 2026 Banking and Capital Markets Outlook",
        href:
          "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks/banking-industry-outlook.html",
      },
      {
        label: "Gartner Cloud ERP Finance AI Forecast",
        href:
          "https://www.gartner.com/en/newsroom/press-releases/2026-02-24-gartner-predicts-embedded-ai-in-cloud-erp-applications-will-drive-a-30-percent-faster-financial-close-by-2028",
      },
      {
        label: "Moody's Private Credit Outlook 2026",
        href:
          "https://www.moodys.com/web/en/us/insights/credit-risk/outlooks/private-credit-2026.html",
      },
      {
        label: "McKinsey Global Private Markets Report 2026",
        href:
          "https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-report/private-equity",
      },
    ],
  },
  legal: {
    slug: "legal",
    sector: "Legal",
    eyebrow: "2026 Legal Operations Report",
    accent: "#00D4FF",
    accentSoft: "rgba(0, 212, 255, 0.18)",
    secondaryAccent: "#F2CB29",
    headline: "Legal AI is moving from draft assist to governed execution.",
    subhead:
      "Law firms and legal departments are at an economic peak, but the operating model is being pulled apart by client pressure, agentic workflows, and high-risk AI rules for justice systems.",
    snapshot: [
      "Legal in 2026 is at an economic peak and an operating-model breakpoint: demand, rates, and profits are up while AI compresses junior work and reshapes client expectations.",
      "The shift is from GenAI assistants to agentic legal workflows that draft, compare, research, and route decisions under professional-responsibility controls.",
    ],
    drivers: [
      {
        title: "The firm model splits",
        body:
          "The market is moving toward tech-centric firms with AI-enabled pricing on one side and elite, partner-heavy advisory boutiques on the other.",
      },
      {
        title: "Agentic legal workflows emerge",
        body:
          "Agentic AI adoption is still early, but planning is broad; the next risk is not use, it is unsupervised autonomy inside privileged work.",
      },
      {
        title: "Justice AI becomes high-risk",
        body:
          "EU AI Act Annex III treats judicial AI used to research and interpret facts and law as high-risk, pushing documentation, oversight, and logging into the core workflow.",
      },
    ],
    metrics: [
      {
        value: "53.7%",
        label:
          "increase in Am Law 100 profits per lawyer since 2019 as the market enters a transformation cycle",
        source: "Thomson Reuters, 2026",
        sourceHref:
          "https://www.thomsonreuters.com/en/press-releases/2026/january/legal-industry-experiencing-tectonic-shift-technology-talent-and-demand-prompting-law-firms-to-evolve",
      },
      {
        value: "40%",
        label:
          "professional-services organizations using GenAI in 2026, nearly double the 22% reported in 2025",
        source: "Thomson Reuters, 2026",
        sourceHref:
          "https://www.thomsonreuters.com/en/reports/2026-ai-in-professional-services-report",
      },
      {
        value: "15% + 53%",
        label:
          "organizations already using agentic AI plus those planning or considering it",
        source: "Thomson Reuters, 2026",
        sourceHref:
          "https://www.thomsonreuters.com/en/reports/2026-ai-in-professional-services-report",
      },
    ],
    mandate:
      "Define matter-level AI boundaries before agents become default infrastructure. Privileged data should stay local, agents should operate from approved legal playbooks, and every AI-drafted clause, research path, risk flag, and review decision should be attributable, reviewable, and blocked from legal effect until a responsible lawyer approves it.",
    mandateLabel: "Bottom line for GCs and managing partners",
    primaryCtaLabel: "Assess legal AI readiness",
    metaDescription:
      "A concise 2026 legal operations report covering agentic legal workflows, AI governance, legal market economics, and EU AI Act exposure.",
    sources: [
      {
        label: "Thomson Reuters 2026 State of the US Legal Market",
        href:
          "https://www.thomsonreuters.com/en/press-releases/2026/january/legal-industry-experiencing-tectonic-shift-technology-talent-and-demand-prompting-law-firms-to-evolve",
      },
      {
        label: "Thomson Reuters 2026 AI in Professional Services",
        href:
          "https://www.thomsonreuters.com/en/reports/2026-ai-in-professional-services-report",
      },
      {
        label: "EU AI Act Implementation Timeline",
        href:
          "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
      },
      {
        label: "EU AI Act Annex III",
        href: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3",
      },
    ],
  },
  hr: {
    slug: "hr",
    sector: "HR",
    eyebrow: "2026 HR Operations Report",
    accent: "#A78BFA",
    accentSoft: "rgba(167, 139, 250, 0.2)",
    secondaryAccent: "#21FFB4",
    headline: "Skills, agents, and compliance now share one operating model.",
    subhead:
      "HR is moving from process automation to workforce architecture: skills intelligence, redeployment, culture, and AI governance are now the same leadership problem.",
    snapshot: [
      "HR in 2026 is moving from process automation to workforce architecture: skills, redeployment, culture, and AI governance have become the operating system for people decisions.",
      "Because employment AI is regulated as high risk, the CHRO's mandate is to turn HRIS data, skills intelligence, and AI agents into auditable human decisions.",
    ],
    drivers: [
      {
        title: "Skills-based architecture becomes mandatory",
        body:
          "AI is changing role boundaries faster than job architectures can absorb, forcing HR to manage skills, projects, redeployment, and learning as live operational data.",
      },
      {
        title: "Work design determines AI ROI",
        body:
          "Leaders see adaptability as critical, but few have redesigned human-AI interactions; unmanaged AI creates culture debt as quickly as it creates productivity claims.",
      },
      {
        title: "Employment AI enters high-risk governance",
        body:
          "Recruiting, candidate filtering, task allocation, promotion, termination, and performance evaluation are high-risk AI categories under EU AI Act Annex III.",
      },
    ],
    metrics: [
      {
        value: "39%",
        label:
          "organizations with AI adopted in HR functions; 62% use AI somewhere in the enterprise",
        source: "SHRM, 2026",
        sourceHref:
          "https://www.shrm.org/topics-tools/research/state-of-ai-hr-2026/full-report",
      },
      {
        value: "59/100",
        label:
          "workers projected to need reskilling or upskilling by 2030, with 120M+ at medium-term redundancy risk",
        source: "World Economic Forum, 2025",
        sourceHref:
          "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
      },
      {
        value: "98%",
        label:
          "executives planning organizational-design changes; 65% expect 11%-30% of the workforce to be redeployed or reskilled due to AI",
        source: "Mercer, 2026",
        sourceHref:
          "https://www.mercer.com/en-us/about/newsroom/mercer-s-global-talent-trends-2026-report/",
      },
    ],
    mandate:
      "Own the skills graph as governed infrastructure. Use AI for workforce intelligence and orchestration, but keep hiring, performance, promotion, redeployment, and termination behind explainable criteria, employee transparency, human sign-off, and immutable logs tied back to the HRIS.",
    mandateLabel: "Bottom line for CHROs",
    primaryCtaLabel: "Assess HR AI readiness",
    metaDescription:
      "A concise 2026 HR operations report covering skills-based architecture, AI in HR, workforce redesign, and EU AI Act employment compliance.",
    sources: [
      {
        label: "Deloitte 2026 Global Human Capital Trends",
        href:
          "https://www.deloitte.com/us/en/about/press-room/deloitte-report-winning-organizations-will-build-the-human-advantage.html",
      },
      {
        label: "Mercer Global Talent Trends 2026",
        href:
          "https://www.mercer.com/en-us/about/newsroom/mercer-s-global-talent-trends-2026-report/",
      },
      {
        label: "World Economic Forum Future of Jobs 2025",
        href:
          "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
      },
      {
        label: "SHRM State of AI in HR 2026",
        href:
          "https://www.shrm.org/topics-tools/research/state-of-ai-hr-2026/full-report",
      },
      {
        label: "EU AI Act Annex III",
        href: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3",
      },
    ],
  },
} as const satisfies Record<IndustryReportSlug, IndustryReport>;

export const INDUSTRY_REPORT_LIST = [
  INDUSTRY_REPORTS.finance,
  INDUSTRY_REPORTS.legal,
  INDUSTRY_REPORTS.hr,
] as const;

import type { SolutionPillar } from "./types";

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    title: "Private by default",
    accent: "cyan",
    body: "Business data stays on infrastructure you control. Local AI handles sensitive workflows; external APIs are used only where you authorize them. Confidential data processed locally is not transmitted to external systems and is not used for vendor training.",
  },
  {
    title: "AI-native from the data layer up",
    accent: "purple",
    body: "Your systems connect through a structured data layer with typed interfaces. AI agents operate within defined scopes, permissions, and workflows — coordinating across business functions without relying on open-ended prompts. Human approval is required for any consequential action by default, with configurable thresholds per workflow.",
  },
  {
    title: "Real-time and scalable",
    accent: "gradient",
    body: "Built on reactive architecture using event sourcing, CQRS, and event-driven processing. Business data syncs across users, apps, and devices in real time. Each object acts as its own consistency boundary, enabling scalable performance without centralized bottlenecks.",
  },
];

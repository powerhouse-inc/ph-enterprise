import type { SolutionPillar } from "./types";

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    title: "Private by default",
    accent: "cyan",
    body: "Your business data stays on your infrastructure. Local AI handles sensitive workflows, while external APIs are used only where appropriate. Confidential data never leaves your environment, is never used for training, and is never exposed to vendors.",
  },
  {
    title: "AI-native from the data layer up",
    accent: "purple",
    body: "Your systems connect through a structured data layer with typed interfaces. AI agents operate within defined scopes, permissions, and workflows — coordinating across business functions without relying on open-ended prompts. Human approval can be required for every autonomous action.",
  },
  {
    title: "Real-time and scalable",
    accent: "gradient",
    body: "Built on reactive architecture using event sourcing, CQRS, and event-driven processing. Business data syncs across users, apps, and devices in real time. Each object acts as its own consistency boundary, enabling scalable performance without centralized bottlenecks.",
  },
];

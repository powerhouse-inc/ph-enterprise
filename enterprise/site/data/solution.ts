import type { SolutionPillar } from "./types";

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    title: "Private by default",
    accent: "cyan",
    body: "Your business data stays on your infrastructure — always. AI models run locally on your hardware for sensitive workflows. Commercial APIs are available for general-purpose tasks, with architectural separation ensuring confidential data never reaches external services. No data is used for model training. No vendor ever sees your content.",
  },
  {
    title: "AI-native from the data layer up",
    accent: "purple",
    body: "Your existing business systems connect to a structured data layer through standards-based integrations. AI agents interact with your operations through typed interfaces: multi-agent workflows coordinate across business functions, each agent sandboxed to its own data scope and permissions. Specification-driven AI, not open-ended prompts. Every autonomous operation can require human approval.",
  },
  {
    title: "Real-time and scalable",
    accent: "gradient",
    body: "Built on a reactive architecture inspired by proven patterns: event sourcing, CQRS, event-driven processing. Business data synchronizes across devices, applications, and users in real-time. The write layer scales horizontally — each business object is an independent consistency boundary. Platform-grade performance without centralized infrastructure.",
  },
];

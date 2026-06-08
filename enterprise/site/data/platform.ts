import type { PlatformComponent } from "./types";

export const PLATFORM_COMPONENTS: PlatformComponent[] = [
  {
    name: "Clint",
    tagline: "AI Agent Infrastructure",
    description:
      "Define business processes as typed schemas; Clint generates an operator console, an MCP server, and a multi-agent harness — all from one codebase. Each agent runs sandboxed with scoped permissions. Supports local model deployment for confidential workflows. AI Act Article 50 transparency is built into every agent interaction: users are informed when interacting with AI, and AI-generated outputs are marked as machine-readable.",
    accent: "#00D4FF",
    href: "/clint",
    icon: "/logos/clint-icon.svg",
  },
  {
    name: "Fusion",
    tagline: "Enterprise Platform",
    description:
      "The modern replacement for your intranet portal. A branded internal platform where teams access business data, workflows, dashboards, and AI agent outputs. Customizable per business unit.",
    accent: "#F43E81",
    href: "/fusion",
    icon: "/logos/fusion-icon.svg",
  },
  {
    name: "Connect",
    tagline: "Operator Workspace",
    description:
      "The hands-on workspace for teams that work directly with business data. Browser-based, real-time collaboration on structured business objects. Operators and AI agents work on the same data with built-in human oversight.",
    accent: "#8D45FA",
    href: "/connect",
    icon: "/logos/connect-icon.svg",
  },
  {
    name: "Switchboard",
    tagline: "API & Integration",
    description:
      "Exposes every business operation as GraphQL and MCP endpoints. Connects to your existing systems through standards-based APIs. Each integration defines data scope and access boundaries.",
    accent: "#F2CB29",
    href: "/switchboard",
    icon: "/logos/switchboard-icon.svg",
  },
  {
    name: "Renown",
    tagline: "Identity for Agents & Users",
    description:
      "Unified identity for every actor in the system — human operators, AI agents, external integrations. Every action is attributed to a verified identity with defined permissions.",
    accent: "#21FFB4",
    href: "/renown",
    icon: "/logos/renown-icon.svg",
  },
];

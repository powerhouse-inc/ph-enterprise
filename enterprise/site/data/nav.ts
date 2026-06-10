import type { NavLink } from "./types";

export const NAV_LINKS: NavLink[] = [
  { href: "#problem", label: "The Challenge" },
  { href: "#solution", label: "How It Works" },
  { href: "#platform", label: "Platform" },
  { href: "#use-cases", label: "Industries" },
  { href: "/use-cases", label: "Use Cases", route: true },
  { href: "#privacy", label: "Privacy" },
];

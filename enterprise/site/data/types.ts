export type NavLink = {
  href: string;
  label: string;
  /** True when href is a route (use Next Link) rather than an in-page anchor. */
  route?: boolean;
};

export type SolutionPillar = {
  title: string;
  accent: "cyan" | "purple" | "gradient";
  body: string;
};

export type UseCase = {
  industry: string;
  icon: string;
  color: string;
  summary: string;
  href?: string;
};

export type PlatformComponent = {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  href: string;
};

export type ComparisonRow = {
  dimension: string;
  legacy: string;
  powerhouse: string;
};

export type PrivacyFeature = {
  title: string;
  body: string;
};

export type TierItem = {
  tier: string;
  description: string;
  accent: string;
};

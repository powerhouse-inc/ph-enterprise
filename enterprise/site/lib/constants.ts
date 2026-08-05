/** Brand colors — keep in sync with globals.css theme tokens. */
export const COLORS = {
  BRAND: "#24D7E8",
  PROOF: "#10B981",
  INK: "#0A0D10",
  PAPER: "#F5F2EC",
  BRAND_SHADOW: "rgba(36,215,232,0.28)",
  BRAND_GLOW_MID: "rgba(36,215,232,0.18)",
  BRAND_GLOW_FAINT: "rgba(36,215,232,0.10)",
} as const;

/** Reusable GSAP animation presets. */
export const TIMING = {
  HEADING_REVEAL: { duration: 0.9, ease: "power3.out" },
  LEDE_FADE: { duration: 0.7, delay: 0.15, ease: "power3.out" },
  LIST_STAGGER: { duration: 0.6, stagger: 0.09, ease: "power3.out" },
  FADE_UP: { duration: 0.75, ease: "power3.out" },
  HERO_WORD: { duration: 0.65, stagger: 0.055 },
} as const;

/** Common scroll trigger start positions. */
export const SCROLL_START = {
  HEADING: "top 85%",
  LEDE: "top 82%",
  LIST: "top 82%",
  FADE_UP: "top 88%",
} as const;

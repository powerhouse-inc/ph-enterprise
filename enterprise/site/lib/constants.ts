/** Brand colors — keep in sync with globals.css theme tokens. */
export const COLORS = {
  BRAND: "#00D4FF",
  BRAND_PURPLE: "#7A3AFF",
  BRAND_SHADOW: "rgba(0,212,255,0.75)",
  BRAND_GLOW_MID: "rgba(0,212,255,0.38)",
  BRAND_GLOW_FAINT: "rgba(0,212,255,0.15)",
  BRAND_BLOB: "rgba(0,212,255,0.14)",
  PURPLE_BLOB: "rgba(122,58,255,0.14)",
  PURPLE_GLOW: "rgba(122,58,255,0.10)",
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

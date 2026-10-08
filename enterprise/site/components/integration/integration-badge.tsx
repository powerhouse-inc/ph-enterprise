"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

/**
 * Port of the design system's IntegrationBadge
 * (powerhouse-enterprise-design-system/project/components/integrations).
 * Geometry and colours are copied from the source, not approximated: the
 * frame, the bolt cut-out and the + joints only line up at these values.
 */

export type IntegrationService = {
  name: string;
  /** Square mark. Falls back to a monogram tile. */
  logo?: string;
  /** Used when theme="dark"; falls back to `logo`. */
  logoDark?: string;
};

type Size = "xs" | "sm" | "md" | "lg";
type Theme = "light" | "dark";

// The Powerhouse icon's cut-out. The icon's two pieces are the frame colour,
// so only the bolt is painted, in the body colour.
const BOLT_PATH =
  "M29.5486 0L10.0889 16.1136C7.23454 18.4772 7.02695 22.7819 9.64066 25.4092L16.3729 32.1763C18.3481 34.1618 18.7755 37.2129 17.4218 39.6646L13.2337 47.25H16.86L37.2449 30.6239C40.1229 28.2765 40.3562 23.9617 37.7482 21.3177L30.6065 14.0772C28.6507 12.0945 28.2289 9.06288 29.5691 6.62154L33.2039 0Z";

const SIZES = {
  xs: { h: 24, r: 4, mark: 18, logo: 16, font: 11, gap: 5, ln: 3, joint: 16, plus: 8, frame: 1 },
  sm: { h: 28, r: 4.6, mark: 24, logo: 18, font: 13, gap: 6, ln: 4, joint: 18, plus: 9, frame: 1 },
  md: { h: 36, r: 5.5, mark: 30, logo: 24, font: 14, gap: 8, ln: 5, joint: 22, plus: 11, frame: 1 },
  lg: { h: 46, r: 6.5, mark: 38, logo: 32, font: 17, gap: 10, ln: 6, joint: 28, plus: 13, frame: 2 },
} as const;
type SizeSpec = (typeof SIZES)[Size];

const THEMES = {
  light: {
    nudge: 0,
    reliefLo: "#C9CBCC",
    reliefHi: "#FFFFFF",
    shadow: "0 1px 2px rgba(11,13,15,0.10), 0 4px 14px rgba(11,13,15,0.08)",
    frame: "#C9CBCC",
    bg: "#F6F7F8",
    text: "#0B0D0F",
    joint: "#F6F7F8",
  },
  dark: {
    nudge: 1,
    reliefLo: "#121418",
    reliefHi: "#2E3339",
    shadow: "0 1px 2px rgba(0,0,0,0.45), 0 4px 14px rgba(0,0,0,0.40)",
    frame: "#32373B",
    bg: "#1A1D22",
    text: "#F3F5F7",
    joint: "#1A1D22",
  },
} as const;
type ThemeSpec = (typeof THEMES)[Theme];

/**
 * Each part carries data-badge-part: 0 for the Powerhouse cap, then one per
 * service. Diagrams measure these to draw wires from the badge.
 */
export const BADGE_PART_ATTR = "data-badge-part";

function Cap({ side, pad, t }: { side: number; pad: number; t: ThemeSpec }) {
  return (
    <span data-badge-part={0} title="Powerhouse" style={{ padding: pad, flexShrink: 0, display: "flex" }}>
      {/* viewBox nudged 0.06 so the bolt's horizontal extent is centred. */}
      <svg viewBox="0.06 0 47.25 47.25" width={side} height={side} aria-hidden="true" style={{ display: "block" }}>
        <path d={BOLT_PATH} fill={t.bg} />
      </svg>
    </span>
  );
}

// Ring and + in one svg from the same centre, so the + is centred by geometry.
function JointDisc({ d, f, a, sw, t }: { d: number; f: number; a: number; sw: number; t: ThemeSpec }) {
  const c = d / 2;
  return (
    <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ display: "block", flexShrink: 0, overflow: "visible" }}>
      <circle cx={c} cy={c} r={c - f / 2} fill={t.joint} stroke={t.frame} strokeWidth={f} />
      <path d={`M${c} ${c - a}V${c + a}M${c - a} ${c}H${c + a}`} stroke={t.frame} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Groove divider: a 1px dark line with a 1px highlight cast beside it, so the
// layout width is the dark line alone and the + disc centres on it.
function Joint({ s, t }: { s: SizeSpec; t: ThemeSpec }) {
  return (
    <span
      aria-hidden="true"
      style={{ position: "relative", left: -t.nudge, width: 1, alignSelf: "stretch", flexShrink: 0, background: t.reliefLo, boxShadow: `1px 0 0 ${t.reliefHi}` }}
    >
      <span style={{ position: "absolute", top: 0, bottom: 0, left: `calc(50% + ${t.nudge}px)`, width: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <JointDisc d={s.joint - 1} f={s.frame} a={(s.plus * 7) / 24} sw={s.frame + 1} t={t} />
      </span>
    </span>
  );
}

export function IntegrationBadge({
  services,
  size = "md",
  theme = "light",
  showNames = true,
}: {
  services: readonly IntegrationService[];
  size?: Size;
  theme?: Theme;
  showNames?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const s = SIZES[size];
  const t = THEMES[theme];
  const f = s.frame;
  const R = s.r;
  const capPad = (s.h - s.mark) / 2 - f;
  // Edge -> logo and name -> edge is s.gap; next to a divider it is measured
  // from the + circle.
  const segPad = s.gap + (s.joint - 1) / 2;

  return (
    <div
      role="group"
      aria-label={`${services.map((x) => x.name).join(", ")}, a Powerhouse integration`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        height: s.h,
        boxSizing: "border-box",
        width: "fit-content",
        background: t.frame,
        borderRadius: R,
        padding: f,
        color: t.text,
        userSelect: "none",
        cursor: "default",
        boxShadow: hover ? "0 0 0 1px rgba(0,212,255,0.35), 0 8px 32px rgba(0,212,255,0.14)" : t.shadow,
        transition: "box-shadow .3s ease",
      }}
      className="font-sans"
    >
      <Cap side={s.mark} pad={capPad} t={t} />
      <span
        style={{
          display: "inline-flex",
          alignItems: "stretch",
          background: t.bg,
          borderRadius: `0 ${R - f}px ${R - f}px 0`,
          marginLeft: f - 1,
          boxShadow: `inset 1px 0 0 color-mix(in srgb, ${t.reliefLo} 50%, ${t.bg}), inset 2px 0 0 color-mix(in srgb, ${t.reliefHi} 50%, ${t.bg})`,
        }}
      >
        {services.map((svc, i) => {
          const first = i === 0;
          const last = i === services.length - 1;
          const logo = (theme === "dark" && svc.logoDark) || svc.logo;
          return (
            <Fragment key={svc.name}>
              {first ? null : <Joint s={s} t={t} />}
              <span
                data-badge-part={i + 1}
                title={svc.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: showNames ? s.ln : 0,
                  whiteSpace: "nowrap",
                  paddingLeft: first ? s.gap : segPad,
                  paddingRight: last ? s.gap : segPad,
                }}
              >
                {logo ? (
                  <Image
                    src={logo}
                    alt=""
                    width={s.logo}
                    height={s.logo}
                    draggable={false}
                    style={{ width: s.logo, height: s.logo, objectFit: "contain", display: "block", flexShrink: 0, pointerEvents: "none" }}
                  />
                ) : (
                  <span
                    style={{ width: s.logo, height: s.logo, borderRadius: 6, background: "rgba(128,128,128,0.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: s.font - 2, fontWeight: 600 }}
                  >
                    {svc.name.slice(0, 1)}
                  </span>
                )}
                {showNames ? (
                  <span style={{ fontSize: s.font, fontWeight: 500, letterSpacing: "-0.01em" }}>{svc.name}</span>
                ) : null}
              </span>
            </Fragment>
          );
        })}
      </span>
    </div>
  );
}

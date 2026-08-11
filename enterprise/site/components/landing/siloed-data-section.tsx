"use client";
// SiloedDataSection — "Current reality: Siloed data limits what AI can deliver."
// Left column: copy. Right column: diagram panel showing disconnected silos,
// fragments leaking to frontier models, and an unaccountable history ledger.
// Deliberately styled inline (own warm palette) rather than with theme tokens.

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

const INK = "oklch(0.337 0.006 214)";
const MUTED = "oklch(0.53 0.01 240)";
const BORDER = "oklch(0.882 0.002 247)";

function Reveal({
  children,
  style,
  delay = 0,
}: {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.opacity = "0";
    el.style.translate = "0 26px";
    el.style.transition = `opacity 0.65s ease ${delay}s, translate 0.65s ease ${delay}s`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            target.style.opacity = "1";
            target.style.translate = "0 0";
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

const miniCard = (rotate: number): CSSProperties => ({
  width: "100%",
  borderRadius: 8,
  background: "#faf7ee",
  border: "1px solid rgba(92,82,60,0.16)",
  boxShadow: "0 3px 8px rgba(92,82,60,0.16)",
  padding: "8px 9px",
  boxSizing: "border-box",
  transform: `rotate(${rotate}deg)`,
});
const cardLabel: CSSProperties = {
  fontSize: 8.5,
  fontWeight: 700,
  color: "#8a8272",
};
const bar = (
  width: CSSProperties["width"],
  bg: string,
  mt: number,
): CSSProperties => ({
  width,
  height: 4,
  borderRadius: 2,
  background: bg,
  marginTop: mt,
});
const siloBox: CSSProperties = {
  position: "relative",
  border: "1.5px solid rgba(92,82,60,0.3)",
  borderRadius: 12,
  background: "rgba(92,82,60,0.06)",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 7,
};
const siloLabel: CSSProperties = { fontSize: 10, color: "rgba(92,82,60,0.7)" };
const point: CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: "-0.01em",
};
const pointDesc: CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.6,
  color: MUTED,
  marginTop: 6,
  textWrap: "pretty",
};

const LockIcon = ({
  size = 10,
  color = "#a67c36",
  open = true,
}: {
  size?: number;
  color?: string;
  open?: boolean;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d={open ? "M7 11V7a5 5 0 0 1 9.9-1" : "M7 11V7a5 5 0 0 1 10 0v4"} />
  </svg>
);
const SparkleIcon = ({
  size = 13,
  color = "#a67c36",
  strokeWidth = 2,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none" }}
    aria-hidden="true"
  >
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
  </svg>
);

const HISTORY: { text: string; dot: string; fade?: boolean }[] = [
  { text: "Changed by · unknown", dot: "rgba(92,82,60,0.35)" },
  { text: "Source · missing", dot: "rgba(92,82,60,0.28)" },
  { text: "Approval · not recorded", dot: "rgba(92,82,60,0.22)", fade: true },
];

export function SiloedDataSection() {
  return (
    <section
      id="problem"
      className="relative z-10 rounded-t-[40px]"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#faf9f7",
        color: INK,
        padding: "96px 32px 48px",
      }}
    >
      <div
        className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16"
      >
        {/* Copy column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(34px, 4.5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Siloed data limits
            <br />
            what AI can deliver.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.6,
              color: MUTED,
              textWrap: "pretty",
            }}
          >
            Critical processes are spread across documents, spreadsheets,
            inboxes, and legacy systems. Without shared structure and controls,
            AI lacks the context needed to work reliably.
          </p>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
            <div style={{ padding: "20px 0", borderTop: `1px solid ${BORDER}` }}>
              <div style={point}>AI works from fragments</div>
              <div style={pointDesc}>
                Documents, spreadsheets, emails, and system records rarely
                provide one complete, trusted view of the workflow.
              </div>
            </div>
            <div style={{ padding: "20px 0", borderTop: `1px solid ${BORDER}` }}>
              <div style={point}>Sensitive data crosses unclear boundaries</div>
              <div style={pointDesc}>
                Confidential information can be copied into external AI tools
                before access, storage, and approval policies are established.
              </div>
            </div>
            <div style={{ padding: "20px 0 0", borderTop: `1px solid ${BORDER}` }}>
              <div style={point}>Decisions are difficult to audit</div>
              <div style={pointDesc}>
                Teams need to know which source, person, model, or rule changed
                the state of the work.
              </div>
            </div>
          </div>
        </div>

        {/* Diagram panel */}
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            background: "#fff",
            border: `1px solid ${BORDER}`,
            boxShadow: "0 2px 12px rgba(52,56,57,0.1)",
            overflow: "hidden",
            padding: "26px 28px 28px",
          }}
        >
          {/* Silos */}
          <Reveal
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: 14,
              marginTop: 6,
            }}
          >
            {/* Finance system (spans both rows) */}
            <div
              style={{
                ...siloBox,
                gridRow: "1 / span 2",
                border: "1.5px solid rgba(166,124,54,0.5)",
                background: "rgba(166,124,54,0.07)",
                padding: "12px 10px",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <div style={miniCard(-2)}>
                <div style={cardLabel}>Receipts</div>
                <div style={bar("64%", "#e0dac9", 6)} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <div style={bar("32%", "#e8e3d4", 0)} />
                  <div style={{ fontSize: 7.5, fontWeight: 700, color: "#6f6857" }}>
                    $182.40
                  </div>
                </div>
              </div>
              <div style={miniCard(2)}>
                <div style={cardLabel}>Invoices</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 3,
                    marginTop: 6,
                    height: 16,
                  }}
                >
                  <div style={{ background: "#e0dac9", borderRadius: 1.5 }} />
                  <div style={{ background: "#e8e3d4", borderRadius: 1.5 }} />
                  <div style={{ background: "#e0dac9", borderRadius: 1.5 }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, ...siloLabel }}>
                Finance system
                <LockIcon />
              </div>
            </div>
            {/* Claim status */}
            <div style={siloBox}>
              <div style={miniCard(-1)}>
                <div style={cardLabel}>Claim status</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                  <div style={bar("40%", "#e0dac9", 0)} />
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "2px 5px",
                      borderRadius: 4,
                      background: "#f1e6c8",
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#b98f3e",
                      }}
                    />
                    <div style={{ fontSize: 7, fontWeight: 700, color: "#8a6a25" }}>
                      In review
                    </div>
                  </div>
                </div>
              </div>
              <div style={siloLabel}>Legacy tracker</div>
            </div>
            {/* Emails */}
            <div style={siloBox}>
              <div
                style={{
                  position: "absolute",
                  top: -9,
                  left: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 7px",
                  borderRadius: 5,
                  background: "#efeaf6",
                  border: "1px solid rgba(122,58,255,0.3)",
                }}
              >
                <SparkleIcon size={9} color="#9d83ce" strokeWidth={2.2} />
                <span style={{ fontSize: 8.5, fontWeight: 700, color: "#9d83ce" }}>
                  AI
                </span>
              </div>
              <div style={miniCard(1)}>
                <div style={cardLabel}>Emails</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 6 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#d3cbe4",
                      flex: "none",
                    }}
                  />
                  <div style={bar("56%", "#e0dac9", 0)} />
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 5 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#c8d3de",
                      flex: "none",
                    }}
                  />
                  <div style={bar("40%", "#e8e3d4", 0)} />
                </div>
              </div>
              <div style={siloLabel}>Inbox</div>
            </div>
          </Reveal>

          {/* No accountable history */}
          <Reveal delay={0.15} style={{ position: "relative", marginTop: 24 }}>
            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(92,82,60,0.22)",
                background: "rgba(92,82,60,0.05)",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 11,
                fontSize: 11.5,
                color: "rgba(92,82,60,0.6)",
              }}
            >
              {HISTORY.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    maskImage: h.fade
                      ? "linear-gradient(90deg, #000 50%, transparent)"
                      : undefined,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: h.dot,
                      flex: "none",
                    }}
                  />
                  {h.text}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "rgba(92,82,60,0.65)", marginTop: 10 }}>
              No accountable history of who changed what
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

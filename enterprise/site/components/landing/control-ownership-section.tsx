"use client";
// ControlOwnershipSection — "Control and ownership: Control is visible in the workflow."
// Deliberately styled inline (own warm palette) rather than with theme tokens,
// matching SiloedDataSection. The product shots overlap: the dark document-history
// view at 78% width, the RFP record with provenance pinned over its bottom-right.

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const INK = "oklch(0.337 0.006 214)";
const MUTED = "oklch(0.53 0.01 240)";
const BORDER = "oklch(0.882 0.002 247)";

const MAIN_SHOT = "/product/doc-history-revisions.png"; // viewable, verifiable document history
const DETAIL_SHOT = "/usecases/rfp-hub/03-rfp-detail-provenance.png"; // structured RFP record with provenance

function Reveal({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.opacity = "0";
    el.style.translate = "0 26px";
    el.style.transition = "opacity 0.65s ease, translate 0.65s ease";
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
  }, []);
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

// Screenshot frame with resting 3D tilt that eases flat + lifts on hover.
// Stacking order is fixed (zIndex prop) so the pair never flips over each other.
function TiltFrame({
  children,
  restTransform,
  zIndex,
  style,
}: {
  children: ReactNode;
  restTransform: string;
  zIndex?: number;
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
        transition: "transform 0.45s ease, box-shadow 0.45s ease",
        willChange: "transform",
        transform: hover
          ? "rotateX(0deg) rotateY(0deg) translateY(-6px) scale(1.012)"
          : restTransform,
        zIndex,
        ...style,
        // boxShadow below wins over style.boxShadow on hover
        boxShadow: hover
          ? "1px 4px 15px rgba(52,56,57,0.25), 0 2px 10px 2px rgba(122,58,255,0.2)"
          : (style?.boxShadow ?? "0 2px 12px rgba(52,56,57,0.1)"),
      }}
    >
      {children}
    </div>
  );
}

const POINTS = [
  {
    title: "Access is scoped to the workflow",
    desc: "Objects, roles, and approval state define who or what can see, change, or route work.",
  },
  {
    title: "Ownership stays portable",
    desc: "Data, schemas, exports, and workflow state remain inspectable and usable outside a single vendor surface.",
  },
  {
    title: "Approvals stay human-readable",
    desc: "Exceptions, review state, and operator decisions are part of the record rather than buried in inboxes.",
  },
  {
    title: "History remains attributable",
    desc: "Source links, exports, status changes, and provenance are visible as first-class product surfaces.",
  },
];

export function ControlOwnershipSection() {
  return (
    <section
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#faf9f7",
        color: INK,
        padding: "48px 32px 96px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div
          style={{
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(34px, 4.5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Control is visible
            <br />
            in the workflow.
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
            Powerhouse turns access, storage, approvals, exports, and history
            into product surfaces your team can inspect and operate.
          </p>
        </div>

        {/* Overlapping screenshot pair */}
        <Reveal style={{ marginTop: 48 }}>
          <div
            style={{ position: "relative", paddingBottom: 96, perspective: 1600 }}
          >
            <TiltFrame
              restTransform="rotateX(2deg) rotateY(-3deg)"
              style={{
                width: "78%",
                background: "#0d0d0d",
                boxShadow: "0 2px 12px rgba(52,56,57,0.1)",
                position: "relative",
              }}
            >
              <Image
                src={MAIN_SHOT}
                alt="Powerhouse product screenshot showing a verifiable document history with signed revisions and commit timestamps."
                width={2992}
                height={1730}
                sizes="(min-width: 1100px) 810px, 78vw"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </TiltFrame>
            <TiltFrame
              restTransform="rotateX(2deg) rotateY(4deg)"
              zIndex={1}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "44%",
                aspectRatio: "16 / 10",
                background: "#fff",
                boxShadow: "1px 4px 15px rgba(52,56,57,0.25)",
              }}
            >
              <Image
                src={DETAIL_SHOT}
                alt="Powerhouse product screenshot showing a structured RFP record with provenance, application context, dates, and source links."
                fill
                sizes="(min-width: 1100px) 458px, 44vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </TiltFrame>
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: MUTED,
              marginTop: 16,
              maxWidth: 720,
            }}
          >
            A verifiable document history, alongside a structured RFP record
            with provenance, application context, dates, and source links.
          </div>
        </Reveal>

        {/* Four points */}
        <Reveal style={{ marginTop: 56 }}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((p) => (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingTop: 18,
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: MUTED,
                    textWrap: "pretty",
                  }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";
// ControlOwnershipSection — "Control and ownership: Control is visible in the workflow."
// Deliberately styled inline (own warm palette) rather than with theme tokens,
// matching SiloedDataSection. The product shots overlap: the offering editor at
// 78% width, its annotated revision history pinned over the bottom-right. Both
// show the same OperationalHubOffering document. The annotated history is a
// static export of the design_handoff_product_shot composition (1600x1000 @2x).

import Image from "next/image";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const INK = "oklch(0.337 0.006 214)";
const MUTED = "oklch(0.53 0.01 240)";
const BORDER = "oklch(0.882 0.002 247)";

const MAIN_SHOT = "/product/offering-pricing-tiers.png"; // service offering editor with pricing tiers
const DETAIL_SHOT = "/product/doc-history-annotated.png"; // annotated verifiable document history
const DETAIL_ALT =
  "Powerhouse document history with a highlighted signed revision linked to its operation payload, signer address, and signature verification details.";

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

// Full-size viewer for the annotated history shot. Same portal pattern as the
// signup modal: fixed overlay, closed by backdrop click, Escape, or the X.
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[300] grid place-items-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 cursor-zoom-out bg-black/75 backdrop-blur-sm"
      />
      <div className="relative z-10">
        <Image
          src={src}
          alt={alt}
          width={3200}
          height={2000}
          sizes="92vw"
          className="h-auto max-h-[88svh] w-auto max-w-[92vw] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white/85 backdrop-blur-sm transition-colors hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
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
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
                alt="Powerhouse product screenshot showing a service offering with pricing tiers, billing cycles, and configured service groups."
                width={2992}
                height={1728}
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
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="View the document history detail at full size"
                className="group/zoom"
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={DETAIL_SHOT}
                  alt={DETAIL_ALT}
                  fill
                  sizes="(min-width: 1100px) 458px, 44vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="absolute right-2.5 bottom-2.5 flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/zoom:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
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
            A service offering document and its verifiable revision history,
            with signed operations and inspectable payloads.
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

      {lightboxOpen ? (
        <Lightbox
          src={DETAIL_SHOT}
          alt={DETAIL_ALT}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </section>
  );
}

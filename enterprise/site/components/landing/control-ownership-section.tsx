"use client";
// ControlOwnershipSection — "Agents work inside the rules. Every change is on the record."
// The answer to the problem section, on the page's own example: claim #4821
// (the hero's record). Beside the claim's rules, its operation history, newest
// first: the AI agent's line items, Maya's review, the agent's attempt to set
// the claim Final, refused by rule 2, Wouter's correction of the hotel line and
// his approval. Operation types and statuses are the real powerhouse/expense-report
// model's. Below, a thumbnail opens the real product's signed revision history.

import Image from "next/image";
import { createPortal } from "react-dom";
import { Check, Maximize2, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const INK = "#111614";
const MUTED = "#59625D";
const BORDER = "rgba(17, 22, 20, 0.14)";

const DETAIL_SHOT = "/product/doc-history.png"; // annotated verifiable document history, flat background
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
    el.style.translate = "0 12px";
    el.style.transition = "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), translate 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
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

const RULES = [
  { n: "1", text: "Line items add up to the total" },
  { n: "2", text: "Only an approver sets the claim to Final" },
  { n: "3", text: "A Final claim is read-only" },
];

/** Newest first. `refused` names the rule that stopped the operation; it never reaches the signed history. */
const HISTORY: { index?: string; type: string; detail: string; who: string; at: string; refused?: string }[] = [
  { index: "06", type: "SET_STATUS", detail: "FINAL", who: "Wouter K", at: "10:04" },
  { index: "05", type: "UPDATE_LINE_ITEM", detail: "Hotel €321.00 → €312.00", who: "Wouter K", at: "10:02" },
  { type: "SET_STATUS", detail: "FINAL", who: "AI agent", at: "09:16", refused: "2" },
  { index: "04", type: "SET_STATUS", detail: "REVIEW", who: "Maya L", at: "09:15" },
  { index: "03", type: "ADD_LINE_ITEM", detail: "3 receipts", who: "AI agent", at: "09:13" },
];

const POINTS = [
  {
    title: "Agents act through operations",
    desc: "Each workflow step declares the operations it may dispatch. Nothing else reaches the record.",
  },
  {
    title: "Rules refuse, with the reason",
    desc: "A change that breaks the claim's rules is rejected. The agent gets the same answer a person would.",
  },
  {
    title: "Every change has an author",
    desc: "Each history entry names the operation, the time, and the actor: a person or an agent.",
  },
];

/** Claim #4821's rules beside its operation history: the rails, and what happened on them. */
function ClaimRails() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
      <div className="rounded-xl border border-border-light bg-paper px-5 py-5">
        <p className="text-[15px] leading-5 font-medium text-copy">Rules on claim #4821</p>
        <p className="mt-1 font-mono text-[12px] leading-4 text-copy-muted">powerhouse/expense-report</p>
        <ol className="mt-5 space-y-3">
          {RULES.map((rule) => (
            <li key={rule.n} className="grid grid-cols-[22px_minmax(0,1fr)] items-baseline gap-2 text-[15px] leading-6 text-copy">
              <span className="font-mono text-[12px] text-copy-muted tabular-nums">{rule.n}</span>
              {rule.text}
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-border-light pt-4 text-[13px] leading-5 text-copy-muted">
          Rules 1 and 3 belong to the document model. Rule 2 is an operation permission set by an administrator.
        </p>
      </div>

      <div className="rounded-xl border border-border-light bg-paper px-5 py-5">
        <p className="flex items-baseline justify-between gap-4 text-[15px] leading-5 text-copy">
          <span className="font-medium">Operation history</span>
          <span className="text-[13px] text-copy-muted">6 signed · 1 refused</span>
        </p>
        <ol className="mt-4 font-mono text-[12px] leading-5">
          {HISTORY.map((op) => (
            <li
              key={`${op.type}-${op.at}`}
              className="grid grid-cols-[22px_minmax(0,1fr)_auto_18px] items-center gap-3 border-t border-border-light py-2.5 sm:grid-cols-[22px_minmax(0,1fr)_auto_40px_18px]"
            >
              <span className="text-copy-muted tabular-nums">{op.index ?? "–"}</span>
              <span className="min-w-0">
                <span className={op.refused ? "text-copy-muted line-through" : "text-copy"}>{op.type}</span>{" "}
                <span className={op.refused ? "text-copy-muted line-through" : "text-copy-muted"}>{op.detail}</span>
                {op.refused ? (
                  <span className="mt-0.5 block font-sans text-[13px] font-medium text-copy">
                    Refused by rule {op.refused}: only an approver sets Final
                  </span>
                ) : null}
              </span>
              <span className={op.who === "AI agent" ? "font-medium text-copy" : "text-copy-muted"}>{op.who}</span>
              <span className="text-copy-muted tabular-nums max-sm:hidden">{op.at}</span>
              {op.refused ? (
                <X className="h-4 w-4 text-copy" strokeWidth={2} aria-label="Refused" />
              ) : (
                <Check className="h-4 w-4 text-proof" strokeWidth={1.75} aria-label="Signed" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function ControlOwnershipSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#FBF9F4",
        color: INK,
        padding: "80px 32px",
        borderTop: `1px solid ${BORDER}`,
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
          <h2 className="font-heading text-[clamp(32px,3.6vw,48px)] leading-[1.1] font-medium tracking-[-0.02em]" style={{ margin: 0 }}>
            Agents work inside the rules.
            <br />
            Every change is on the record.
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
            On claim #4821 the AI agent drafts the line items. Powerhouse checks each change against the
            claim&apos;s rules, refuses what they forbid, and signs what they allow.
          </p>
        </div>

        {/* The claim's rules and what happened on them, then the real product's history */}
        <Reveal style={{ marginTop: 48 }}>
          <ClaimRails />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="View the signed revision history in the product at full size"
              className="group/zoom relative w-full shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-border-light bg-ink sm:w-[220px]"
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image src={DETAIL_SHOT} alt={DETAIL_ALT} fill sizes="(min-width: 640px) 220px, 92vw" style={{ objectFit: "cover" }} />
              <span className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/55 text-white/85">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>
            <p className="max-w-[560px] text-[14px] leading-[1.55] text-copy-muted">
              The same history in the product: each revision is a signed operation, with its payload, its signer, and
              the signature check open for inspection.
            </p>
          </div>
        </Reveal>

        {/* Three points */}
        <Reveal style={{ marginTop: 56 }}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
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
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
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

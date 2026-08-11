"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { cn } from "@/lib/utils";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

type Hotspot = {
  id: string;
  label: string;
  body: string;
  /** Horizontal position of the marker, as a percentage of the artwork width. */
  x: number;
  /** Vertical position of the marker, as a percentage of the artwork height. */
  y: number;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "model",
    label: "Document model",
    body: "Invoice is one typed document model in the Powerhouse namespace. The schema defines what a valid record looks like, rather than a spreadsheet convention held in someone's head.",
    x: 44.5,
    y: 29.7,
  },
  {
    id: "parties",
    label: "Sender and receiver identity",
    body: "Issuer and payer details share one schema, so names, tax registration, and addresses can be validated and matched against records you already hold.",
    x: 44,
    y: 43.5,
  },
  {
    id: "lines",
    label: "Line item details",
    body: "Quantity, rate, and amount are typed per line, so totals follow from the model and every change to a charge is attributable.",
    x: 71,
    y: 57.6,
  },
  {
    id: "approvals",
    label: "Approval history",
    body: "Approved, draft, and rejected are states on the record, and the queues above are views over the same objects. Review status travels with the document instead of living in an inbox.",
    x: 72,
    y: 33,
  },
  {
    id: "totals",
    label: "Derived totals",
    body: "Subtotal and tax are computed from the line items rather than typed in, which removes a common source of silent error.",
    x: 39,
    y: 84.6,
  },
  {
    id: "identity",
    label: "Identity and signing",
    body: "Renown binds an operator action to a verifiable identity, so approvals and exports stay attributable after the fact.",
    x: 13.5,
    y: 62.5,
  },
  {
    id: "history",
    label: "History and export",
    body: "Undo, timeline, and export are product surfaces. Provenance stays inspectable, and the data leaves in a format you own.",
    x: 34.5,
    y: 26.2,
  },
];

export function AppAnatomySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUpInScope(sectionRef);

  const panelId = useId();
  /** Set while pointing at or focusing a marker. Takes priority over the pinned marker. */
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /** Set by clicking a marker, so the callout survives the pointer leaving. */
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const activeId = hoveredId ?? pinnedId ?? HOTSPOTS[0].id;
  const activeIndex = HOTSPOTS.findIndex((spot) => spot.id === activeId);
  const active = HOTSPOTS[activeIndex] ?? HOTSPOTS[0];

  const clear = () => setHoveredId(null);

  return (
    <section
      ref={sectionRef}
      id="app-anatomy"
      className="border-t border-border-light bg-paper py-20 text-copy"
    >
      <SectionContainer>
        <SectionHeading
          className="fade-up mb-14"
          title={
            <>
              A form is only
              <br className="max-sm:hidden" /> the interface.
            </>
          }
          lead="This invoice application is powered by a typed document model. Approval states, identities, calculations, history, and exports are part of the application, not conventions held in a spreadsheet or someone's head."
        />

        <div
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_296px] lg:gap-10"
          onMouseLeave={clear}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              clear();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setPinnedId(null);
              clear();
              // Keep the focus ring and the highlighted marker in agreement.
              (document.activeElement as HTMLElement | null)?.blur();
            }
          }}
        >
          <figure className="fade-up relative m-0">
            <div className="relative overflow-visible rounded-2xl border border-border-light bg-paper-soft p-2 sm:p-4">
              <div className="relative">
                <Image
                  src="/product/invoice-app-anatomy.png"
                  alt="Powerhouse invoice application shown as an exploded layout: an invoice form with issuer and payer fields, approval state badges, a line item table with quantity, rate, and amount, totals, payment method, a Renown wallet connection panel, and paid, drafts, and rejected queues."
                  width={1840}
                  height={1439}
                  sizes="(min-width: 1024px) 940px, 100vw"
                  className="h-auto w-full select-none"
                />

                {HOTSPOTS.map((spot, index) => {
                  const isActive = spot.id === active.id;

                  return (
                    <div
                      key={spot.id}
                      className="absolute h-0 w-0"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-controls={panelId}
                        onMouseEnter={() => setHoveredId(spot.id)}
                        onFocus={() => setHoveredId(spot.id)}
                        onClick={() => setPinnedId(spot.id)}
                        className={cn(
                          "absolute left-1/2 top-1/2 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[9px] font-semibold tabular-nums ring-2 ring-white/95 transition-[transform,background-color,opacity] duration-200 sm:h-6 sm:w-6 sm:text-[10px]",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copy",
                          isActive
                            ? "scale-110 bg-brand text-copy shadow-[0_3px_14px_rgba(17,22,20,0.34)]"
                            : "bg-copy text-paper opacity-70 shadow-[0_2px_10px_rgba(17,22,20,0.28)] hover:opacity-100",
                        )}
                      >
                        <span aria-hidden="true">{index + 1}</span>
                        <span className="sr-only">{spot.label}</span>
                      </button>

                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 motion-safe:animate-ping sm:h-6 sm:w-6"
                        />
                      ) : null}

                    </div>
                  );
                })}
              </div>
            </div>

            <figcaption className="mt-4 text-[13px] leading-[1.6] text-copy-muted">
              Powerhouse invoice application. Select a marker to inspect what
              each part of the record does.
            </figcaption>
          </figure>

          <div className="fade-up">
            <div
              id={panelId}
              role="status"
              aria-live="polite"
              className="grid rounded-2xl border border-border-light bg-white p-5"
            >
              {/*
                All descriptions are stacked in the same grid cell and only the
                active one is visible, so the panel keeps the height of the
                tallest entry. Without this the box resizes on every hover and
                the list below it jumps.
              */}
              {HOTSPOTS.map((spot, index) => {
                const isActive = spot.id === active.id;

                return (
                  <div
                    key={spot.id}
                    aria-hidden={!isActive}
                    className={cn(
                      "col-start-1 row-start-1",
                      !isActive && "invisible",
                    )}
                  >
                    <p className="mb-2 text-[11px] font-medium tabular-nums text-copy-muted">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(HOTSPOTS.length).padStart(2, "0")}
                    </p>
                    <p className="font-heading text-[17px] font-semibold leading-[1.3] text-copy">
                      {spot.label}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.7] text-copy-muted">
                      {spot.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <ul className="mt-4 divide-y divide-border-light border-y border-border-light">
              {HOTSPOTS.map((spot, index) => {
                const isActive = spot.id === active.id;

                return (
                  <li key={spot.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls={panelId}
                      onMouseEnter={() => setHoveredId(spot.id)}
                      onFocus={() => setHoveredId(spot.id)}
                      onClick={() => setPinnedId(spot.id)}
                      className={cn(
                        "flex w-full items-center gap-3 py-3 text-left text-[14px] transition-colors",
                        isActive
                          ? "text-copy"
                          : "text-copy-muted hover:text-copy",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums transition-colors",
                          isActive
                            ? "bg-brand text-copy"
                            : "border border-border-light bg-paper-soft text-copy-muted",
                        )}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      {spot.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

"use client";

import * as React from "react";
import { translateAlong, type Point3 } from "@/components/iso/iso-kit";
import { LabelOverlay, type LabelSpot } from "../labels";
import { StepList } from "../step-list";
import { useTour } from "../use-tour";
import { POINTS, beatAt, type Part } from "./model";
import { HEIGHT, P, WIDTH } from "./view";

/*
 * Runs the problem figure, a point at a time. 01 lights the four places the
 * claim lives, then the outside AI tool with the two it holds; 02 pastes the
 * receipt and the amounts across to it; 03 changes the status with nothing
 * written in the log. Reduced motion: each point is one still frame.
 */

const DURATIONS = POINTS.map((point) => point.duration);
const ARC = 30; // how high a pasted copy rises above the straight line
const FLIGHT = 1.8;
const COPY_STARTS = [0.3, 2.4];
const LIFT = 5;
// Reduced motion, point 02: both copies held mid-air on their way to empty slots.
const HELD = [0.8, 0.68];

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const fine = (value: number) => Math.round(value * 100) / 100;

/** A copy's progress along its flight and its opacity: in at the start, out as it reaches the slot. */
function flight(t: number, start: number) {
  const s = clamp01((t - start) / FLIGHT);
  if (t < start || s >= 1) return { e: s >= 1 ? 1 : 0, opacity: 0 };
  return { e: ease(s), opacity: Math.min(ease(s / 0.12), 1 - ease((s - 0.86) / 0.14)) };
}

interface Layers {
  back: React.ReactNode[];
  card: React.ReactNode;
  front: React.ReactNode[];
  copies: React.ReactNode[];
  last: React.ReactNode[];
}

export function FragmentsLive({
  label,
  labels,
  flights,
  layers,
  intro,
}: {
  label: string;
  labels: readonly LabelSpot[];
  flights: readonly Point3[];
  layers: Layers;
  intro?: React.ReactNode;
}) {
  const anchor = React.useRef<HTMLDivElement>(null);
  const plate = React.useRef<HTMLDivElement>(null);
  const list = React.useRef<HTMLOListElement>(null);
  const cardRef = React.useRef<SVGGElement>(null);
  const shown = React.useRef({ item: -1, lit: "", text: "", slots: "", paid: false, missing: false });

  const write = React.useCallback(
    (item: number, t: number, calm: boolean) => {
      const root = plate.current;
      if (!root) return;
      const point = POINTS[item]!;
      const beat = calm ? point.still : beatAt(point, t);
      const s = shown.current;

      // Pose: the copies in flight, the slots they fill, the status card.
      const copies = flights.map((_, index) => {
        if (item !== 1) return { e: 0, opacity: 0 };
        return calm ? { e: HELD[index]!, opacity: 1 } : flight(t, COPY_STARTS[index]!);
      });
      const slots = item === 1 ? COPY_STARTS.map((start) => !calm && t > start + FLIGHT * 0.9) : [true, true];
      const paid = item === 2 && (calm || t > 0.9);
      const lift = item === 2 && !calm ? LIFT * Math.sin(Math.PI * clamp01((t - 0.3) / 1.2)) : 0;
      const missing = item === 2 && (calm || t > 1.9);

      root.querySelectorAll<SVGGElement>("[data-copy]").forEach((node) => {
        const index = Number(node.dataset.copy);
        const { e, opacity } = copies[index]!;
        const by = flights[index]!;
        node.setAttribute("transform", translateAlong(P, [by[0] * e, by[1] * e, by[2] * e + ARC * Math.sin(Math.PI * e)]));
        node.setAttribute("opacity", String(fine(opacity)));
      });
      cardRef.current?.setAttribute("transform", translateAlong(P, [0, 0, lift]));

      const slotKey = slots.map(Number).join("");
      if (slotKey !== s.slots) {
        s.slots = slotKey;
        root.querySelectorAll<SVGGElement>("[data-chip]").forEach((node) => {
          if (slots[Number(node.dataset.chip)]) node.setAttribute("data-filled", "");
          else node.removeAttribute("data-filled");
        });
      }
      if (paid !== s.paid) {
        s.paid = paid;
        if (paid) root.setAttribute("data-paid", "");
        else root.removeAttribute("data-paid");
      }
      if (missing !== s.missing) {
        s.missing = missing;
        if (missing) root.setAttribute("data-missing", "");
        else root.removeAttribute("data-missing");
      }

      const litKey = [...beat.lit].sort().join(" ");
      if (litKey !== s.lit) {
        s.lit = litKey;
        const lit = new Set<string>(beat.lit as readonly Part[]);
        root.querySelectorAll<SVGGElement>("[data-part]").forEach((group) => {
          const on = lit.has(group.dataset.part!);
          group.querySelectorAll(".iso-solid").forEach((node) => (on ? node.setAttribute("data-lit", "") : node.removeAttribute("data-lit")));
        });
        root.querySelectorAll<SVGElement>("[data-key]").forEach((node) => {
          if (lit.has(node.dataset.key!)) node.setAttribute("data-on", "");
          else node.removeAttribute("data-on");
        });
      }
      if (item !== s.item) {
        s.item = item;
        root.setAttribute("data-active", String(item + 1));
        root.setAttribute("data-tone", point.tone);
      }
      const text = `${point.num} · ${beat.readout}`;
      if (text !== s.text) {
        s.text = text;
        const slot = root.querySelector("[data-readout]");
        if (slot) slot.textContent = text;
      }
    },
    [flights],
  );

  const { active, choose, handlers } = useTour({ durations: DURATIONS, write, anchor, list });

  return (
    <div ref={anchor} className="fig-root" data-layout="list-left" {...handlers}>
      {intro ? <div className="fig-copy">{intro}</div> : null}
      <div ref={plate} className="iso-plate fig-plate fig-ink fr-plate" data-active="1" data-tone="cyan">
        <div className="fig-stage">
          <svg className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label} focusable="false">
            {layers.back}
            <g ref={cardRef}>{layers.card}</g>
            {layers.front}
            {layers.copies}
            {layers.last}
          </svg>
          <LabelOverlay spots={labels} />
        </div>
        <div className="fig-readout" data-readout="" aria-hidden="true">
          {`${POINTS[0]!.num} · ${POINTS[0]!.beats[0]!.readout}`}
        </div>
      </div>
      <StepList items={POINTS} active={active} onChoose={choose} listRef={list} />
    </div>
  );
}

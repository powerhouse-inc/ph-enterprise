import * as React from "react";
import type { Flat } from "@/components/iso/iso-kit";

/*
 * Labels on a figure: text in clear space at the end of a right-angled
 * leader from the part, with an optional numbered pin. The leader and the
 * dot on the part are SVG, so they scale with the drawing; the text is HTML,
 * so it stays crisp and readable at any size.
 */

export interface LabelSpec {
  /** Key into the figure's anchor points. */
  anchor: string;
  text: string;
  /** Screen units up (negative) or down from the part, then across. */
  rise: number;
  run: number;
  /** Which side of the leader's end the text sits on. */
  align: "left" | "right";
  /** The legend item this label belongs to: shows its number as a pin. */
  item?: number;
}

export interface LabelSpot {
  text: string;
  align: "left" | "right";
  item?: number;
  left: number;
  top: number;
  pinLeft: number;
  pinTop: number;
}

const tenth = (value: number) => Math.round(value * 10) / 10;

export function buildLabels(specs: readonly LabelSpec[], anchors: Record<string, Flat>, width: number, height: number) {
  const spots: LabelSpot[] = specs.map((spec) => {
    const [ax, ay] = anchors[spec.anchor]!;
    return {
      text: spec.text,
      align: spec.align,
      item: spec.item,
      left: ((ax + spec.run) / width) * 100,
      top: ((ay + spec.rise) / height) * 100,
      pinLeft: (ax / width) * 100,
      pinTop: (ay / height) * 100,
    };
  });
  const leaders = (
    <g key="leaders" className="fig-leaders" aria-hidden="true">
      {specs.map((spec) => {
        const [ax, ay] = anchors[spec.anchor]!;
        const ly = ay + spec.rise;
        const lx = ax + spec.run - (spec.run < 0 ? -3 : 3);
        return (
          <g key={spec.text} data-item={spec.item}>
            <path className="fig-leader" d={`M${tenth(ax)} ${tenth(ay)}V${tenth(ly)}H${tenth(lx)}`} />
            <circle className="fig-leader-dot" cx={tenth(ax)} cy={tenth(ay)} r={1.7} />
          </g>
        );
      })}
    </g>
  );
  return { spots, leaders };
}

const pinText = (item: number) => String(item).padStart(2, "0");

/** The HTML half of the labels: text, pins, and the phone-only pins on the parts. */
export function LabelOverlay({ spots }: { spots: readonly LabelSpot[] }) {
  return (
    <div className="fig-labels" aria-hidden="true">
      {spots.map((spot) => (
        <span
          key={spot.text}
          className="fig-label"
          data-item={spot.item}
          data-align={spot.align}
          style={{ left: `${spot.left}%`, top: `${spot.top}%` }}
        >
          {spot.item ? <span className="fig-pin">{pinText(spot.item)}</span> : null}
          <span className="fig-label-text">{spot.text}</span>
        </span>
      ))}
      {spots
        .filter((spot) => spot.item)
        .map((spot) => (
          <span
            key={`pin-${spot.text}`}
            className="fig-pin fig-pin-solo"
            data-item={spot.item}
            style={{ left: `${spot.pinLeft}%`, top: `${spot.pinTop}%` }}
          >
            {pinText(spot.item!)}
          </span>
        ))}
    </div>
  );
}

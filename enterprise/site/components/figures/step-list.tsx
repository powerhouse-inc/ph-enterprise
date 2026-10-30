"use client";

import * as React from "react";

/*
 * The legend that drives a figure: one button per item. A click, tap or
 * keyboard focus selects an item. The active item shows a progress line
 * (the --fig-progress custom property, written by the figure's loop).
 */

export interface StepItem {
  num: string;
  title: string;
  body: string;
  notes?: readonly string[];
  tone: "cyan" | "green";
}

export function StepList({
  items,
  active,
  onChoose,
  listRef,
  accordion = false,
  row = false,
}: {
  items: readonly StepItem[];
  active: number;
  onChoose: (index: number) => void;
  listRef: React.RefObject<HTMLOListElement | null>;
  /** Desktop: open only the active item, so a long list fits beside the plate. */
  accordion?: boolean;
  /** Desktop: the items side by side, under a full-width plate. */
  row?: boolean;
}) {
  return (
    <ol ref={listRef} className="fig-steps" data-accordion={accordion ? "" : undefined} data-row={row ? "" : undefined}>
      {items.map((item, index) => (
        <li key={item.num} data-tone={item.tone}>
          <button
            type="button"
            aria-pressed={active === index}
            onFocus={() => onChoose(index)}
            onClick={() => onChoose(index)}
          >
            <span className="fig-step-head">
              <span className="fig-step-num">{item.num}</span>
              <span className="fig-step-title">{item.title}</span>
            </span>
            <span className="fig-step-more">
              <span className="fig-step-inner">
                <span className="fig-step-body">{item.body}</span>
                {item.notes?.map((note) => (
                  <span key={note} className="fig-step-note">
                    {note}
                  </span>
                ))}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

import type * as React from "react";
import "@/components/iso/iso.css";
import "./fragments.css";
import { FragmentsDrawing } from "./art";
import { CAPTION, POINTS } from "./model";

/**
 * The problem, drawn: expense claim #4821 spread across four tools on one
 * desk (Gmail, a spreadsheet, Slack, a legacy tracker), an outside AI tool
 * holding copies of two of the pieces, and a change log nobody writes in.
 * `intro` is the heading and lead; the section's three points sit beside
 * the drawing. Static: server-rendered, no script.
 */
export function FragmentsFigure({ intro }: { intro?: React.ReactNode }) {
  return (
    <div className="fr-root">
      {intro ? <div className="fr-copy">{intro}</div> : null}
      <figure className="fr-figure iso" data-theme="light">
        <div className="fr-drawing">
          <FragmentsDrawing />
        </div>
        <figcaption className="fr-caption">{CAPTION}</figcaption>
      </figure>
      <ul className="fr-points">
        {POINTS.map((point) => (
          <li key={point.title}>
            <p className="fr-point-title">{point.title}</p>
            <p className="fr-point-body">{point.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

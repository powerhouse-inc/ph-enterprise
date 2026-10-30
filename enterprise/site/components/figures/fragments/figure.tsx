import type * as React from "react";
import "@/components/iso/iso.css";
import "../figure-shared.css";
import "./fragments.css";
import { FragmentsArt } from "./art";
import { CAPTION, CLAIM, PIECES, SEEN } from "./model";

/**
 * The problem, drawn: expense claim #4821 spread across four tools on one
 * desk (Gmail, a spreadsheet, Slack, a legacy tracker), an outside AI tool
 * holding pasted copies of two of the pieces, and a log book nobody writes
 * in. The section's three points sit beside it as its legend; `intro` is the
 * copy above them.
 */
export function FragmentsFigure({ intro }: { intro?: React.ReactNode }) {
  return (
    <figure className="fr-figure iso" data-theme="light">
      <FragmentsArt
        intro={intro}
        label={`An isometric drawing of one desk holding expense claim ${CLAIM.slice(1)} in ${PIECES.length} places: the receipt in a Gmail inbox tray, the amounts in a spreadsheet on a monitor, the approval in a Slack thread on a tablet, and the status on a card in a legacy filing cabinet. An open log book has ruled columns and no entries. Off the desk, an outside AI tool on its own stand holds pasted copies of the receipt and the amounts, ${SEEN} of the ${PIECES.length} pieces.`}
      />
      <figcaption className="sr-only">{CAPTION}</figcaption>
    </figure>
  );
}

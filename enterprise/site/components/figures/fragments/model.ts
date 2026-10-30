import type { LabelSpec } from "../labels";
import type { StepItem } from "../step-list";

/*
 * The facts the problem figure states: one expense claim, #4821, in four
 * places (the receipt in Gmail, the amounts in a spreadsheet, the approval in
 * Slack, the status in a legacy tracker), an outside AI tool that holds two
 * of the four as pasted copies, and an operations log nobody writes in.
 */

export const CLAIM = "#4821";
export const PLACES = ["Gmail", "a spreadsheet", "Slack", "a legacy tracker"] as const;
export const PIECES = ["receipt", "amounts", "approval", "status"] as const;
export const SEEN = 2;

/** The parts a beat lights: each is a `data-part` group in the drawing. */
export type Part = "inbox" | "sheet" | "chat" | "tracker" | "kiosk" | "log" | "copy0" | "copy1";

export interface Beat {
  /** Seconds into the point at which the beat starts. */
  at: number;
  readout: string;
  lit: readonly Part[];
}

export interface Point extends StepItem {
  duration: number;
  beats: readonly Beat[];
  /** Reduced motion: the one still frame shown for the point. */
  still: Beat;
}

const today = (piece: string, place: string) => `Claim ${CLAIM}: ${piece} in ${place}`;

/** The section's three points, as the figure's legend. */
export const POINTS: readonly Point[] = [
  {
    num: "01",
    title: "AI improvises from fragments",
    body: "With the claim spread over four tools and a prompt, an agent guesses the process. The same claim can take a different path each time.",
    tone: "cyan",
    duration: 6.6,
    beats: [
      { at: 0, readout: today(PIECES[0], PLACES[0]), lit: ["inbox"] },
      { at: 1.2, readout: today(PIECES[1], PLACES[1]), lit: ["sheet"] },
      { at: 2.4, readout: today(PIECES[2], PLACES[2]), lit: ["chat"] },
      { at: 3.6, readout: today(PIECES[3], PLACES[3]), lit: ["tracker"] },
      { at: 4.8, readout: `The AI tool sees ${SEEN} of ${PIECES.length} pieces`, lit: ["inbox", "sheet", "kiosk"] },
    ],
    still: { at: 0, readout: `Claim ${CLAIM} in ${PIECES.length} places · the AI tool sees ${SEEN}`, lit: ["inbox", "sheet", "kiosk"] },
  },
  {
    num: "02",
    title: "Nothing holds AI to the rules",
    body: "No business rule stands between the AI tool and the data. Receipts and amounts get pasted outside, with no access policy.",
    tone: "cyan",
    duration: 6.0,
    beats: [
      { at: 0, readout: "Receipt pasted into an outside AI tool", lit: ["inbox", "copy0"] },
      { at: 2.2, readout: "Amounts pasted in too", lit: ["sheet", "copy1"] },
      { at: 4.4, readout: "Copies outside, no access policy", lit: ["kiosk"] },
    ],
    still: { at: 0, readout: "Receipt and amounts pasted into an outside AI tool", lit: ["kiosk", "copy0", "copy1"] },
  },
  {
    num: "03",
    title: "No one can say what changed the work",
    body: "When the claim is marked paid, nothing records which person, agent, model, or rule changed it.",
    tone: "cyan",
    duration: 5.4,
    beats: [
      { at: 0, readout: "Status changed to paid", lit: ["tracker"] },
      { at: 1.9, readout: "By which agent, under which rule? No record", lit: ["log"] },
    ],
    still: { at: 0, readout: "Status changed to paid · no record of who", lit: ["tracker", "log"] },
  },
];

/** The beat a point is in at time t. */
export function beatAt(point: Point, t: number): Beat {
  let current = point.beats[0]!;
  for (const beat of point.beats) if (t >= beat.at) current = beat;
  return current;
}

/** Labels on the drawing. The four pieces are plain; one pinned label answers each point. */
export const LABELS: readonly LabelSpec[] = [
  { anchor: "status", text: "Status · legacy tracker", rise: -46, run: 14, align: "left" },
  { anchor: "amounts", text: "Amounts", rise: -82, run: -14, align: "right" },
  { anchor: "receipt", text: "Receipt", rise: 122, run: -14, align: "right" },
  { anchor: "approval", text: "Approval", rise: 122, run: -14, align: "right" },
  { anchor: "sees", item: 1, text: "AI tool sees 2 of 4", rise: -275, run: -14, align: "right" },
  { anchor: "outside", item: 2, text: "Pasted outside, no access policy", rise: 63, run: -14, align: "right" },
  { anchor: "log", item: 3, text: "No record of who changed what", rise: 52, run: -47, align: "right" },
];

export const CAPTION = `Expense claim ${CLAIM} as it lives today: the receipt in a Gmail inbox, the amounts in a spreadsheet, the approval in a Slack thread and the status on a card in a legacy filing cabinet, all on one desk. An outside AI tool on its own stand holds pasted copies of ${SEEN} of the ${PIECES.length} pieces. When the status changes to paid, the log book beside them stays empty.`;

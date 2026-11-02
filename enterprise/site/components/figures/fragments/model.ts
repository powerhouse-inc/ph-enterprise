/*
 * The facts the problem figure states: one expense claim, #4821, in four
 * places (the receipt in Gmail, the amounts in a spreadsheet, the approval in
 * Slack, the status in a legacy tracker), an outside AI tool that holds two
 * of the four as pasted copies, and a change log nobody writes in.
 */

export const CLAIM = "#4821";
export const PLACES = ["Gmail", "a spreadsheet", "Slack", "a legacy tracker"] as const;
export const PIECES = ["receipt", "amounts", "approval", "status"] as const;
export const SEEN = 2;

export interface Point {
  title: string;
  body: string;
}

/** The section's three points, listed beside the drawing. */
export const POINTS: readonly Point[] = [
  {
    title: "AI improvises from fragments",
    body: "With the claim spread over four tools and a prompt, an agent guesses the process. The same claim can take a different path each time.",
  },
  {
    title: "Nothing holds AI to the rules",
    body: "No business rule stands between the AI tool and the data. Receipts and amounts get pasted outside, with no access policy.",
  },
  {
    title: "No one can say what changed the work",
    body: "When the claim is marked paid, nothing records which person, agent, model, or rule changed it.",
  },
];

export const TITLE = `Expense claim ${CLAIM} spread across four tools`;

export const DESC = `One desk holds expense claim ${CLAIM} in ${PIECES.length} places: the receipt in a Gmail inbox tray, the amounts in a spreadsheet, the approval in a Slack thread and the status card, marked paid, in a legacy filing cabinet; an outside AI tool on its own table holds copies of ${SEEN} of the ${PIECES.length} pieces, and the change log beside them has no entry for the change.`;

/** Shown under the drawing on phones, where the tags give way. */
export const CAPTION = `Claim ${CLAIM}: the receipt in a Gmail inbox, the amounts in a spreadsheet, the approval in a Slack thread, the status in a legacy tracker. The AI tool on its own table sees ${SEEN} of the ${PIECES.length} pieces; the change log has no entries.`;

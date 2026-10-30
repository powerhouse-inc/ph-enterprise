import { PIECE_COUNT } from "@/data/integrations";
import type { LabelSpec } from "../labels";
import type { StepItem } from "../step-list";

/*
 * The workflow figure's facts: one Powerhouse workflow, built from pieces
 * on Activepieces, that turns a QuickBooks receipt into a typed claim
 * record, lets a local model fill the amounts, waits for a person to
 * approve, and updates the claim's status. Every step is logged.
 */

export const LEDGER = [
  "Receipt received · QuickBooks",
  "Claim record created · Workflow",
  "Amounts extracted · Local model",
  "Batch approved · Wouter K",
  "Claim #4821 status updated · Approval Team",
] as const;

export interface Step extends StepItem {
  readout: string;
  duration: number;
}

/** The section's five steps, as the figure's legend: step n runs act n. */
export const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Connect existing systems",
    body: "Start from the documents, spreadsheets, inboxes, and legacy systems already carrying the work.",
    notes: [`${PIECE_COUNT} integrations, with industry-specific extensions.`],
    tone: "cyan",
    readout: "New receipt · QuickBooks",
    duration: 4.0,
  },
  {
    num: "02",
    title: "Structure the workflow",
    body: "Model the objects, approvals, permissions, exceptions, and data history behind the process.",
    notes: ["You control which users and what systems access your data."],
    tone: "cyan",
    readout: "Claim record · 4 typed fields",
    duration: 4.0,
  },
  {
    num: "03",
    title: "Add scoped AI assistance",
    body: "Use AI to extract, compare, draft, flag, and route work inside the approved workflow boundary.",
    notes: [
      "Local models: confidential financial data, approved operators only",
      "Frontier models: claim status and non-confidential correspondence",
    ],
    tone: "cyan",
    readout: "Amounts extracted · local model",
    duration: 4.6,
  },
  {
    num: "04",
    title: "Keep human approval",
    body: "Operators approve, reject, or revise important actions with the right context in front of them. Here, an operator approves the batch claim and updates the claim status.",
    tone: "green",
    readout: "Batch approved · Wouter K",
    duration: 4.4,
  },
  {
    num: "05",
    title: "Retain attributable history",
    body: "Every source, rule, model output, and human decision remains inspectable as the workflow evolves.",
    tone: "green",
    readout: "Printing the record",
    duration: 4.2,
  },
];

/** Labels on the drawing, each pinned to its step. */
export const LABELS: readonly LabelSpec[] = [
  { anchor: "catalogue", item: 1, text: `${PIECE_COUNT} connectors`, rise: -50, run: 14, align: "left" },
  { anchor: "log", item: 5, text: "Every step, logged", rise: -30, run: 14, align: "left" },
  { anchor: "record", item: 2, text: "Typed claim record", rise: 62, run: -12, align: "right" },
  { anchor: "ai", item: 3, text: "Local model, scoped to this step", rise: 80, run: -12, align: "right" },
  { anchor: "approval", item: 4, text: "Human approval", rise: 96, run: -12, align: "right" },
  { anchor: "boundary", text: "Your boundary", rise: 40, run: -12, align: "right" },
];

export const CAPTION = `A Powerhouse workflow built from pieces, on a board inside a rim: your boundary. A receipt arrives from QuickBooks, one of ${PIECE_COUNT} connectors in the catalogue tray; a typed claim record takes its fields; a local model under a glass hood extracts the amounts; the run waits at a gate until a person approves; the claim's status is updated, and each step is logged on the panel behind.`;

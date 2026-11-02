import { PIECE_COUNT } from "@/data/integrations";

/*
 * How Powerhouse works, as an architecture diagram on the diagram-design
 * "secure paved road" pattern, on one supplier invoice: the workflow runs
 * inside your boundary, and the diagram shows what may cross it.
 *
 *   your systems ─invoice PDF─▶ │ invoice record ◀─line items── local model   │   frontier model
 *                               │      ▲  ◀─signed approval── approver        │      ▲     │
 *                               │      ├──status only──────────────────────────┼──────┘     │
 *                               │      ◀──draft reply──────────────────────────┼────────────┘
 *                               │      ├──line items──────────────────────────┤ stopped
 *                               │      └─every operation, signed─▶ history     │
 *
 * The frontier model is consulted, not the end of the flow: it sits off the
 * main line, outside, with a request out and a reply back. Two hand-placed
 * layouts on the 4 px grid share the nodes: wide (desktop) and tall (phones),
 * so neither is drawn below its type sizes.
 */

export type Kind = "external" | "optional" | "focal" | "backend" | "person" | "store";

export interface NodeSpec {
  /** The step in the list below the diagram that this node answers. */
  step: string;
  name: string;
  sub: string;
  kind: Kind;
}

export const NODES = {
  systems: { step: "01", name: "Your systems", sub: `${PIECE_COUNT} connectors`, kind: "external" },
  record: { step: "02", name: "Invoice INV-2041", sub: "typed invoice record", kind: "focal" },
  model: { step: "03", name: "Local model", sub: "reads every field", kind: "backend" },
  frontier: { step: "03", name: "Frontier model", sub: "writes the reply", kind: "optional" },
  approver: { step: "04", name: "Approver", sub: "signs with a key", kind: "person" },
  history: { step: "05", name: "Operation history", sub: "append-only, every entry signed", kind: "store" },
} as const satisfies Record<string, NodeSpec>;

export type NodeId = keyof typeof NODES;

/** What the history holds for this invoice: each change, its author, and the author's signature. */
export const LOG_HEAD = ["change", "by", "signature"] as const;
export const LOG = [
  ["Invoice created", "connector", "4c1e…9a07"],
  ["Line items added", "local model", "8f3a…c21e"],
  ["Reply drafted", "frontier model", "2d9b…e614"],
  ["Approved", "approver", "51ce…7a09"],
] as const;

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A connector: an orthogonal path and its label. */
export interface PathSpec {
  id: string;
  d: string;
  label: string;
  /** The label mask's anchor: its left edge, right edge ("end") or centre ("middle"), and its top. */
  lx: number;
  ly: number;
  align?: "start" | "end" | "middle";
  /** A return path (dashed). */
  back?: boolean;
  /** Set when the path is stopped at the boundary: the stop bar across its end. */
  stop?: { x1: number; y1: number; x2: number; y2: number };
}

export interface Layout {
  width: number;
  height: number;
  zone: Box & { labelX: number; labelY: number };
  nodes: Record<NodeId, Box>;
  /** Column offsets of the history log, from the node's left edge. */
  logColumns: readonly [number, number, number];
  /** Longer sublabels where the layout has the room. */
  subs?: Partial<Record<NodeId, string>>;
  paths: readonly PathSpec[];
}

/* Type sizes in viewBox units; neither layout is ever drawn below 1:1. */
export const TYPE = { name: 15, sub: 11, label: 11, step: 10, log: 10 } as const;

const MONO = 0.62;
const ceil4 = (value: number) => Math.ceil(value / 4) * 4;

/** The diagram-design width budget: 0.62 em a character in mono, plus 8 px padding. */
export const maskWidth = (text: string, size: number = TYPE.label) => ceil4([...text].length * size * MONO + 8);

export const ZONE_LABEL = "Your boundary · local or self-hosted";

/* Desktop: left to right. The frontier model sits outside, top right, off the main line. */
export const WIDE: Layout = {
  width: 960,
  height: 568,
  zone: { x: 208, y: 32, w: 520, h: 512, labelX: 220, labelY: 36 },
  nodes: {
    systems: { x: 24, y: 248, w: 144, h: 64 },
    model: { x: 232, y: 72, w: 180, h: 64 },
    approver: { x: 508, y: 72, w: 196, h: 64 },
    record: { x: 328, y: 232, w: 280, h: 96 },
    history: { x: 288, y: 392, w: 360, h: 128 },
    frontier: { x: 760, y: 72, w: 176, h: 64 },
  },
  logColumns: [12, 152, 272],
  subs: { approver: "signs with a private key" },
  paths: [
    { id: "invoice", d: "M168 280H328", label: "invoice PDF", lx: 248, ly: 258, align: "middle" },
    { id: "lines", d: "M368 136V232", label: "line items, VAT", lx: 360, ly: 176, align: "end" },
    { id: "approval", d: "M568 136V232", label: "signed approval", lx: 576, ly: 176 },
    { id: "history", d: "M468 328V392", label: "every operation, signed", lx: 460, ly: 352, align: "end" },
    { id: "status", d: "M608 248H792Q800 248 800 240V136", label: "status only", lx: 668, ly: 226, align: "middle" },
    { id: "reply", d: "M896 136V272Q896 280 888 280H608", label: "draft reply", lx: 668, ly: 258, align: "middle", back: true },
    {
      id: "blocked",
      d: "M608 312H726",
      label: "line items ✕",
      lx: 668,
      ly: 318,
      align: "middle",
      stop: { x1: 728, y1: 304, x2: 728, y2: 320 },
    },
  ],
};

/* Phones: top to bottom. Both outside nodes above the boundary, the frontier model to the right. */
export const TALL: Layout = {
  width: 344,
  height: 624,
  zone: { x: 8, y: 112, w: 328, h: 504, labelX: 20, labelY: 586 },
  nodes: {
    systems: { x: 8, y: 8, w: 152, h: 64 },
    frontier: { x: 184, y: 8, w: 152, h: 64 },
    record: { x: 24, y: 176, w: 296, h: 80 },
    model: { x: 24, y: 312, w: 140, h: 64 },
    approver: { x: 180, y: 312, w: 140, h: 64 },
    history: { x: 24, y: 440, w: 296, h: 128 },
  },
  logColumns: [12, 124, 220],
  paths: [
    { id: "invoice", d: "M48 72V176", label: "invoice PDF", lx: 56, ly: 80 },
    {
      id: "blocked",
      d: "M136 176V114",
      label: "line items ✕",
      lx: 142,
      ly: 128,
      stop: { x1: 128, y1: 112, x2: 144, y2: 112 },
    },
    { id: "status", d: "M240 176V72", label: "status", lx: 232, ly: 80, align: "end" },
    { id: "reply", d: "M312 72V176", label: "reply", lx: 304, ly: 128, align: "end", back: true },
    { id: "lines", d: "M94 312V256", label: "line items", lx: 86, ly: 276, align: "end" },
    { id: "approval", d: "M250 312V256", label: "signed", lx: 258, ly: 276 },
    { id: "history", d: "M172 256V440", label: "every operation", lx: 180, ly: 400 },
  ],
};

export interface Step {
  num: string;
  title: string;
  body: string;
  notes?: readonly string[];
}

/** The section's five steps, numbered like the nodes they describe. */
export const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Connect existing systems",
    body: "Start from the documents, spreadsheets, inboxes, and legacy systems already carrying the work.",
    notes: [`${PIECE_COUNT} integrations, with industry-specific extensions.`],
  },
  {
    num: "02",
    title: "Structure the workflow",
    body: "Model the objects, approvals, permissions, exceptions, and data history behind the process.",
    notes: ["You control which users and what systems access your data."],
  },
  {
    num: "03",
    title: "Add scoped AI assistance",
    body: "Use AI to extract, compare, draft, flag, and route work inside the approved workflow boundary.",
    notes: [
      "Local models: confidential financial data, approved operators only",
      "Frontier models: invoice status and non-confidential correspondence",
    ],
  },
  {
    num: "04",
    title: "Keep human approval",
    body: "Operators approve, reject, or revise important actions with the right context in front of them. Here, an approver signs off the invoice with a private key.",
  },
  {
    num: "05",
    title: "Retain attributable history",
    body: "Every source, rule, model output, and human decision remains inspectable as the workflow evolves. Each entry is signed by the person, model, or connector that made it.",
  },
];

export const TITLE = "How invoice INV-2041 moves through your boundary";

export const DESC = `Architecture diagram of one invoice workflow inside your boundary: an invoice PDF arrives from your systems through one of ${PIECE_COUNT} connectors and becomes invoice INV-2041, a typed record; a local model reads every field and adds the line items and VAT, an approver signs the approval with a private key, and every operation goes to the operation history with its author and signature. A frontier model outside the boundary is consulted for the supplier reply: it receives the invoice status only and returns a draft, and the line items stop at the boundary.`;

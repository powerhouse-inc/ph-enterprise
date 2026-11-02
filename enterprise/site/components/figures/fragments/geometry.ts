import {
  cameraOf,
  corners,
  cylinder,
  insetPlan,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  roundedPlan,
  segment,
  sideMatrix,
  sideRing,
  sideSeam,
  slabOf,
  type Flat,
  type Plan,
  type Point3,
} from "@/components/iso/iso-kit";
import {
  BOOK,
  CABINET,
  CABINET_TOP,
  DESK,
  DESK_H,
  DOCK,
  DRAWER_OUT,
  FLOOR,
  FOOT_H,
  LAPTOP,
  LID,
  MAT,
  MONITOR,
  P,
  TABLE,
  TABLET,
  TRAY,
  at,
} from "./view";

/*
 * Every path of the problem figure, computed once on the server. Screens are
 * recesses (inner walls shaded by facing, glass behind) with their content
 * drawn flat in the face plane: local (x, -z). One still frame: the status
 * card is marked paid, the AI tool holds two of the four pieces, and the log
 * book has an empty row where that change should be.
 */

const solid = (plan: Plan, z: number, h: number, steps = 3, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const round = (cx: number, cy: number, r: number, z: number, h: number, steps = 28, bevel = 0) => cylinder(cx, cy, r, z, h, P, steps, bevel);
const seg = (a: Point3, b: Point3) => segment(a, b, P);
const join = (paths: string[]) => paths.filter(Boolean).join("");
const poly = (points: Point3[], closed = true) => pathOf(points.map((point) => at(point)), closed);
/** A rectangle on a face at constant y. */
const rectY = (x0: number, x1: number, y: number, z0: number, z1: number) =>
  poly([
    [x0, y, z0],
    [x1, y, z0],
    [x1, y, z1],
    [x0, y, z1],
  ]);
/** A rectangle on a face at constant x. */
const rectX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  poly([
    [x, y0, z0],
    [x, y1, z0],
    [x, y1, z1],
    [x, y0, z1],
  ]);
/** Rule lines standing for printed text on a +y face, one per length, from the top down. */
const rulesY = (x0: number, lengths: number[], y: number, zTop: number, gap: number) =>
  join(lengths.map((length, row) => seg([x0, y, zTop - row * gap], [x0 + length, y, zTop - row * gap])));
/** Rule lines on a top face, along x, one per length, from the back forward. */
const rulesTop = (x0: number, y0: number, lengths: number[], z: number, gap: number) =>
  join(lengths.map((length, row) => lineOnTop([x0, y0 + row * gap], [x0 + length, y0 + row * gap], z, P)));

/* ------------------------------------------------- face-plane drawing */

/** A path in a face's own plane, from world (x, z) pairs: local (x, -z). */
const flat = (points: Array<[number, number]>, closed = false) => pathOf(points.map(([x, z]) => [x, -z] as Flat), closed);
/** A rounded rectangle in a face's plane. */
const flatRect = (x0: number, x1: number, z0: number, z1: number, r: number, steps = 4) =>
  pathOf(
    roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([x, z]) => [x, -z] as Flat),
    true,
  );
/** Horizontal rules in a face's plane, one per [x0, x1, z]. */
const flatRules = (rows: Array<[number, number, number]>) => join(rows.map(([x0, x1, z]) => flat([[x0, z], [x1, z]])));
const flatCircle = (cx: number, cz: number, r: number, steps = 20) =>
  pathOf(
    Array.from({ length: steps }, (_, i) => {
      const a = (i / steps) * Math.PI * 2;
      return [cx + r * Math.cos(a), -(cz + r * Math.sin(a))] as Flat;
    }),
    true,
  );
const plane = (y: number) => sideMatrix([0, y], 0, P, "left");

interface FaceRect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  r: number;
}

/**
 * A recess set into a +y face at `y`, `depth` deep: the inner walls that face
 * the camera (tops and shaded sides) and the opening's outline in the face
 * plane. Content goes in `back`, the plane at the bottom of the recess.
 */
function recessOf({ x0, x1, z0, z1, r }: FaceRect, y: number, depth: number) {
  const ringPoints = roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, 6);
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const { sinA } = cameraOf(P);
  const tops: string[] = [];
  const sides: string[][] = [[], [], [], []];
  ringPoints.forEach(([ax, az], index) => {
    const [bx, bz] = ringPoints[(index + 1) % ringPoints.length]!;
    const length = Math.hypot(bx - ax, bz - az) || 1;
    let [nx, nz] = [(bz - az) / length, -(bx - ax) / length];
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) [nx, nz] = [-nx, -nz];
    if (nx <= 0 && nz <= 0) return;
    const quad = pathOf([at([ax, y, az]), at([bx, y, bz]), at([bx, y - depth, bz]), at([ax, y - depth, az])], true);
    if (nz >= nx) tops.push(quad);
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))]!.push(quad);
  });
  return {
    shape: flatRect(x0, x1, z0, z1, r, 6),
    tops: tops.join(""),
    sides: sides.map((quads) => quads.join("")),
    face: plane(y),
    back: plane(y - depth),
  };
}
export type Recess = ReturnType<typeof recessOf>;

/* ------------------------------------------------------------------ desk */

const MAT_TOP = 1;
export const DESK_ART = {
  feet: corners(DESK, 24).map(([x, y]) => [round(x, y, 8, FLOOR, 1.8, 32), round(x, y, 6.2, FLOOR + 1.8, FOOT_H - 1.8, 32)]),
  slab: solid(DESK, -DESK_H, DESK_H, 8, 1.6),
  band: sideSeam(DESK, -3.5, P, 8),
  mat: solid(MAT, 0, MAT_TOP, 4, 0.3),
};

/* ---------------------------------------- legacy tracker: a filing cabinet */

const CAB_FRONT = CABINET.y + CABINET.d;
const CAB_X0 = CABINET.x + 4;
const CAB_X1 = CABINET.x + CABINET.w - 4;
const CAB_CX = CABINET.x + CABINET.w / 2;
const LOW = { z0: 8, z1: 35 };
const HIGH = { z0: 37, z1: 64 };
const OPEN_Y = CAB_FRONT + DRAWER_OUT;

/** A drawer front with its pull and label holder, its face at y + 2.2. */
function drawerFront(y: number, z0: number, z1: number) {
  const face = y + 2.2;
  return {
    front: solid({ x: CAB_X0, y, w: CAB_X1 - CAB_X0, d: 2.2, r: 0.8 }, z0, z1 - z0, 3, 0.4),
    holder: rectY(CAB_CX - 9, CAB_CX + 9, face, z1 - 8, z1 - 3),
    holderRule: rulesY(CAB_CX - 6, [12], face, z1 - 5.5, 0),
    rivets: [at([CAB_CX - 10.6, face, z1 - 5.5]), at([CAB_CX + 10.6, face, z1 - 5.5])],
    posts: [CAB_CX - 11, CAB_CX + 9].map((x) => solid({ x, y: face, w: 2, d: 2.4, r: 0.5 }, z1 - 15, 2.4, 2)),
    bar: solid({ x: CAB_CX - 12, y: face + 2.4, w: 24, d: 1.6, r: 0.6 }, z1 - 15, 2.4, 2, 0.3),
  };
}

const CARD: Plan = { x: CAB_CX - 15, y: CAB_FRONT + 5, w: 30, d: 0.8, r: 0.3 };
const CARD_Z0 = HIGH.z0 + 2;
const CARD_Z1 = 80;
const CARD_FACE = CARD.y + CARD.d;
const MARK: Point3 = [CARD.x + CARD.w - 8, CARD_FACE, CARD_Z1 - 8];
export const CABINET_ART = {
  plinth: solid(insetPlan(CABINET, 2), 0, 4, 3),
  body: solid(CABINET, 4, CABINET_TOP - 4, 3, 0.8),
  cap: solid(insetPlan(CABINET, -1.4), CABINET_TOP, 3.5, 3, 0.6),
  // A seam down the side, where the case's panels meet.
  seam: seg([CABINET.x + CABINET.w, CABINET.y + CABINET.d - 6, 4], [CABINET.x + CABINET.w, CABINET.y + CABINET.d - 6, CABINET_TOP]),
  lock: sideRing([CAB_X1 - 6, CAB_FRONT, CABINET_TOP - 1.6], 1.1, "y", P, 14),
  lockSlot: seg([CAB_X1 - 6, CAB_FRONT, CABINET_TOP - 2.3], [CAB_X1 - 6, CAB_FRONT, CABINET_TOP - 0.9]),
  low: drawerFront(CAB_FRONT, LOW.z0, LOW.z1),
  opening: rectY(CAB_X0, CAB_X1, CAB_FRONT, HIGH.z0, HIGH.z1),
  drawerFloor: solid({ x: CAB_X0 + 1, y: CAB_FRONT, w: CAB_X1 - CAB_X0 - 2, d: DRAWER_OUT, r: 0.4 }, HIGH.z0, 1.4, 2),
  drawerLeft: solid({ x: CAB_X0 + 1, y: CAB_FRONT, w: 1.2, d: DRAWER_OUT, r: 0.3 }, HIGH.z0 + 1.4, 19, 2, 0.2),
  drawerRight: solid({ x: CAB_X1 - 2.2, y: CAB_FRONT, w: 1.2, d: DRAWER_OUT, r: 0.3 }, HIGH.z0 + 1.4, 19, 2, 0.2),
  card: solid(CARD, CARD_Z0, CARD_Z1 - CARD_Z0, 2),
  cardTab: solid({ x: CARD.x, y: CARD.y, w: 12, d: CARD.d, r: 0.3 }, CARD_Z1, 3.4, 2),
  cardRules: rulesY(CARD.x + 3, [12, 8, 10], CARD_FACE, CARD_Z1 - 4, 3.6),
  ring: sideRing(MARK, 4.6, "y", P, 28),
  check: poly(
    [
      [MARK[0] - 2.5, CARD_FACE, MARK[2]],
      [MARK[0] - 0.6, CARD_FACE, MARK[2] - 2],
      [MARK[0] + 2.7, CARD_FACE, MARK[2] + 2.3],
    ],
    false,
  ),
  high: drawerFront(OPEN_Y, HIGH.z0, HIGH.z1),
};

/* ---------------------------------------------- spreadsheet: a monitor */

const M = MONITOR;
const M_FACE = M.y + M.d;
const SCREEN: FaceRect = { x0: M.x0 + 5, x1: M.x1 - 5, z0: M.z0 + 9, z1: M.z1 - 5, r: 1.4 };
const TITLE_Z = SCREEN.z1 - 8;
const ROWS = 6;
const RH = (TITLE_Z - SCREEN.z0) / ROWS;
const NUM_W = 8;
const COLS = 6;
const CW = (SCREEN.x1 - SCREEN.x0 - NUM_W) / COLS;
const colX = (col: number) => SCREEN.x0 + NUM_W + col * CW;
const rowZ = (row: number) => TITLE_Z - row * RH; // top of row `row`
const AMOUNT_COL = 4;
/** Right-aligned figures in a cell, as rules. */
const figure = (col: number, row: number, length: number): [number, number, number] => {
  const x1 = colX(col + 1) - 2.5;
  return [x1 - length, x1, rowZ(row) - RH / 2];
};
export const MONITOR_ART = {
  base: solid({ x: -22, y: -72, w: 40, d: 18, r: 4 }, 0, 3, 4, 0.6),
  neck: solid({ x: -6, y: -70, w: 8, d: 8, r: 2 }, 3, 60, 3, 0.4),
  housing: solid({ x: M.x0, y: M.y, w: M.x1 - M.x0, d: M.d, r: 2.5 }, M.z0, M.z1 - M.z0, 3, 0.8),
  recess: recessOf(SCREEN, M_FACE, 1.2),
  // Content, in the screen's plane.
  logo: { x: SCREEN.x0 + 2, y: -(SCREEN.z1 - 1.2), size: 5.6 },
  title: flatRules([[SCREEN.x0 + 10, SCREEN.x0 + 34, SCREEN.z1 - 4]]),
  bar: flat([
    [SCREEN.x0, TITLE_Z],
    [SCREEN.x1, TITLE_Z],
  ]),
  grid: join([
    ...Array.from({ length: COLS }, (_, i) => flat([[colX(i), SCREEN.z0], [colX(i), TITLE_Z]])),
    ...Array.from({ length: ROWS - 1 }, (_, j) => flat([[SCREEN.x0, rowZ(j + 1)], [SCREEN.x1, rowZ(j + 1)]])),
  ]),
  heads: flatRules(Array.from({ length: COLS }, (_, i) => [colX(i) + CW / 2 - 1.6, colX(i) + CW / 2 + 1.6, rowZ(0) - RH / 2] as [number, number, number])),
  numbers: flatRules(Array.from({ length: ROWS - 1 }, (_, j) => [SCREEN.x0 + 2.6, SCREEN.x0 + 5.4, rowZ(j + 1) - RH / 2] as [number, number, number])),
  cells: flatRules(
    (
      [
        [0, 1, 9], [1, 1, 6], [2, 1, 8], [3, 1, 5], [5, 1, 7],
        [0, 2, 7], [1, 2, 8], [2, 2, 5], [3, 2, 6], [5, 2, 6],
        [0, 3, 10], [1, 3, 5], [2, 3, 7], [3, 3, 7], [5, 3, 8],
        [0, 4, 6], [1, 4, 9], [2, 4, 6], [3, 4, 4], [5, 4, 5],
        [0, 5, 8], [1, 5, 6], [2, 5, 9], [3, 5, 6], [5, 5, 7],
      ] as Array<[number, number, number]>
    ).map(([c, r, l]) => [colX(c) + 2.5, colX(c) + 2.5 + l, rowZ(r) - RH / 2] as [number, number, number]),
  ),
  // The claim's amounts: the fifth column, rows 1 to 5, right-aligned.
  amounts: flatRules([1, 2, 3, 4, 5].map((row, i) => figure(AMOUNT_COL, row, [7, 9, 6, 8, 10][i]!))),
  amountsBox: flatRect(colX(AMOUNT_COL), colX(AMOUNT_COL + 1), SCREEN.z0, rowZ(1), 0.4, 2),
};

/* ------------------------------------- inbox: a two-tier letter tray */

const TX0 = TRAY.x;
const TX1 = TRAY.x + TRAY.w;
const TY0 = TRAY.y;
const TY1 = TRAY.y + TRAY.d;
const WALL = 1.6;
const UPPER = 26; // the upper tier's floor
/** One tier: floor, walls and a low front lip, its floor's underside at z. */
function tier(z: number) {
  const top = z + 2;
  return {
    floor: solid(TRAY, z, 2, 3, 0.4),
    back: solid({ x: TX0, y: TY0, w: TRAY.w, d: WALL, r: 0.5 }, top, 11, 2, 0.3),
    left: solid({ x: TX0, y: TY0 + WALL, w: WALL, d: TRAY.d - WALL * 2, r: 0.4 }, top, 11, 2, 0.3),
    right: solid({ x: TX1 - WALL, y: TY0 + WALL, w: WALL, d: TRAY.d - WALL * 2, r: 0.4 }, top, 11, 2, 0.3),
    front: solid({ x: TX0, y: TY1 - WALL, w: TRAY.w, d: WALL, r: 0.5 }, top, 5, 2, 0.3),
  };
}
const envelope = (k: number, z: number, at0 = 5): Plan => ({ x: TX0 + at0 + k * 1.6, y: TY0 + at0 + k * 1.2, w: 50, d: 34, r: 0.6 });
const UPPER_ENVELOPE = envelope(0, UPPER + 2, 7);
const RECEIPT: Plan = { x: TX0 + 15, y: TY0 + 10, w: 16, d: 30, r: 0.4 };
const RECEIPT_Z = UPPER + 2 + 0.8;
const RECEIPT_TOP = RECEIPT_Z + 0.6;
const POSTS = [
  [TX0 + 3.4, TY0 + 3.4],
  [TX1 - 3.4, TY0 + 3.4],
  [TX0 + 3.4, TY1 - 3.4],
  [TX1 - 3.4, TY1 - 3.4],
] as const;
export const TRAY_ART = {
  lower: tier(0),
  envelopes: [0, 1, 2].map((k) => solid(envelope(k, 2), 2 + k * 0.8, 0.8, 2)),
  posts: POSTS.map(([x, y]) => round(x, y, 1.3, 2, UPPER - 2, 14)),
  upper: tier(UPPER),
  envelope: solid(UPPER_ENVELOPE, UPPER + 2, 0.8, 2),
  flap: onTop(
    [
      [UPPER_ENVELOPE.x, UPPER_ENVELOPE.y],
      [UPPER_ENVELOPE.x + UPPER_ENVELOPE.w / 2, UPPER_ENVELOPE.y + 16],
      [UPPER_ENVELOPE.x + UPPER_ENVELOPE.w, UPPER_ENVELOPE.y],
    ],
    UPPER + 2.8,
    P,
  ),
  receipt: solid(RECEIPT, RECEIPT_Z, 0.6, 2),
  receiptRules: rulesTop(RECEIPT.x + 3, RECEIPT.y + 4, [8, 5, 9, 6], RECEIPT_TOP, 4.2),
  receiptTotal: lineOnTop([RECEIPT.x, RECEIPT.y + 23], [RECEIPT.x + RECEIPT.w, RECEIPT.y + 23], RECEIPT_TOP, P),
  receiptSum: rulesTop(RECEIPT.x + RECEIPT.w - 9, RECEIPT.y + 26, [6], RECEIPT_TOP, 0),
  badge: rectX(TX1, TY1 - 6, TY1 - 18, UPPER + 3.5, UPPER + 11.5),
  logo: sideMatrix([TX1, TY1 - 6], UPPER + 11.5, P, "right"),
};

/* ---------------------------------------- chat: a tablet in a dock */

const T = TABLET;
const T_FACE = T.y + T.d;
const T_SCREEN: FaceRect = { x0: T.x0 + 2.5, x1: T.x1 - 2.5, z0: T.z0 + 4, z1: T.z1 - 3, r: 1.4 };
const AVATAR_X = T_SCREEN.x0 + 4;
const MSG_X = T_SCREEN.x0 + 8;
const APPROVAL = { x0: MSG_X, x1: T_SCREEN.x1 - 3.5, z0: T_SCREEN.z0 + 20, z1: T_SCREEN.z0 + 28.5 };
export const TABLET_ART = {
  dock: solid(DOCK, 0, 5, 4, 0.6),
  slot: planOutline({ x: T.x0 - 1, y: T.y - 0.6, w: T.x1 - T.x0 + 2, d: T.d + 1.2, r: 0.6 }, 5, P, 2),
  body: solid({ x: T.x0, y: T.y, w: T.x1 - T.x0, d: T.d, r: 2.2 }, T.z0, T.z1 - T.z0, 3, 0.5),
  recess: recessOf(T_SCREEN, T_FACE, 0.8),
  // Content, in the screen's plane.
  logo: { x: T_SCREEN.x0 + 1.6, y: -(T_SCREEN.z1 - 1.4), size: 4.6 },
  channel: flatRules([[T_SCREEN.x0 + 8, T_SCREEN.x0 + 22, T_SCREEN.z1 - 3.7]]),
  head: flat([
    [T_SCREEN.x0, T_SCREEN.z1 - 7],
    [T_SCREEN.x1, T_SCREEN.z1 - 7],
  ]),
  avatars: join([T_SCREEN.z1 - 12, T_SCREEN.z1 - 20.5, APPROVAL.z1 - 3].map((z) => flatCircle(AVATAR_X, z, 2.1, 16))),
  messages: flatRules([
    [MSG_X, MSG_X + 17, T_SCREEN.z1 - 10.8],
    [MSG_X, MSG_X + 11, T_SCREEN.z1 - 13.4],
    [MSG_X, MSG_X + 20, T_SCREEN.z1 - 19.3],
    [MSG_X, MSG_X + 14, T_SCREEN.z1 - 21.9],
  ]),
  // The approval: the third message, a reply with a check.
  approval: flatRect(APPROVAL.x0, APPROVAL.x1, APPROVAL.z0, APPROVAL.z1, 1.6),
  approvalCheck: flat([
    [APPROVAL.x0 + 2.6, (APPROVAL.z0 + APPROVAL.z1) / 2],
    [APPROVAL.x0 + 4.4, (APPROVAL.z0 + APPROVAL.z1) / 2 - 1.9],
    [APPROVAL.x0 + 8, (APPROVAL.z0 + APPROVAL.z1) / 2 + 2],
  ]),
  approvalRule: flatRules([[APPROVAL.x0 + 11, APPROVAL.x1 - 3, (APPROVAL.z0 + APPROVAL.z1) / 2]]),
  input: flatRect(T_SCREEN.x0 + 2, T_SCREEN.x1 - 2, T_SCREEN.z0 + 3, T_SCREEN.z0 + 7.5, 2),
};

/* ----------------------------- operations log: an open, empty ledger */

const COVER_TOP = MAT_TOP + 1.2;
const PAGE_TOP = COVER_TOP + 2.2;
const HALF = (BOOK.x1 - BOOK.x0) / 2;
const LEFT: Plan = { x: BOOK.x0 + 1.5, y: BOOK.y0 + 1.5, w: HALF - 2.1, d: BOOK.y1 - BOOK.y0 - 3, r: 0.8 };
const RIGHT: Plan = { x: BOOK.x0 + HALF + 0.6, y: BOOK.y0 + 1.5, w: HALF - 2.1, d: BOOK.y1 - BOOK.y0 - 3, r: 0.8 };
const HEAD_Y = RIGHT.y + 7;
const ROW = 6;
const ROW_YS = Array.from({ length: Math.floor((RIGHT.y + RIGHT.d - HEAD_Y) / ROW) }, (_, i) => HEAD_Y + (i + 1) * ROW);
const COL_XS = [0.25, 0.5, 0.75].map((f) => RIGHT.x + RIGHT.w * f);
export const BOOK_ART = {
  cover: solid({ x: BOOK.x0, y: BOOK.y0, w: BOOK.x1 - BOOK.x0, d: BOOK.y1 - BOOK.y0, r: 1.6 }, MAT_TOP, 1.2, 3, 0.3),
  left: solid(LEFT, COVER_TOP, PAGE_TOP - COVER_TOP, 2),
  right: solid(RIGHT, COVER_TOP, PAGE_TOP - COVER_TOP, 2),
  title: rulesTop(LEFT.x + 5, LEFT.y + 6, [16, 10], PAGE_TOP, 3.6),
  // Its columns: what changed, when, by whom, from which source. Nothing in them.
  heads: join([0, 1, 2, 3].map((i) => lineOnTop([RIGHT.x + 2 + i * (RIGHT.w / 4), HEAD_Y - 3], [RIGHT.x + 6.5 + i * (RIGHT.w / 4), HEAD_Y - 3], PAGE_TOP, P))),
  headRule: lineOnTop([RIGHT.x, HEAD_Y], [RIGHT.x + RIGHT.w, HEAD_Y], PAGE_TOP, P),
  rows: join(ROW_YS.map((y) => lineOnTop([RIGHT.x, y], [RIGHT.x + RIGHT.w, y], PAGE_TOP, P))),
  columns: join(COL_XS.map((x) => lineOnTop([x, HEAD_Y], [x, RIGHT.y + RIGHT.d], PAGE_TOP, P))),
  // The entry that should have been written when the status changed.
  missing: planOutline({ x: RIGHT.x + 1, y: HEAD_Y + 0.8, w: RIGHT.w - 2, d: ROW - 1.6, r: 0.6 }, PAGE_TOP, P, 2),
};

/* ------------------------- the outside AI tool: a laptop on a side table */

const L_FACE = LID.y + LID.d;
const L_SCREEN: FaceRect = { x0: LAPTOP.x + 3, x1: LAPTOP.x + LAPTOP.w - 3, z0: 7, z1: LID.z1 - 3, r: 1.4 };
const L_HEAD = L_SCREEN.z1 - 5.5;
const CHIP = { w: 12, gap: 2.5, z0: L_HEAD - 10.5, z1: L_HEAD - 3 };
const chipX = (i: number) => L_SCREEN.x0 + (L_SCREEN.x1 - L_SCREEN.x0 - (4 * CHIP.w + 3 * CHIP.gap)) / 2 + i * (CHIP.w + CHIP.gap);
const KEY = { pitchX: 4.3, pitchY: 4, w: 3.7, d: 3.4 };
const KEYS_X0 = LAPTOP.x + (LAPTOP.w - 13 * KEY.pitchX) / 2 + (KEY.pitchX - KEY.w) / 2;
const KEYS_Y0 = LAPTOP.y + 5;
const SPARK = { x: L_SCREEN.x0 + 3.4, z: L_SCREEN.z1 - 2.8, r: 1.7 };
const keyOutline = (x: number, y: number, w: number) => planOutline({ x, y, w, d: KEY.d, r: 0.6 }, 3, P, 2);
export const TABLE_ART = {
  foot: round(TABLE.cx, TABLE.cy, 22, FLOOR, 2, 48, 0.4),
  column: round(TABLE.cx, TABLE.cy, 4.5, FLOOR + 2, -3 - FLOOR - 2, 24),
  top: round(TABLE.cx, TABLE.cy, TABLE.r, -3, 3, 72, 0.6),
};
export const LAPTOP_ART = {
  base: solid(LAPTOP, 0, 3, 4, 0.6),
  keys: join([
    ...[0, 1, 2].flatMap((row) => Array.from({ length: 13 }, (_, i) => keyOutline(KEYS_X0 + i * KEY.pitchX, KEYS_Y0 + row * KEY.pitchY, KEY.w))),
    // The bottom row: a space bar between short keys.
    ...[0, 1, 2].map((i) => keyOutline(KEYS_X0 + i * KEY.pitchX, KEYS_Y0 + 3 * KEY.pitchY, KEY.w)),
    keyOutline(KEYS_X0 + 3 * KEY.pitchX, KEYS_Y0 + 3 * KEY.pitchY, 6 * KEY.pitchX + KEY.w),
    ...[10, 11, 12].map((i) => keyOutline(KEYS_X0 + i * KEY.pitchX, KEYS_Y0 + 3 * KEY.pitchY, KEY.w)),
  ]),
  trackpad: planOutline({ x: LAPTOP.x + LAPTOP.w / 2 - 11, y: KEYS_Y0 + 4 * KEY.pitchY + 2, w: 22, d: 9, r: 1.2 }, 3, P, 3),
  lid: solid({ x: LAPTOP.x, y: LID.y, w: LAPTOP.w, d: LID.d, r: 1.5 }, 2, LID.z1 - 2, 3, 0.5),
  recess: recessOf(L_SCREEN, L_FACE, 0.6),
  // Content, in the screen's plane: a four-pointed spark (the usual mark
  // for an AI assistant), a title, the context it holds, an answer, a field.
  spark: flat(
    [
      [SPARK.x, SPARK.z + SPARK.r * 1.6],
      [SPARK.x + SPARK.r * 0.35, SPARK.z + SPARK.r * 0.35],
      [SPARK.x + SPARK.r * 1.6, SPARK.z],
      [SPARK.x + SPARK.r * 0.35, SPARK.z - SPARK.r * 0.35],
      [SPARK.x, SPARK.z - SPARK.r * 1.6],
      [SPARK.x - SPARK.r * 0.35, SPARK.z - SPARK.r * 0.35],
      [SPARK.x - SPARK.r * 1.6, SPARK.z],
      [SPARK.x - SPARK.r * 0.35, SPARK.z + SPARK.r * 0.35],
    ],
    true,
  ),
  title: flatRules([[L_SCREEN.x0 + 8, L_SCREEN.x0 + 26, SPARK.z]]),
  head: flat([
    [L_SCREEN.x0, L_HEAD],
    [L_SCREEN.x1, L_HEAD],
  ]),
  // The context it holds of the claim: four chips, of which it gets two.
  chips: [0, 1, 2, 3].map((i) => {
    const x0 = chipX(i);
    const x1 = x0 + CHIP.w;
    const mid = (CHIP.z0 + CHIP.z1) / 2;
    return {
      frame: flatRect(x0, x1, CHIP.z0, CHIP.z1, 1),
      fill:
        i === 0
          ? flatRules([
              [x0 + 2.5, x1 - 4, mid + 1.4],
              [x0 + 2.5, x1 - 6, mid - 1.4],
            ])
          : flatRules([
              [x0 + 2.5, x1 - 2.5, mid],
            ]) +
            join([x0 + 5.3, x0 + 8.3].map((x) => flat([[x, CHIP.z0 + 1.6], [x, CHIP.z1 - 1.6]]))),
    };
  }),
  answer: flatRect(L_SCREEN.x0 + 2, L_SCREEN.x0 + 42, L_SCREEN.z0 + 9, L_SCREEN.z0 + 17.5, 1.6),
  answerRules: flatRules([
    [L_SCREEN.x0 + 5, L_SCREEN.x0 + 36, L_SCREEN.z0 + 14.6],
    [L_SCREEN.x0 + 5, L_SCREEN.x0 + 26, L_SCREEN.z0 + 11.9],
  ]),
  input: flatRect(L_SCREEN.x0 + 2, L_SCREEN.x1 - 2, L_SCREEN.z0 + 2.5, L_SCREEN.z0 + 6.5, 2),
};

/* ---------------------------------------------------- the name tags */

/*
 * One tag per object (diagram-design, axonometric plan): a name and a
 * technical sublabel on an opaque backing, horizontal, painted after every
 * solid, and placed on or just above what it names: no leaders, no numbers.
 * `at` is the tag's centre on screen; only the AI tool's tag is focal.
 */
export interface TagSpec {
  name: string;
  sub: string;
  at: Flat;
  focal?: boolean;
}

const nudge = ([x, y]: Flat, dx: number, dy: number): Flat => [x + dx, y + dy];

export const TAGS: readonly TagSpec[] = [
  // Above the cabinet, clear of the card standing in its drawer.
  { name: "Status", sub: "legacy tracker", at: nudge(at([CAB_CX, CABINET.y + CABINET.d / 2, CABINET_TOP + 3.5]), 0, -34) },
  // Above the monitor's far end, clear of the sheet.
  { name: "Amounts", sub: "spreadsheet", at: nudge(at([M.x1 - 8, M.y, M.z1]), 16, -50) },
  // Behind the tray's upper tier, clear of the receipt.
  { name: "Receipt", sub: "Gmail inbox", at: nudge(at([TRAY.x, TRAY.y, UPPER + 8]), -32, -5) },
  // On the open desk right of the tablet.
  { name: "Approval", sub: "Slack thread", at: nudge(at([T.x1 + 30, T.y + 12, 0]), 23, -92) },
  // On the desk in front of the log book.
  { name: "Change log", sub: "no entries", at: at([(BOOK.x0 + BOOK.x1) / 2, BOOK.y1 + 14, 0]) },
  // Above the laptop's lid.
  { name: "AI tool", sub: "sees 2 of 4 pieces", at: nudge(at([LAPTOP.x + LAPTOP.w / 2, LID.y, LID.z1]), 8, -36), focal: true },
];


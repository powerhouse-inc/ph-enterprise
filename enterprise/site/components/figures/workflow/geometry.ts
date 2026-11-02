import {
  corners,
  cylinder,
  depthOf,
  dotGrid,
  haloOf,
  insetPlan,
  knurl,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  ring,
  segment,
  sideMatrix,
  sideRing,
  sideSeam,
  slabOf,
  topMatrix,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
} from "@/components/iso/iso-kit";
import {
  FOOT_H,
  HOOD_H,
  MODULE_D,
  MODULE_H,
  MODULE_W,
  MODULE_XS,
  P,
  PANEL,
  PANEL_Z0,
  PANEL_Z1,
  PLINTH,
  PLINTH_H,
  PORT_D,
  RIM,
  RIM_H,
  RIM_T,
  TILE,
  TILE_H,
  TRACK_D,
  TRACK_H,
  TRAY,
  TRAY_H,
  at,
} from "./view";

/*
 * Every static path of the workflow figure, computed once on the server.
 * Moving parts (chips, field fills, scan head, key, gate, pointer, log
 * cells) are built at rest and moved or toggled by live.tsx.
 */

const solid = (plan: Plan, z: number, h: number, steps = 3, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const round = (cx: number, cy: number, r: number, z: number, h: number, steps = 28) => cylinder(cx, cy, r, z, h, P, steps);
const seg = (a: Point3, b: Point3) => segment(a, b, P);
const join = (paths: string[]) => paths.filter(Boolean).join("");
const dots = (points: Point3[]): Flat[] => points.map((point) => at(point));
const byDepth = (points: Plane[]) => [...points].sort((a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P));
const poly = (points: Point3[], closed = true) => pathOf(points.map((point) => at(point)), closed);
/** A rectangle on a face at constant y (a front or back face). */
const rectY = (x0: number, x1: number, y: number, z0: number, z1: number) => poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]);
/** A rectangle on a face at constant x. */
const rectX = (x: number, y0: number, y1: number, z0: number, z1: number) => poly([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]]);
/** Rule lines standing for printed text on a +y face (ends free). */
const rulesY = (x0: number, lengths: number[], y: number, zTop: number, gap: number) =>
  join(lengths.map((length, row) => seg([x0, y, zTop - row * gap], [x0 + length, y, zTop - row * gap])));

const FRONT = MODULE_D / 2;
const TOP = MODULE_H;
const planOf = (cx: number): Plan => ({ x: cx - MODULE_W / 2, y: -FRONT, w: MODULE_W, d: MODULE_D, r: 2.4 });

/* ---------------------------------------------------------------- plinth */

const PLINTH_SCREWS = corners(PLINTH, 11);
const PLATE: Plan = { x: PLINTH.x + PLINTH.w - 70, y: PLINTH.y + PLINTH.d - 22, w: 52, d: 10, r: 2 };
const RIM_IN = insetPlan(RIM, RIM_T);

export const PLINTH_ART = {
  halo: haloOf(PLINTH, -PLINTH_H - FOOT_H, PLINTH_H, P),
  feet: byDepth(corners(PLINTH, 28)).map(([x, y]) => [round(x, y, 8, -PLINTH_H - FOOT_H, 1.8, 32), round(x, y, 6.2, -PLINTH_H - FOOT_H + 1.8, FOOT_H - 1.8, 32)]),
  slab: solid(PLINTH, -PLINTH_H, PLINTH_H, 8, 1.6),
  groove: planOutline(insetPlan(PLINTH, 6), 0, P),
  screwRings: join(PLINTH_SCREWS.map(([x, y]) => ring(x, y, 2.4, 0, P, 16))),
  screws: dots(PLINTH_SCREWS.map(([x, y]) => [x, y, 0])),
  plate: solid(PLATE, 0, 0.8, 3),
  plateLine: planOutline(insetPlan(PLATE, 1.6), 0.8, P),
  plateRule: join([0, 1, 2].map((row) => onTop([[PLATE.x + 8, PLATE.y + 3.2 + row * 1.8], [PLATE.x + [30, 20, 34][row]!, PLATE.y + 3.2 + row * 1.8]], 0.8, P))),
  plateScrews: dots([[PLATE.x + 3.6, PLATE.y + PLATE.d / 2, 0.8], [PLATE.x + PLATE.w - 3.6, PLATE.y + PLATE.d / 2, 0.8]]),
  // The canvas: a dot grid inside the boundary, as in Workflow Studio.
  canvas: dotGrid(RIM_IN.x + 7, RIM_IN.y + 7, 43, 13, 10, 0, P),
};

/* ---------------------------------------------- the boundary: the rim */

const PORT_Y0 = -PORT_D / 2;
const PORT_Y1 = PORT_D / 2;
export const RIM_ART = {
  back: solid({ x: RIM.x, y: RIM.y, w: RIM.w, d: RIM_T, r: 1 }, 0, RIM_H, 2, 0.4),
  leftBack: solid({ x: RIM.x, y: RIM.y + RIM_T, w: RIM_T, d: PORT_Y0 - RIM.y - RIM_T, r: 0.6 }, 0, RIM_H, 2, 0.4),
  leftFront: solid({ x: RIM.x, y: PORT_Y1, w: RIM_T, d: RIM.y + RIM.d - RIM_T - PORT_Y1, r: 0.6 }, 0, RIM_H, 2, 0.4),
  right: solid({ x: RIM.x + RIM.w - RIM_T, y: RIM.y + RIM_T, w: RIM_T, d: RIM.d - 2 * RIM_T, r: 0.6 }, 0, RIM_H, 2, 0.4),
  front: solid({ x: RIM.x, y: RIM.y + RIM.d - RIM_T, w: RIM.w, d: RIM_T, r: 1 }, 0, RIM_H, 2, 0.4),
  screws: dots(corners(RIM, RIM_T / 2).map(([x, y]) => [x, y, RIM_H])),
};

/* --------------------------------- 01: the connector catalogue, a tray */

export const TILE_LOGOS = [
  "gmail",
  "stripe",
  "slack",
  "salesforce",
  "hubspot",
  "google-sheets",
  null, // the QuickBooks tile is plugged into the trigger
  "jira-cloud",
  "airtable",
  "notion",
  "shopify",
  "dropbox",
] as const;
// Three columns by four rows, spaced evenly inside the tray's walls.
const WALL = 1.6;
const GAP_X = (TRAY.w - 2 * WALL - 3 * TILE) / 4;
const GAP_Y = (TRAY.d - 2 * WALL - 4 * TILE) / 5;
const TILE_AT = (index: number): Plane => [
  TRAY.x + WALL + GAP_X + (index % 3) * (TILE + GAP_X),
  TRAY.y + WALL + GAP_Y + Math.floor(index / 3) * (TILE + GAP_Y),
];
const TRAY_FLOOR = 1.5;

export const TRAY_ART = {
  floor: solid(TRAY, 0, TRAY_FLOOR, 3, 0.4),
  back: solid({ x: TRAY.x, y: TRAY.y, w: TRAY.w, d: 1.6, r: 0.4 }, TRAY_FLOOR, TRAY_H - TRAY_FLOOR, 2, 0.3),
  left: solid({ x: TRAY.x, y: TRAY.y + 1.6, w: 1.6, d: TRAY.d - 3.2, r: 0.3 }, TRAY_FLOOR, TRAY_H - TRAY_FLOOR, 2, 0.3),
  right: solid({ x: TRAY.x + TRAY.w - 1.6, y: TRAY.y + 1.6, w: 1.6, d: TRAY.d - 3.2, r: 0.3 }, TRAY_FLOOR, TRAY_H - TRAY_FLOOR, 2, 0.3),
  front: solid({ x: TRAY.x, y: TRAY.y + TRAY.d - 1.6, w: TRAY.w, d: 1.6, r: 0.4 }, TRAY_FLOOR, TRAY_H - TRAY_FLOOR - 2.5, 2, 0.3),
  tiles: TILE_LOGOS.map((logo, index) => {
    const [x, y] = TILE_AT(index);
    if (!logo) return { logo: null, slot: planOutline({ x, y, w: TILE, d: TILE, r: 1 }, TRAY_FLOOR, P, 2) };
    return {
      logo: `/logos/activepieces/${logo}.svg`,
      body: solid({ x, y, w: TILE, d: TILE, r: 1 }, TRAY_FLOOR, TILE_H, 2, 0.3),
      face: topMatrix([x, y], TRAY_FLOOR + TILE_H, P, "x"),
    };
  }),
};

/* ------------------------------------------- the feeder and connectors */

const TRACK_Y0 = -TRACK_D / 2;
const trackPlan = (x0: number, x1: number): Plan => ({ x: x0, y: TRACK_Y0, w: x1 - x0, d: TRACK_D, r: 0.6 });
const FEEDER_X0 = TRAY.x + TRAY.w;
const FEEDER_X1 = MODULE_XS[0]! - MODULE_W / 2;
const CHIP: Plan = { x: 0, y: -3, w: 9, d: 6, r: 0.5 };

/** A document chip, built at x = x0 on a track, moved along x by live.tsx. */
function chip(x0: number) {
  const plan = { ...CHIP, x: x0 };
  return {
    body: solid(plan, TRACK_H, 0.6, 2),
    rules: join([0, 1].map((row) => onTop([[x0 + 1.8, -1.2 + row * 2.2], [x0 + 1.8 + [5, 3.2][row]!, -1.2 + row * 2.2]], TRACK_H + 0.6, P))),
  };
}

/** The "add a step" button on a connector's front face (a printed glyph: free ends). */
const plusButton = (x: number) => ({
  ring: sideRing([x, TRACK_D / 2, TRACK_H / 2], 2.1, "y", P, 20),
  plus: seg([x - 1.1, TRACK_D / 2, TRACK_H / 2], [x + 1.1, TRACK_D / 2, TRACK_H / 2]) + seg([x, TRACK_D / 2, TRACK_H / 2 - 1.1], [x, TRACK_D / 2, TRACK_H / 2 + 1.1]),
});

export const FEEDER_ART = {
  track: solid(trackPlan(FEEDER_X0, FEEDER_X1), 0, TRACK_H, 2, 0.4),
  chip: chip(FEEDER_X0 + 1),
};
export const FEEDER_RUN = FEEDER_X1 - FEEDER_X0 - CHIP.w - 2;

const GAPS = MODULE_XS.slice(0, -1).map((cx, index) => [cx + MODULE_W / 2, MODULE_XS[index + 1]! - MODULE_W / 2] as const);
export const CONNECTOR_RUN = GAPS[0]![1] - GAPS[0]![0] - CHIP.w - 2;

export const CONNECTOR_ART = GAPS.map(([x0, x1], index) => ({
  track: solid(trackPlan(x0, x1), 0, TRACK_H, 2, 0.4),
  // The fourth connector carries the approval gate instead of a button.
  button: index === 3 ? null : plusButton((x0 + x1) / 2),
  chip: chip(x0 + 1),
}));

/* ------------------------------------------------------------ modules */

/** The parts every module shares: body, groove, screws, badge frame, rules, LED. */
function moduleBase(cx: number, rules: number[]) {
  const plan = planOf(cx);
  const x0 = plan.x;
  const x1 = plan.x + plan.w;
  return {
    body: solid(plan, 0, MODULE_H, 3, 0.8),
    band: sideSeam(plan, 4.5, P, 3),
    groove: planOutline(insetPlan(plan, 3), TOP, P, 3),
    screws: dots(corners(plan, 4.5).map(([x, y]) => [x, y, TOP])),
    badge: rectY(x0 + 5, x0 + 22, FRONT, 2.5, 19.5),
    badgeFace: sideMatrix([x0 + 5, FRONT], 19.5, P, "left"),
    rules: rulesY(x0 + 27, rules, FRONT, 16.5, 4),
    led: sideRing([x1 - 6, FRONT, 16.5], 1.6, "y", P, 16),
    ledDot: dots([[x1 - 6, FRONT, 16.5]]),
  };
}

const [M1X, M2X, M3X, M4X, M5X] = MODULE_XS as [number, number, number, number, number];

// 01 Trigger: the QuickBooks tile from the catalogue, seated in its socket.
export const TRIGGER_ART = {
  ...moduleBase(M1X, [20, 13]),
  socket: planOutline({ x: M1X - 9, y: -9, w: 18, d: 18, r: 1.2 }, TOP, P, 2),
  tile: solid({ x: M1X - 7, y: -7, w: TILE, d: TILE, r: 1 }, TOP, TILE_H, 2, 0.3),
  tileFace: topMatrix([M1X - 7, -7], TOP + TILE_H, P, "x"),
};

// 02 Typed record: four fields, each a label and a value box.
const FIELD_YS = [-13, -5, 3, 11];
const FIELD_FILL = [18, 12, 15, 9];
const M2X0 = M2X - MODULE_W / 2;
export const RECORD_ART = {
  ...moduleBase(M2X, [16, 22]),
  labels: join(FIELD_YS.map((y) => lineOnTop([M2X0 + 7, y], [M2X0 + 16, y], TOP, P))),
  boxes: join(FIELD_YS.map((y) => planOutline({ x: M2X0 + 20, y: y - 2.6, w: 28, d: 5.2, r: 0.6 }, TOP, P, 2))),
  fills: FIELD_YS.map((y, index) => lineOnTop([M2X0 + 22, y], [M2X0 + 22 + FIELD_FILL[index]!, y], TOP, P)),
};

// 03 AI: a scan head on rails over a window, under a glass hood (its scope).
const M3X0 = M3X - MODULE_W / 2;
const M3X1 = M3X + MODULE_W / 2;
const HOOD = { x0: M3X0 + 2, x1: M3X1 - 2, y0: -FRONT + 2, y1: FRONT - 2, z0: TOP, z1: TOP + HOOD_H };
const HP = 2.4; // hood post
const hoodPost = (x: number, y: number) => solid({ x, y, w: HP, d: HP, r: 0.4 }, HOOD.z0, HOOD.z1 - HOOD.z0, 2, 0.2);
export const SCAN_RUN = 8; // the head travels ± this far along y
export const AI_ART = {
  ...moduleBase(M3X, [22, 14]),
  window: planOutline({ x: M3X - 18, y: -12, w: 36, d: 24, r: 1.2 }, TOP, P, 2),
  windowInner: planOutline({ x: M3X - 16.5, y: -10.5, w: 33, d: 21, r: 0.8 }, TOP, P, 2),
  rails: [M3X - 21, M3X + 19].map((x) => solid({ x, y: -12, w: 2, d: 24, r: 0.4 }, TOP, 1.2, 2)),
  // The head, built at y = 0; it moves along y.
  bar: solid({ x: M3X - 21, y: -1.6, w: 42, d: 3.2, r: 0.6 }, TOP + 1.2, 1.6, 2, 0.3),
  reader: solid({ x: M3X - 4.5, y: -3.5, w: 9, d: 7, r: 1 }, TOP + 2.8, 4.4, 2, 0.4),
  hood: {
    backPane: rectY(HOOD.x0 + HP, HOOD.x1 - HP, HOOD.y0 + 0.6, HOOD.z0, HOOD.z1 - HP),
    leftPane: rectX(HOOD.x0 + 0.6, HOOD.y0 + HP, HOOD.y1 - HP, HOOD.z0, HOOD.z1 - HP),
    frontPane: rectY(HOOD.x0 + HP, HOOD.x1 - HP, HOOD.y1 - 0.6, HOOD.z0, HOOD.z1 - HP),
    rightPane: rectX(HOOD.x1 - 0.6, HOOD.y0 + HP, HOOD.y1 - HP, HOOD.z0, HOOD.z1 - HP),
    topPane: onTop([[HOOD.x0 + HP, HOOD.y0 + HP], [HOOD.x1 - HP, HOOD.y0 + HP], [HOOD.x1 - HP, HOOD.y1 - HP], [HOOD.x0 + HP, HOOD.y1 - HP]], HOOD.z1, P, true),
    backPosts: [hoodPost(HOOD.x0, HOOD.y0), hoodPost(HOOD.x1 - HP, HOOD.y0)],
    frontPosts: [hoodPost(HOOD.x0, HOOD.y1 - HP), hoodPost(HOOD.x1 - HP, HOOD.y1 - HP)],
    frame: [
      solid({ x: HOOD.x0, y: HOOD.y0, w: HOOD.x1 - HOOD.x0, d: HP, r: 0.4 }, HOOD.z1 - HP, HP, 2, 0.2),
      solid({ x: HOOD.x0, y: HOOD.y0 + HP, w: HP, d: HOOD.y1 - HOOD.y0 - 2 * HP, r: 0.3 }, HOOD.z1 - HP, HP, 2, 0.2),
      solid({ x: HOOD.x1 - HP, y: HOOD.y0 + HP, w: HP, d: HOOD.y1 - HOOD.y0 - 2 * HP, r: 0.3 }, HOOD.z1 - HP, HP, 2, 0.2),
      solid({ x: HOOD.x0, y: HOOD.y1 - HP, w: HOOD.x1 - HOOD.x0, d: HP, r: 0.4 }, HOOD.z1 - HP, HP, 2, 0.2),
    ],
  },
};

// 04 Approval: a key switch on top; a gate on the outgoing connector.
const KEY: Plane = [M4X + 12, -8];
// Far enough along the connector for a chip to wait in front of it.
const GATE_X = M4X + MODULE_W / 2 + 18;
const GATE_POST = 2.4;
const GATE_TOP = 24;
export const GATE_RISE = 8;
export const APPROVAL_ART = {
  ...moduleBase(M4X, [20, 15]),
  barrel: round(KEY[0], KEY[1], 3.4, TOP, 2.4, 28),
  barrelKnurl: knurl(KEY[0], KEY[1], 3.4, TOP, TOP + 2.4, 22, P),
  keyIn: solid({ x: KEY[0] - 0.6, y: KEY[1] - 2.6, w: 1.2, d: 5.2, r: 0.4 }, TOP + 2.4, 5, 2), // locked
  keyTurned: solid({ x: KEY[0] - 2.6, y: KEY[1] - 0.6, w: 5.2, d: 1.2, r: 0.4 }, TOP + 2.4, 5, 2), // turned: approved
  lamp: dots([[M4X - 12, -8, TOP]]),
  lampRing: ring(M4X - 12, -8, 1.8, TOP, P, 16),
  gateBackPost: solid({ x: GATE_X - GATE_POST / 2, y: TRACK_Y0 - 3.4, w: GATE_POST, d: GATE_POST, r: 0.4 }, 0, GATE_TOP, 2, 0.3),
  gateFrontPost: solid({ x: GATE_X - GATE_POST / 2, y: TRACK_D / 2 + 1, w: GATE_POST, d: GATE_POST, r: 0.4 }, 0, GATE_TOP, 2, 0.3),
  gateHeader: solid({ x: GATE_X - 1.8, y: TRACK_Y0 - 3.8, w: 3.6, d: TRACK_D + 7.6, r: 0.5 }, GATE_TOP, 2.4, 2, 0.3),
  // Built closed: it rests on the track and rises GATE_RISE on approval.
  gate: solid({ x: GATE_X - 0.8, y: TRACK_Y0 - 1, w: 1.6, d: TRACK_D + 2, r: 0.3 }, TRACK_H, 9, 2, 0.3),
};
export const GATE_AT = GATE_X;

// 05 (with 04) Status update: a three-position selector on top.
const DIAL: Plane = [M5X + 8, 0];
const DIAL_R = 8;
const pointer = (angle: number) => lineOnTop([DIAL[0], DIAL[1]], [DIAL[0] + Math.sin(angle) * (DIAL_R - 2.6), DIAL[1] - Math.cos(angle) * (DIAL_R - 2.6)], TOP + 1.2, P);
const DIAL_ANGLES = [-1.05, 0, 1.05]; // draft, in review, approved
export const UPDATE_ART = {
  ...moduleBase(M5X, [18, 24]),
  dial: round(DIAL[0], DIAL[1], DIAL_R, TOP, 1.2, 40),
  ticks: join(DIAL_ANGLES.map((a) => lineOnTop([DIAL[0] + Math.sin(a) * (DIAL_R - 1.4), DIAL[1] - Math.cos(a) * (DIAL_R - 1.4)], [DIAL[0] + Math.sin(a) * (DIAL_R - 0.2), DIAL[1] - Math.cos(a) * (DIAL_R - 0.2)], TOP + 1.2, P))),
  pointerDraft: pointer(DIAL_ANGLES[0]!),
  pointerApproved: pointer(DIAL_ANGLES[2]!),
  hub: round(DIAL[0], DIAL[1], 1.6, TOP + 1.2, 1.2, 16),
  rules: rulesY(M5X - MODULE_W / 2 + 27, [18, 24], FRONT, 16.5, 4),
};

/* --------------------------------------- 05: the run log behind the row */

const PANEL_FRONT = PANEL.y + PANEL.d;
const CELL = { half: 22, z0: PANEL_Z0 + 4, z1: PANEL_Z1 - 4 };
export const LOG_ART = {
  legs: [PANEL.x + 12, PANEL.x + PANEL.w - 16].map((x) => solid({ x, y: PANEL.y, w: 4, d: PANEL.d, r: 0.5 }, 0, PANEL_Z0, 2, 0.3)),
  feet: [PANEL.x + 12, PANEL.x + PANEL.w - 16].map((x) => solid({ x: x - 3, y: PANEL.y - 3, w: 10, d: PANEL.d + 6, r: 1 }, 0, 1.2, 2)),
  body: solid(PANEL, PANEL_Z0, PANEL_Z1 - PANEL_Z0, 2, 0.5),
  // A groove along the top, running end to end (a texture never stops short).
  topGroove: lineOnTop([PANEL.x, PANEL.y + PANEL.d / 2], [PANEL.x + PANEL.w, PANEL.y + PANEL.d / 2], PANEL_Z1, P),
  cells: MODULE_XS.map((cx) => ({
    frame: rectY(cx - CELL.half, cx + CELL.half, PANEL_FRONT, CELL.z0, CELL.z1),
    lamp: dots([[cx - CELL.half + 4, PANEL_FRONT, CELL.z1 - 4]]),
    lampRing: sideRing([cx - CELL.half + 4, PANEL_FRONT, CELL.z1 - 4], 1.5, "y", P, 14),
    lines: rulesY(cx - CELL.half + 9, [26, 18, 22], PANEL_FRONT, CELL.z1 - 4, 4.4),
    sign: seg([cx + CELL.half - 14, PANEL_FRONT, CELL.z0 + 4], [cx + CELL.half - 5, PANEL_FRONT, CELL.z0 + 4]),
  })),
};

/* ------------------------------------------- labels: where each one lands */

/** The point on each labelled part where its leader ends, in screen units. */
export const ANCHORS = {
  catalogue: at([TRAY.x + TRAY.w / 2, TRAY.y + 8, TRAY_H]),
  record: at([M2X, FRONT, 4]),
  ai: at([M3X, FRONT, 4]),
  approval: at([M4X, FRONT, 4]),
  log: at([PANEL.x + PANEL.w - 40, PANEL.y + PANEL.d / 2, PANEL_Z1]),
  boundary: at([RIM.x + 30, RIM.y + RIM.d, RIM_H]),
};

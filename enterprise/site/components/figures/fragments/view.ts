import { boxCorners, fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

/*
 * World layout for the problem figure: claim #4821 as it lives today, in
 * four tools on one desk, with an outside AI tool on a side table of its
 * own. Units of about 1 px; x runs right and down on screen, y toward the
 * viewer (left and down), z up. Screens face +y.
 */

export const WIDTH = 760;
export const HEIGHT = 470;
export const AZIMUTH = 56;

export const DESK: Plan = { x: -160, y: -74, w: 252, d: 140, r: 10 };
export const DESK_H = 10;
export const FOOT_H = 6;
export const FLOOR = -DESK_H - FOOT_H;

/* Legacy tracker: a two-drawer filing cabinet, its top drawer pulled open. */
export const CABINET: Plan = { x: -150, y: -66, w: 56, d: 46, r: 2.5 };
export const CABINET_TOP = 67;
export const DRAWER_OUT = 16;

/* Spreadsheet: a monitor on a stand. The housing's front face is at y + d. */
export const MONITOR = { x0: -60, x1: 56, y: -60, d: 6, z0: 24, z1: 92 };

/* Inbox: a two-tier letter tray, the receipt on the upper tier. */
export const TRAY: Plan = { x: -152, y: 6, w: 70, d: 50, r: 2 };

/* Chat: a tablet standing in a dock. */
export const DOCK: Plan = { x: -66, y: 22, w: 52, d: 18, r: 3 };
export const TABLET = { x0: -62, x1: -18, y: 27, d: 3.5, z0: 5, z1: 65 };

/* Operations log: an open ledger on a desk mat, a pen beside it. */
export const MAT: Plan = { x: -8, y: 4, w: 96, d: 58, r: 4 };
export const BOOK = { x0: 2, x1: 80, y0: 10, y1: 56 };

/* The outside AI tool: a laptop on a pedestal side table, off the desk. */
export const TABLE = { cx: 154, cy: -8, r: 42 };
export const LAPTOP: Plan = { x: 122, y: -24, w: 64, d: 38, r: 3 };
export const LID = { y: -26, d: 2.4, z1: 45 };

export const P = fitProjection(
  [
    ...boxCorners(DESK, FLOOR, 0),
    ...boxCorners({ x: MONITOR.x0, y: MONITOR.y, w: MONITOR.x1 - MONITOR.x0, d: MONITOR.d, r: 0 }, 0, MONITOR.z1),
    ...boxCorners(CABINET, 0, CABINET_TOP + 18),
    ...boxCorners({ x: TABLE.cx - TABLE.r, y: TABLE.cy - TABLE.r, w: TABLE.r * 2, d: TABLE.r * 2, r: 0 }, FLOOR, 0),
    ...boxCorners(LAPTOP, 0, LID.z1),
  ],
  WIDTH,
  HEIGHT,
  { pad: 28, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);

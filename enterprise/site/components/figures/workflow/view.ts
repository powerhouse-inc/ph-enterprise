import { boxCorners, fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

/*
 * World layout for the workflow figure, in units of about 1 px. x runs along
 * the workflow (left to right on screen), y toward the front, z up.
 *
 *   connector catalogue ─▶ │ trigger ─▶ typed record ─▶ AI (scoped) ─▶
 *   approval gate ─▶ status update │      run log behind, one cell per step
 *
 * The rim around the modules is the boundary: the workflow runs inside it.
 */

export const WIDTH = 760;
export const HEIGHT = 400;
export const AZIMUTH = 56;

export const PLINTH: Plan = { x: -266, y: -66, w: 506, d: 118, r: 12 };
export const PLINTH_H = 12;
export const FOOT_H = 6;

/* The boundary: a low rim on the board, with a port for the trigger. */
export const RIM: Plan = { x: -196, y: -60, w: 426, d: 104, r: 4 };
export const RIM_T = 3;
export const RIM_H = 6;
export const PORT_D = 12; // the port's width along y, centred on y = 0

/* The connector catalogue: a tray of piece tiles outside the boundary. */
export const TRAY: Plan = { x: -258, y: -42, w: 50, d: 84, r: 3 };
export const TRAY_H = 7;
export const TILE = 13;
export const TILE_H = 2.4;

/* The workflow: five piece modules along x, joined by connectors. */
export const MODULE_W = 60;
export const MODULE_D = 44;
export const MODULE_H = 26;
export const MODULE_XS = [-150, -66, 18, 102, 186]; // centres
export const TRACK_D = 6;
export const TRACK_H = 7;

/* Step 03's module stands under a glass hood: its scope. */
export const HOOD_H = 22;

/* The run log: a panel on legs behind the modules, one cell per module. */
export const PANEL: Plan = { x: -180, y: -54, w: 396, d: 5, r: 1 };
export const PANEL_Z0 = 34;
export const PANEL_Z1 = 54;

export const P = fitProjection(
  [
    ...boxCorners(PLINTH, -PLINTH_H - FOOT_H, 0),
    ...boxCorners(PANEL, 0, PANEL_Z1 + 2),
    ...boxCorners({ x: MODULE_XS[2]! - MODULE_W / 2, y: -MODULE_D / 2, w: MODULE_W, d: MODULE_D, r: 0 }, 0, MODULE_H + HOOD_H + 2),
  ],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);

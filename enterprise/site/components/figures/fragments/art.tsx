import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import type { Point3 } from "@/components/iso/iso-kit";
import { buildLabels } from "../labels";
import {
  ANCHORS,
  BOOK_ART,
  CABINET_ART,
  COPIES,
  DESK_ART,
  LAPTOP_ART,
  MONITOR_ART,
  TABLE_ART,
  TABLET_ART,
  TRAY_ART,
  type Recess,
} from "./geometry";
import { FragmentsLive } from "./live";
import { LABELS } from "./model";
import { HEIGHT, WIDTH } from "./view";

/*
 * Static parts in painter's order (back to front), handed to the live
 * component as keyed element props.
 *   data-part="…"   a group whose solids take the accent while that part is lit
 *   data-key="…"    a line that is the piece itself (receipt, amounts, …):
 *                   in the accent while its part is lit
 *   data-chip / data-copy / fr-check / fr-missing
 *                   switched or moved by the live component
 */

/** A line that is part of the claim, lit with its part. */
const Key = ({ d, part, free = true, className }: { d: string; part: string; free?: boolean; className?: string }) => (
  <path className={className ? `iso-line ${className}` : "iso-line"} data-tone="hi" data-free={free ? "" : undefined} data-key={part} d={d} />
);

/** A screen set into a face: inner walls, glass, the content in the face's plane, its rim. */
function Screen({ id, recess, children }: { id: string; recess: Recess; children: React.ReactNode }) {
  return (
    <>
      <clipPath id={id}>
        <path transform={recess.face} d={recess.shape} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path className="iso-top" d={recess.tops} />
        {recess.sides.map((d, shade) => (d ? <path key={shade} className="iso-shade" data-shade={shade} d={d} /> : null))}
        <g transform={recess.back}>
          <path className="fr-glass" d={recess.shape} />
          {children}
          <path className="iso-line" data-tone="faint" d={recess.shape} />
        </g>
      </g>
      <g transform={recess.face}>
        <path className="iso-line" data-tone="lo" d={recess.shape} />
      </g>
    </>
  );
}

function drawer(art: typeof CABINET_ART.low) {
  return (
    <>
      <Solid paths={art.front} tone="mid" crease="faint" />
      <Line d={art.holder} tone="lo" />
      <Line d={art.holderRule} tone="lo" free />
      <Dots points={art.rivets} size={0.45} tone="mid" />
      {art.posts.map((paths, index) => (
        <Solid key={index} paths={paths} tone="mid" crease="none" />
      ))}
      <Solid paths={art.bar} tone="mid" crease="none" />
    </>
  );
}

function tier(art: typeof TRAY_ART.lower, part: "back" | "front") {
  return part === "back" ? (
    <g data-part="inbox">
      <Solid paths={art.floor} tone="mid" crease="faint" />
      <Solid paths={art.back} tone="mid" crease="none" />
      <Solid paths={art.left} tone="mid" crease="none" />
    </g>
  ) : (
    <g data-part="inbox">
      <Solid paths={art.right} tone="mid" crease="none" />
      <Solid paths={art.front} tone="mid" crease="none" />
    </g>
  );
}

const DESK = (
  <g key="desk">
    <path className="iso-halo" d={DESK_ART.halo} />
    {DESK_ART.feet.map(([flange, foot], index) => (
      <g key={index}>
        <Solid paths={flange!} tone="mid" crease="faint" />
        <Solid paths={foot!} tone="mid" crease="faint" />
      </g>
    ))}
    <Solid paths={DESK_ART.slab} tone="mid" crease="faint" />
    <Line d={DESK_ART.band} tone="faint" />
    <Solid paths={DESK_ART.mat} tone="mid" crease="none" />
    <Line d={DESK_ART.stitch} tone="faint" />
    <Line d={DESK_ART.grommet} tone="lo" />
    <path className="fr-hole" d={DESK_ART.hole} />
  </g>
);

const CABINET_BACK = (
  <g key="cabinet-back">
    <path className="iso-halo" d={CABINET_ART.halo} />
    <g data-part="tracker">
      <Solid paths={CABINET_ART.plinth} tone="mid" crease="faint" />
      <Solid paths={CABINET_ART.body} tone="mid" crease="faint" />
      <Solid paths={CABINET_ART.cap} tone="mid" crease="faint" />
      {drawer(CABINET_ART.low)}
    </g>
    <Line d={CABINET_ART.seam} tone="faint" />
    <Line d={CABINET_ART.lock} tone="lo" />
    <Line d={CABINET_ART.lockSlot} tone="mid" />
    <path className="fr-recess" d={CABINET_ART.opening} />
    <Line d={CABINET_ART.opening} tone="lo" />
    <Solid paths={CABINET_ART.drawerFloor} tone="mid" crease="none" />
    <Solid paths={CABINET_ART.drawerLeft} tone="mid" crease="none" />
  </g>
);

const CARD = (
  <g key="card">
    <Solid paths={CABINET_ART.card} tone="hi" crease="none" />
    <Solid paths={CABINET_ART.cardTab} tone="hi" crease="none" />
    <Line d={CABINET_ART.cardRules} tone="lo" free />
    <Key d={CABINET_ART.ring} part="tracker" free={false} />
    <Key d={CABINET_ART.check} part="tracker" className="fr-check" />
  </g>
);

const CABINET_FRONT = (
  <g key="cabinet-front">
    <Solid paths={CABINET_ART.drawerRight} tone="mid" crease="none" />
    <g data-part="tracker">{drawer(CABINET_ART.high)}</g>
  </g>
);

const MONITOR = (
  <g key="monitor">
    <Solid paths={MONITOR_ART.base} tone="mid" crease="faint" />
    <path className="iso-line fr-cable" data-tone="mid" d={DESK_ART.cable} />
    <Solid paths={MONITOR_ART.neck} tone="mid" crease="faint" />
    <g data-part="sheet">
      <Solid paths={MONITOR_ART.housing} tone="mid" crease="faint" />
    </g>
    <Screen id="fr-screen-sheet" recess={MONITOR_ART.recess}>
      <image
        href="/logos/activepieces/google-sheets.svg"
        x={MONITOR_ART.logo.x}
        y={MONITOR_ART.logo.y}
        width={MONITOR_ART.logo.size}
        height={MONITOR_ART.logo.size}
        preserveAspectRatio="xMidYMid meet"
      />
      <Line d={MONITOR_ART.title} tone="lo" free />
      <Line d={MONITOR_ART.bar} tone="lo" />
      <Line d={MONITOR_ART.grid} tone="faint" />
      <Line d={MONITOR_ART.heads} tone="lo" free />
      <Line d={MONITOR_ART.numbers} tone="lo" free />
      <Line d={MONITOR_ART.cells} tone="lo" free />
      <Key d={MONITOR_ART.amounts} part="sheet" />
      <Key d={MONITOR_ART.amountsBox} part="sheet" free={false} className="fr-key-box" />
    </Screen>
    <Line d={MONITOR_ART.ledRing} tone="lo" />
    <Dots points={[MONITOR_ART.led]} size={0.6} tone="mid" />
  </g>
);

const TRAY = (
  <g key="tray">
    <path className="iso-halo" d={TRAY_ART.halo} />
    {tier(TRAY_ART.lower, "back")}
    {TRAY_ART.envelopes.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    {TRAY_ART.posts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    {tier(TRAY_ART.lower, "front")}
    {tier(TRAY_ART.upper, "back")}
    <Solid paths={TRAY_ART.envelope} tone="mid" crease="none" />
    <Line d={TRAY_ART.flap} tone="lo" />
    <Solid paths={TRAY_ART.receipt} tone="hi" crease="none" />
    <Key d={TRAY_ART.receiptRules} part="inbox" />
    <Line d={TRAY_ART.receiptTotal} tone="lo" />
    <Key d={TRAY_ART.receiptSum} part="inbox" />
    {tier(TRAY_ART.upper, "front")}
    <Line d={TRAY_ART.badge} tone="lo" />
    <g transform={TRAY_ART.logo}>
      <image href="/logos/activepieces/gmail.svg" x={2.5} y={0.5} width={7} height={7} preserveAspectRatio="xMidYMid meet" />
    </g>
  </g>
);

const TABLET = (
  <g key="tablet">
    <Solid paths={TABLET_ART.dock} tone="mid" crease="faint" />
    <Line d={TABLET_ART.slot} tone="lo" />
    <g data-part="chat">
      <Solid paths={TABLET_ART.body} tone="mid" crease="faint" />
    </g>
    <Screen id="fr-screen-chat" recess={TABLET_ART.recess}>
      <image
        href="/logos/activepieces/slack.svg"
        x={TABLET_ART.logo.x}
        y={TABLET_ART.logo.y}
        width={TABLET_ART.logo.size}
        height={TABLET_ART.logo.size}
        preserveAspectRatio="xMidYMid meet"
      />
      <Line d={TABLET_ART.channel} tone="lo" free />
      <Line d={TABLET_ART.head} tone="faint" />
      <Line d={TABLET_ART.avatars} tone="lo" />
      <Line d={TABLET_ART.messages} tone="lo" free />
      <Key d={TABLET_ART.approval} part="chat" free={false} />
      <Key d={TABLET_ART.approvalCheck} part="chat" />
      <Line d={TABLET_ART.approvalRule} tone="lo" free />
      <Line d={TABLET_ART.input} tone="faint" />
    </Screen>
    <Dots points={[TABLET_ART.camera]} size={0.45} tone="mid" />
  </g>
);

const BOOK = (
  <g key="book">
    <g data-part="log">
      <Solid paths={BOOK_ART.cover} tone="mid" crease="faint" />
      <Solid paths={BOOK_ART.left} tone="mid" crease="faint" />
      <Solid paths={BOOK_ART.right} tone="mid" crease="faint" />
    </g>
    <Line d={BOOK_ART.title} tone="lo" free />
    <Line d={BOOK_ART.heads} tone="lo" free />
    <Line d={BOOK_ART.headRule} tone="lo" />
    <Line d={BOOK_ART.rows} tone="faint" />
    <Line d={BOOK_ART.columns} tone="faint" />
    <path className="iso-line fr-missing" data-tone="hi" d={BOOK_ART.missing} />
    <Solid paths={BOOK_ART.ribbon} tone="mid" crease="none" />
    <Solid paths={BOOK_ART.ribbonTail} tone="mid" crease="none" />
    <Solid paths={BOOK_ART.pen} tone="mid" crease="faint" />
    <Solid paths={BOOK_ART.penClip} tone="mid" crease="none" />
    <Solid paths={BOOK_ART.penTip} tone="mid" crease="none" />
  </g>
);

const LAPTOP = (
  <g key="laptop">
    <path className="iso-halo" d={TABLE_ART.halo} />
    <Solid paths={TABLE_ART.foot} tone="mid" crease="faint" />
    <Solid paths={TABLE_ART.column} tone="mid" crease="none" />
    <Solid paths={TABLE_ART.top} tone="mid" crease="faint" />
    <g data-part="kiosk">
      <Solid paths={LAPTOP_ART.base} tone="mid" crease="faint" />
    </g>
    <Line d={LAPTOP_ART.keys} tone="lo" />
    <Line d={LAPTOP_ART.trackpad} tone="lo" />
    <g data-part="kiosk">
      <Solid paths={LAPTOP_ART.lid} tone="mid" crease="faint" />
    </g>
    <Screen id="fr-screen-ai" recess={LAPTOP_ART.recess}>
      <path className="fr-spark" d={LAPTOP_ART.spark} />
      <Line d={LAPTOP_ART.title} tone="lo" free />
      <Line d={LAPTOP_ART.head} tone="faint" />
      {LAPTOP_ART.chips.map((chip, index) =>
        index < 2 ? (
          <g key={index} data-chip={index} data-filled="">
            <path className="iso-line fr-chip-empty" data-tone="lo" data-dashed="" d={chip.frame} />
            <path className="iso-line fr-chip-frame" data-tone="lo" d={chip.frame} />
            <Key d={chip.fill} part="kiosk" className="fr-chip-fill" />
          </g>
        ) : (
          <Line key={index} d={chip.frame} tone="lo" dashed />
        ),
      )}
      <Line d={LAPTOP_ART.answer} tone="lo" />
      <Line d={LAPTOP_ART.answerRules} tone="lo" free />
      <Line d={LAPTOP_ART.input} tone="faint" />
    </Screen>
    <Dots points={[LAPTOP_ART.camera]} size={0.45} tone="mid" />
  </g>
);

const COPY_LAYERS = COPIES.map((copy, index) => (
  <g key={`copy-${index}`} data-copy={index} opacity={0}>
    <g data-part={`copy${index}`}>
      <Solid paths={copy.art.body} tone="hi" crease="none" />
    </g>
    <Key d={copy.art.rules} part={`copy${index}`} />
  </g>
));

/** How far each copy travels, source to chip. */
const FLIGHTS = COPIES.map(({ from, to }) => [to[0] - from[0], to[1] - from[1], to[2] - from[2]] as Point3);

const { spots: LABEL_SPOTS, leaders: LEADERS } = buildLabels(LABELS, ANCHORS, WIDTH, HEIGHT);

export function FragmentsArt({ label, intro }: { label: string; intro?: React.ReactNode }) {
  return (
    <FragmentsLive
      label={label}
      intro={intro}
      labels={LABEL_SPOTS}
      flights={FLIGHTS}
      layers={{
        back: [DESK, CABINET_BACK],
        card: CARD,
        front: [CABINET_FRONT, MONITOR, TRAY, TABLET, BOOK, LAPTOP],
        copies: COPY_LAYERS,
        last: [LEADERS],
      }}
    />
  );
}

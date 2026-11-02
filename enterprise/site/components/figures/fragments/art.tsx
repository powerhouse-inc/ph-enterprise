import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import {
  BOOK_ART,
  CABINET_ART,
  DESK_ART,
  LAPTOP_ART,
  MONITOR_ART,
  TABLE_ART,
  TABLET_ART,
  TAGS,
  TRAY_ART,
  type Recess,
  type TagSpec,
} from "./geometry";
import { DESC, TITLE } from "./model";
import { HEIGHT, WIDTH } from "./view";

/*
 * The problem figure as one still frame, drawn on the diagram-design
 * axonometric-plan rules: shaded boxes in 2:1 dimetric, no shadows, one
 * focal object (the outside AI tool, in the accent), and a name tag on each
 * object, painted last. Server-rendered; no script.
 */

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
    <>
      <Solid paths={art.floor} tone="mid" crease="faint" />
      <Solid paths={art.back} tone="mid" crease="none" />
      <Solid paths={art.left} tone="mid" crease="none" />
    </>
  ) : (
    <>
      <Solid paths={art.right} tone="mid" crease="none" />
      <Solid paths={art.front} tone="mid" crease="none" />
    </>
  );
}

/* ------------------------------------------- solids, back to front */

const DESK = (
  <g>
    {DESK_ART.feet.map(([flange, foot], index) => (
      <g key={index}>
        <Solid paths={flange!} tone="mid" crease="faint" />
        <Solid paths={foot!} tone="mid" crease="faint" />
      </g>
    ))}
    <Solid paths={DESK_ART.slab} tone="mid" crease="faint" />
    <Line d={DESK_ART.band} tone="faint" />
    <Solid paths={DESK_ART.mat} tone="mid" crease="none" />
  </g>
);

const CABINET_BACK = (
  <g>
    <Solid paths={CABINET_ART.plinth} tone="mid" crease="faint" />
    <Solid paths={CABINET_ART.body} tone="mid" crease="faint" />
    <Solid paths={CABINET_ART.cap} tone="mid" crease="faint" />
    {drawer(CABINET_ART.low)}
    <Line d={CABINET_ART.seam} tone="faint" />
    <Line d={CABINET_ART.lock} tone="lo" />
    <Line d={CABINET_ART.lockSlot} tone="mid" />
    <path className="fr-recess" d={CABINET_ART.opening} />
    <Line d={CABINET_ART.opening} tone="lo" />
    <Solid paths={CABINET_ART.drawerFloor} tone="mid" crease="none" />
    <Solid paths={CABINET_ART.drawerLeft} tone="mid" crease="none" />
  </g>
);

/* The status card, standing in the open drawer: marked paid. */
const CARD = (
  <g>
    <Solid paths={CABINET_ART.card} tone="hi" crease="none" />
    <Solid paths={CABINET_ART.cardTab} tone="hi" crease="none" />
    <Line d={CABINET_ART.cardRules} tone="lo" free />
    <Line d={CABINET_ART.ring} tone="hi" />
    <Line d={CABINET_ART.check} tone="hi" free />
  </g>
);

const CABINET_FRONT = (
  <g>
    <Solid paths={CABINET_ART.drawerRight} tone="mid" crease="none" />
    {drawer(CABINET_ART.high)}
  </g>
);

const MONITOR = (
  <g>
    <Solid paths={MONITOR_ART.base} tone="mid" crease="faint" />
    <Solid paths={MONITOR_ART.neck} tone="mid" crease="faint" />
    <Solid paths={MONITOR_ART.housing} tone="mid" crease="faint" />
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
      <Line d={MONITOR_ART.amounts} tone="hi" free />
    </Screen>
  </g>
);

const TRAY = (
  <g>
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
    <Line d={TRAY_ART.receiptRules} tone="hi" free />
    <Line d={TRAY_ART.receiptTotal} tone="lo" />
    <Line d={TRAY_ART.receiptSum} tone="hi" free />
    {tier(TRAY_ART.upper, "front")}
    <Line d={TRAY_ART.badge} tone="lo" />
    <g transform={TRAY_ART.logo}>
      <image href="/logos/activepieces/gmail.svg" x={2.5} y={0.5} width={7} height={7} preserveAspectRatio="xMidYMid meet" />
    </g>
  </g>
);

const TABLET = (
  <g>
    <Solid paths={TABLET_ART.dock} tone="mid" crease="faint" />
    <Line d={TABLET_ART.slot} tone="lo" />
    <Solid paths={TABLET_ART.body} tone="mid" crease="faint" />
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
      <Line d={TABLET_ART.approval} tone="hi" />
      <Line d={TABLET_ART.approvalCheck} tone="hi" free />
      <Line d={TABLET_ART.approvalRule} tone="lo" free />
      <Line d={TABLET_ART.input} tone="faint" />
    </Screen>
  </g>
);

/* The change log: ruled columns, and a dashed empty row where the change to paid should be. */
const BOOK = (
  <g>
    <Solid paths={BOOK_ART.cover} tone="mid" crease="faint" />
    <Solid paths={BOOK_ART.left} tone="mid" crease="faint" />
    <Solid paths={BOOK_ART.right} tone="mid" crease="faint" />
    <Line d={BOOK_ART.title} tone="lo" free />
    <Line d={BOOK_ART.heads} tone="lo" free />
    <Line d={BOOK_ART.headRule} tone="lo" />
    <Line d={BOOK_ART.rows} tone="faint" />
    <Line d={BOOK_ART.columns} tone="faint" />
    <Line d={BOOK_ART.missing} tone="hi" dashed />
  </g>
);

/* The focal object: the outside AI tool, on a table of its own, holding two of the four pieces. */
const LAPTOP = (
  <g>
    <Solid paths={TABLE_ART.foot} tone="mid" crease="faint" />
    <Solid paths={TABLE_ART.column} tone="mid" crease="none" />
    <Solid paths={TABLE_ART.top} tone="mid" crease="faint" />
    <Solid paths={LAPTOP_ART.base} tone="mid" crease="faint" lit />
    <Line d={LAPTOP_ART.keys} tone="lo" />
    <Line d={LAPTOP_ART.trackpad} tone="lo" />
    <Solid paths={LAPTOP_ART.lid} tone="mid" crease="faint" lit />
    <Screen id="fr-screen-ai" recess={LAPTOP_ART.recess}>
      <path className="fr-spark" d={LAPTOP_ART.spark} />
      <Line d={LAPTOP_ART.title} tone="lo" free />
      <Line d={LAPTOP_ART.head} tone="faint" />
      {LAPTOP_ART.chips.map((chip, index) =>
        index < 2 ? (
          <g key={index}>
            <Line d={chip.frame} tone="lo" />
            <path className="iso-line fr-accent" data-free="" d={chip.fill} />
          </g>
        ) : (
          <Line key={index} d={chip.frame} tone="lo" dashed />
        ),
      )}
      <Line d={LAPTOP_ART.answer} tone="lo" />
      <Line d={LAPTOP_ART.answerRules} tone="lo" free />
      <Line d={LAPTOP_ART.input} tone="faint" />
    </Screen>
  </g>
);

/* --------------------------------------------------------- the tags */

const TAG = { h: 32, name: 13, sub: 11, pad: 8 } as const;
const ceil4 = (value: number) => Math.ceil(value / 4) * 4;
/* The diagram-design width budget: 0.60 em a character in sans, 0.62 em in mono. */
const tagWidth = ({ name, sub }: TagSpec) => ceil4(Math.max(name.length * TAG.name * 0.6, sub.length * TAG.sub * 0.62) + TAG.pad * 2);
const tenth = (value: number) => Math.round(value * 10) / 10;

function Tag({ tag }: { tag: TagSpec }) {
  const width = tagWidth(tag);
  const [cx, cy] = tag.at;
  const top = tenth(cy - TAG.h / 2);
  return (
    <g className="fr-tag" data-role="tag" data-name={tag.name} data-focal={tag.focal ? "" : undefined}>
      <rect className="fr-tag-box" x={tenth(cx - width / 2)} y={top} width={width} height={TAG.h} rx={4} />
      <text className="fr-tag-name" x={tenth(cx)} y={tenth(top + 14)}>
        {tag.name}
      </text>
      <text className="fr-tag-sub" x={tenth(cx)} y={tenth(top + 27)}>
        {tag.sub}
      </text>
    </g>
  );
}

export function FragmentsDrawing() {
  return (
    <svg className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="fragments-title fragments-desc">
      <title id="fragments-title">{TITLE}</title>
      <desc id="fragments-desc">{DESC}</desc>
      {DESK}
      {CABINET_BACK}
      {CARD}
      {CABINET_FRONT}
      {MONITOR}
      {TRAY}
      {TABLET}
      {BOOK}
      {LAPTOP}
      <g>
        {TAGS.map((tag) => (
          <Tag key={tag.name} tag={tag} />
        ))}
      </g>
    </svg>
  );
}

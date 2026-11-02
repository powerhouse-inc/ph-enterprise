import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { buildLabels } from "../labels";
import {
  AI_ART,
  ANCHORS,
  APPROVAL_ART,
  CONNECTOR_ART,
  FEEDER_ART,
  LOG_ART,
  PLINTH_ART,
  RECORD_ART,
  RIM_ART,
  TRAY_ART,
  TRIGGER_ART,
  UPDATE_ART,
} from "./geometry";
import { WorkflowLive } from "./live";
import { LABELS } from "./model";
import { HEIGHT, WIDTH } from "./view";

/*
 * Static parts in painter's order (back to front), handed to the live
 * component as keyed element props.
 *   data-lit-step="n"   the step that lights this part in its accent.
 *   data-chip / data-field / data-key / data-pointer / data-cell
 *                       parts the live component moves or switches.
 */

type Base = typeof TRIGGER_ART;

/** The parts every module shares; `badge` is what sits in its badge frame. */
function moduleParts(art: Base | typeof RECORD_ART | typeof AI_ART | typeof APPROVAL_ART | typeof UPDATE_ART, step: number, badge: React.ReactNode) {
  return (
    <>
      <g data-lit-step={step}>
        <Solid paths={art.body} tone="mid" crease="faint" inner={<Line d={art.band} tone="faint" />} />
      </g>
      <Line d={art.groove} tone="faint" />
      <Dots points={art.screws} size={0.45} tone="mid" />
      <Line d={art.badge} tone="lo" />
      <g transform={art.badgeFace}>{badge}</g>
      <Line d={art.rules} tone="lo" free />
      <Line d={art.led} tone="lo" />
      <Dots points={art.ledDot} size={0.7} tone="mid" />
    </>
  );
}

const logo = (href: string) => (
  <image href={href} x={1.5} y={1.5} width={14} height={14} preserveAspectRatio="xMidYMid meet" />
);
const BOLT = <path className="iso-line" data-tone="hi" d="M9.8 2.2L4.4 9.4H8.4L7.2 14.8L12.6 7.2H8.6Z" />;
const CHECK = <path className="iso-line" data-tone="hi" data-free="" d="M4.2 9L7.4 12.2L12.8 5" />;

const chip = (art: (typeof CONNECTOR_ART)[number]["chip"], index: number) => (
  <g key={`chip-${index}`} data-chip={index} opacity={0}>
    <Solid paths={art.body} tone="hi" crease="none" />
    <Line d={art.rules} tone="lo" free />
  </g>
);

const PLINTH = (
  <g key="plinth">
    <path className="iso-halo" d={PLINTH_ART.halo} />
    {PLINTH_ART.feet.map(([flange, foot], index) => (
      <g key={index}>
        <Solid paths={flange!} tone="mid" crease="faint" />
        <Solid paths={foot!} tone="mid" crease="faint" />
      </g>
    ))}
    <Solid paths={PLINTH_ART.slab} tone="mid" crease="faint" />
    <Line d={PLINTH_ART.groove} tone="lo" />
    <Line d={PLINTH_ART.screwRings} tone="lo" />
    <Dots points={PLINTH_ART.screws} size={0.5} tone="mid" />
    <Dots points={PLINTH_ART.canvas} size={0.55} tone="lo" />
    <Solid paths={PLINTH_ART.plate} tone="lo" crease="none" />
    <Line d={PLINTH_ART.plateLine} tone="faint" />
    <Line d={PLINTH_ART.plateRule} tone="lo" free />
    <Dots points={PLINTH_ART.plateScrews} size={0.45} tone="mid" />
    <Solid paths={RIM_ART.back} tone="mid" crease="faint" />
    <Solid paths={RIM_ART.leftBack} tone="mid" crease="faint" />
  </g>
);

const TRAY = (
  <g key="tray">
    <Solid paths={TRAY_ART.floor} tone="mid" crease="faint" />
    <Solid paths={TRAY_ART.back} tone="mid" crease="faint" />
    <Solid paths={TRAY_ART.left} tone="mid" crease="faint" />
    {TRAY_ART.tiles.map((tile, index) =>
      tile.logo ? (
        <g key={index}>
          <Solid paths={tile.body!} tone="mid" crease="faint" />
          <g transform={tile.face}>
            <image href={tile.logo} x={1.8} y={1.8} width={10.4} height={10.4} preserveAspectRatio="xMidYMid meet" />
          </g>
        </g>
      ) : (
        <Line key={index} d={tile.slot!} tone="lo" />
      ),
    )}
    <Solid paths={TRAY_ART.right} tone="mid" crease="faint" />
    <Solid paths={TRAY_ART.front} tone="mid" crease="faint" />
  </g>
);

const LOG = (
  <g key="log">
    {LOG_ART.feet.map((paths, index) => (
      <Solid key={`f${index}`} paths={paths} tone="mid" crease="faint" />
    ))}
    {LOG_ART.legs.map((paths, index) => (
      <Solid key={`l${index}`} paths={paths} tone="mid" crease="faint" />
    ))}
    <g data-lit-step="5">
      <Solid paths={LOG_ART.body} tone="mid" crease="faint" />
    </g>
    <Line d={LOG_ART.topGroove} tone="faint" />
    {LOG_ART.cells.map((cell, index) => (
      <g key={index} data-cell={index}>
        <Line d={cell.frame} tone="lo" />
        <Line d={cell.lampRing} tone="lo" />
        <Dots points={cell.lamp} size={0.7} tone="mid" />
        <Line className="wf-entry" d={cell.lines} tone="faint" free />
        <Line className="wf-entry" d={cell.sign} tone="faint" free />
      </g>
    ))}
  </g>
);

const FEEDER = (
  <g key="feeder">
    <Solid paths={FEEDER_ART.track} tone="mid" crease="faint" />
    {chip(FEEDER_ART.chip, 0)}
    <Solid paths={RIM_ART.leftFront} tone="mid" crease="faint" />
  </g>
);

const TRIGGER = (
  <g key="trigger">
    {moduleParts(TRIGGER_ART, 1, BOLT)}
    <Line d={TRIGGER_ART.socket} tone="lo" />
    <g data-lit-step="1">
      <Solid paths={TRIGGER_ART.tile} tone="mid" crease="faint" />
    </g>
    <g transform={TRIGGER_ART.tileFace}>
      <image href="/logos/activepieces/quickbooks.svg" x={1.8} y={1.8} width={10.4} height={10.4} preserveAspectRatio="xMidYMid meet" />
    </g>
  </g>
);

const connector = (index: number) => {
  const art = CONNECTOR_ART[index]!;
  return (
    <g key={`connector-${index}`}>
      <Solid paths={art.track} tone="mid" crease="faint" />
      {art.button ? (
        <>
          <Line d={art.button.ring} tone="lo" />
          <Line d={art.button.plus} tone="mid" free />
        </>
      ) : null}
      {index < 3 ? chip(art.chip, index + 1) : null}
    </g>
  );
};

const RECORD = (
  <g key="record">
    {moduleParts(RECORD_ART, 2, logo("/logos/integrations/marks/powerhouse.svg"))}
    <Line d={RECORD_ART.labels} tone="lo" free />
    <Line d={RECORD_ART.boxes} tone="lo" />
    {RECORD_ART.fills.map((d, index) => (
      <path key={index} className="iso-line wf-fill" data-tone="hi" data-free="" data-field={index} d={d} />
    ))}
  </g>
);

const AI_BACK = (
  <g key="ai-back">
    {moduleParts(AI_ART, 3, logo("/logos/integrations/marks/ollama.svg"))}
    <Line d={AI_ART.window} tone="lo" />
    <Line d={AI_ART.windowInner} tone="faint" />
    {AI_ART.rails.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <path className="fig-glass" d={AI_ART.hood.backPane} />
    <path className="fig-glass" d={AI_ART.hood.leftPane} />
    {AI_ART.hood.backPosts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
  </g>
);

const HEAD = (
  <g key="head">
    <Solid paths={AI_ART.bar} tone="mid" crease="faint" />
    <g data-lit-step="3">
      <Solid paths={AI_ART.reader} tone="mid" crease="faint" />
    </g>
  </g>
);

const AI_FRONT = (
  <g key="ai-front">
    <path className="fig-glass" d={AI_ART.hood.rightPane} />
    <path className="fig-glass" d={AI_ART.hood.frontPane} />
    {AI_ART.hood.frontPosts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    {AI_ART.hood.frame.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <path className="fig-glass wf-hood-top" d={AI_ART.hood.topPane} />
  </g>
);

const APPROVAL = (
  <g key="approval">
    {moduleParts(APPROVAL_ART, 4, CHECK)}
    <Solid paths={APPROVAL_ART.barrel} tone="mid" crease="faint" />
    <Line d={APPROVAL_ART.barrelKnurl} tone="lo" />
    <g data-key="in">
      <Solid paths={APPROVAL_ART.keyIn} tone="hi" crease="none" />
    </g>
    <g data-key="turned" style={{ display: "none" }}>
      <Solid paths={APPROVAL_ART.keyTurned} tone="hi" crease="none" />
    </g>
    <Line d={APPROVAL_ART.lampRing} tone="lo" />
    <Dots points={APPROVAL_ART.lamp} size={0.7} tone="mid" />
  </g>
);

const GATE_BACK = (
  <g key="gate-back">
    {connector(3)}
    <Solid paths={APPROVAL_ART.gateBackPost} tone="mid" crease="faint" />
    {chip(CONNECTOR_ART[3]!.chip, 4)}
  </g>
);

const GATE = (
  <g key="gate" data-lit-step="4">
    <Solid paths={APPROVAL_ART.gate} tone="mid" crease="faint" />
  </g>
);

const GATE_FRONT = (
  <g key="gate-front">
    {chip(CONNECTOR_ART[3]!.chip, 5)}
    <Solid paths={APPROVAL_ART.gateFrontPost} tone="mid" crease="faint" />
    <Solid paths={APPROVAL_ART.gateHeader} tone="mid" crease="faint" />
  </g>
);

const UPDATE = (
  <g key="update">
    {moduleParts(UPDATE_ART, 4, logo("/logos/integrations/marks/powerhouse.svg"))}
    <Solid paths={UPDATE_ART.dial} tone="mid" crease="faint" />
    <Line d={UPDATE_ART.ticks} tone="mid" />
    <path className="iso-line" data-tone="hi" data-free="" data-pointer="draft" d={UPDATE_ART.pointerDraft} />
    <path className="iso-line wf-pointer" data-tone="hi" data-free="" data-pointer="approved" d={UPDATE_ART.pointerApproved} style={{ display: "none" }} />
    <Solid paths={UPDATE_ART.hub} tone="mid" crease="faint" />
  </g>
);

const RIM_FRONT = (
  <g key="rim-front">
    <Solid paths={RIM_ART.right} tone="mid" crease="faint" />
    <Solid paths={RIM_ART.front} tone="mid" crease="faint" />
    <Dots points={RIM_ART.screws} size={0.45} tone="mid" />
  </g>
);

const { spots: LABEL_SPOTS, leaders: LEADERS } = buildLabels(LABELS, ANCHORS, WIDTH, HEIGHT);

export function WorkflowArt({ label }: { label: string }) {
  return (
    <WorkflowLive
      label={label}
      labels={LABEL_SPOTS}
      layers={{
        back: [PLINTH, TRAY, LOG, FEEDER, TRIGGER, connector(0), RECORD, connector(1), AI_BACK],
        head: HEAD,
        middle: [AI_FRONT, connector(2), APPROVAL, GATE_BACK],
        gate: GATE,
        front: [GATE_FRONT, UPDATE, RIM_FRONT, LEADERS],
      }}
    />
  );
}

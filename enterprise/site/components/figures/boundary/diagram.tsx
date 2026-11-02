import "./boundary.css";
import {
  DESC,
  LOG,
  LOG_HEAD,
  NODES,
  STEPS,
  TALL,
  TITLE,
  WIDE,
  ZONE_LABEL,
  maskWidth,
  type Box,
  type Layout,
  type NodeId,
  type PathSpec,
} from "./model";

/*
 * How Powerhouse works, drawn with the diagram-design architecture grammar:
 * the boundary first, then the connectors, their labels on paper masks, and
 * the nodes last, so no line runs over a box. Static: no motion, no script.
 * Built on the server; the wide layout shows from 1024 px, the tall one below.
 */

const PAINT_ORDER: readonly NodeId[] = ["systems", "model", "approver", "record", "history", "frontier"];

/* A label plate: 14 tall for 11 px mono, kept 6 to 8 px off its connector. */
const MASK_H = 14;

function Zone({ zone }: { zone: Layout["zone"] }) {
  return (
    <g>
      <rect className="dd-zone" x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={8} />
      <rect className="dd-mask" x={zone.labelX} y={zone.labelY} width={maskWidth(ZONE_LABEL)} height={MASK_H} rx={2} />
      <text className="dd-zone-label" x={zone.labelX + 4} y={zone.labelY + 11}>
        {ZONE_LABEL}
      </text>
    </g>
  );
}

function PathLabel({ path }: { path: PathSpec }) {
  const width = maskWidth(path.label);
  const align = path.align ?? "start";
  const left = align === "start" ? path.lx : align === "end" ? path.lx - width : path.lx - width / 2;
  return (
    <g>
      <rect className="dd-mask" x={left} y={path.ly} width={width} height={MASK_H} rx={2} />
      <text className="dd-label" x={left + width / 2} y={path.ly + 11}>
        {path.label}
      </text>
    </g>
  );
}

/** The step number: a rectangular tag, not a pill. */
function StepTag({ box, step }: { box: Box; step: string }) {
  return (
    <>
      <rect className="dd-step" x={box.x + 8} y={box.y + 8} width={24} height={16} rx={2} />
      <text className="dd-step-text" x={box.x + 20} y={box.y + 20}>
        {step}
      </text>
    </>
  );
}

/** The operation history, with what it holds: each change, its author, and the author's signature. */
function HistoryNode({ box, columns }: { box: Box; columns: Layout["logColumns"] }) {
  const node = NODES.history;
  const head = box.y + 58;
  return (
    <g className="dd-node" data-kind={node.kind}>
      <rect className="dd-mask" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
      <rect className="dd-box" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
      <StepTag box={box} step={node.step} />
      <text className="dd-name dd-start" x={box.x + 40} y={box.y + 21}>
        {node.name}
      </text>
      <text className="dd-sub dd-start" x={box.x + 40} y={box.y + 38}>
        {node.sub}
      </text>
      {LOG_HEAD.map((cell, column) => (
        <text key={cell} className="dd-log-head" x={box.x + columns[column]!} y={head}>
          {cell}
        </text>
      ))}
      <line className="dd-log-rule" x1={box.x + 12} y1={head + 5} x2={box.x + box.w - 12} y2={head + 5} />
      {LOG.map((row, index) =>
        row.map((cell, column) => (
          <text key={`${index}-${column}`} className="dd-log" data-column={column} x={box.x + columns[column]!} y={head + 18 + index * 15}>
            {cell}
          </text>
        )),
      )}
    </g>
  );
}

function Node({ id, box, sub }: { id: NodeId; box: Box; sub?: string }) {
  const node = NODES[id];
  const nameY = box.y + (box.h > 64 ? 46 : 38);
  return (
    <g className="dd-node" data-kind={node.kind}>
      <rect className="dd-mask" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
      <rect className="dd-box" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
      <StepTag box={box} step={node.step} />
      <text className="dd-name" x={box.x + box.w / 2} y={nameY}>
        {node.name}
      </text>
      <text className="dd-sub" x={box.x + box.w / 2} y={nameY + 18}>
        {sub ?? node.sub}
      </text>
    </g>
  );
}

function Drawing({ layout, slug, className }: { layout: Layout; slug: string; className: string }) {
  const arrow = `${slug}-arrow`;
  return (
    <div className={`dd-scroll ${className}`}>
      <svg
        className="dd-svg"
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        style={{ minWidth: layout.width }}
        role="img"
        aria-labelledby={`${slug}-title ${slug}-desc`}
      >
        <title id={`${slug}-title`}>{TITLE}</title>
        <desc id={`${slug}-desc`}>{DESC}</desc>
        <defs>
          <marker id={arrow} markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
            <polygon className="dd-arrowhead" points="0 0, 8 3, 0 6" />
          </marker>
        </defs>
        <Zone zone={layout.zone} />
        {layout.paths.map((path) => (
          <path
            key={path.id}
            className="dd-path"
            data-stopped={path.stop ? "" : undefined}
            data-back={path.back ? "" : undefined}
            d={path.d}
            markerEnd={path.stop ? undefined : `url(#${arrow})`}
          />
        ))}
        {layout.paths.map((path) =>
          path.stop ? <line key={`${path.id}-stop`} className="dd-stop" {...path.stop} /> : null,
        )}
        {layout.paths.map((path) => (
          <PathLabel key={`${path.id}-label`} path={path} />
        ))}
        {PAINT_ORDER.map((id) =>
          id === "history" ? (
            <HistoryNode key={id} box={layout.nodes[id]} columns={layout.logColumns} />
          ) : (
            <Node key={id} id={id} box={layout.nodes[id]} sub={layout.subs?.[id]} />
          ),
        )}
      </svg>
    </div>
  );
}

/** The diagram and, beneath it, the five steps its numbered nodes answer. */
export function BoundaryDiagram() {
  return (
    <div className="dd-boundary">
      <figure className="dd-figure">
        <Drawing layout={WIDE} slug="boundary-wide" className="dd-wide" />
        <Drawing layout={TALL} slug="boundary-tall" className="dd-tall" />
      </figure>
      <ol className="dd-steps">
        {STEPS.map((step) => (
          <li key={step.num}>
            <p className="dd-step-head">
              <span className="dd-step-num">{step.num}</span>
              <span className="dd-step-title">{step.title}</span>
            </p>
            <p className="dd-step-body">{step.body}</p>
            {step.notes?.map((note) => (
              <p key={note} className="dd-step-note">
                {note}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}

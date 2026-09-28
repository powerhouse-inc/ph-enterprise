import { Check } from "lucide-react";

/**
 * The pattern every integration shares, drawn without naming any one of them:
 * a system you already run, the boundary it crosses, the typed document it
 * becomes, and the places that document can be read. The index hero uses it
 * so the pillar opens on the idea rather than on a single use case.
 *
 * Built in HTML rather than exported as an image so it stays crisp, uses the
 * site tokens, and reads to a screen reader as a list, not a picture.
 */
const SOURCES = [
  "Document archive",
  "Machine data",
  "Automation runs",
  "Research notes",
] as const;

const SURFACES = [
  "Operator workspace",
  "GraphQL API",
  "Dashboard",
  "Scoped agent",
] as const;

const FIELDS = [
  ["reference", "String"],
  ["status", "Enum"],
  ["source", "Link"],
] as const;

const LOG = [
  ["extract", "agent"],
  ["correct", "reviewer"],
  ["approve", "reviewer"],
] as const;

// Each side column is a 30px heading (18px line plus 12px gap) over four 36px
// rows with 8px gaps, so 198px tall. Row centres sit at 48, 92, 136 and 180,
// and the lines converge on the column midpoint at 99, which the centred
// boundary box shares.
const HEADING = 30;
const ROW_CENTRES = [18, 62, 106, 150].map((y) => y + HEADING);
const COLUMN_HEIGHT = 168 + HEADING;
const MID = COLUMN_HEIGHT / 2;

function Converge({ mirror = false }: { mirror?: boolean }) {
  return (
    <svg
      viewBox={`0 0 32 ${COLUMN_HEIGHT}`}
      preserveAspectRatio="none"
      className={`h-[198px] w-full ${mirror ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      {ROW_CENTRES.map((y) => (
        <path
          key={y}
          d={`M0 ${y} C16 ${y} 16 ${MID} 32 ${MID}`}
          fill="none"
          stroke="rgba(246,248,245,0.26)"
          strokeWidth="1.25"
        />
      ))}
    </svg>
  );
}

function Column({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="mb-3 h-[18px] text-[12px] leading-[18px] font-medium text-t3">
        {label}
      </p>
      <ul className="space-y-2" aria-label={label}>
        {items.map((item) => (
          <li
            key={item}
            className="flex h-9 items-center rounded-[8px] border border-border-md bg-white/[0.05] px-3 text-[12.5px] whitespace-nowrap text-t2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const GRID =
  "grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1.45fr)_32px_minmax(0,1fr)]";

export function BoundaryDiagram() {
  return (
    <div className="rounded-[14px] border border-border-md bg-surface/85 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <div className={`${GRID} items-center`}>
        <Column label="Systems you run" items={SOURCES} />

        <Converge />

        {/* The boundary, and the typed document it produces */}
        <div className="rounded-[12px] border border-brand/55 bg-brand-low p-3">
          <p className="text-[12px] font-medium text-brand">Boundary</p>

          <div className="mt-2.5 rounded-[9px] bg-white p-3 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-[11.5px] font-semibold text-copy">
                document model
              </span>
              <span className="text-[11px] text-copy-muted">typed</span>
            </div>

            <dl className="mt-2 space-y-1">
              {FIELDS.map(([name, type]) => (
                <div
                  key={name}
                  className="flex items-baseline justify-between font-mono text-[11px]"
                >
                  <dt className="text-copy">{name}</dt>
                  <dd className="text-copy-muted">{type}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 border-t border-border-light pt-2.5">
              <p className="text-[11px] font-semibold text-copy-muted">
                Operation log
              </p>
              <ol className="mt-1.5 space-y-1">
                {LOG.map(([op, actor]) => (
                  <li
                    key={op}
                    className="flex items-center justify-between font-mono text-[11px]"
                  >
                    <span className="text-copy">{op}</span>
                    <span className="flex items-center gap-1 text-copy-muted">
                      {actor}
                      {op === "approve" ? (
                        <Check
                          className="h-3 w-3 text-proof"
                          aria-label="approved"
                        />
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] leading-[1.45] text-t3">
            Each write step names the actions it may dispatch.
          </p>
        </div>

        <Converge mirror />

        <Column label="Where it is read" items={SURFACES} />
      </div>
    </div>
  );
}

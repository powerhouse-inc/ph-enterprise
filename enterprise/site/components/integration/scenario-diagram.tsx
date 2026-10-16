import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check } from "lucide-react";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import type { IntegrationScenario, ScenarioSystem } from "@/data/integrations";

/**
 * The scenario a record's demo runs: where material arrives, the Powerhouse
 * document it becomes, and the system that document drives and hears back
 * from. Same visual language as the index BoundaryDiagram, so the pillar reads
 * as one system: a faint outline for each system you run, one white document
 * with a cyan ring for Powerhouse. One level of framing only: cards nested in
 * cards read as clutter and the detector flags them.
 *
 * Every value is passed in from the record, never written here.
 */
function SystemNode({ system }: { system: ScenarioSystem }) {
  return (
    // A station: a faint boundary on the dark band, the same height as the
    // ledger card, so the three steps read as one row. Siblings, not nesting.
    <div className="h-full rounded-[10px] border border-border-md p-4">
      <span className="inline-flex h-11 items-center gap-2.5 rounded-[8px] bg-paper px-3">
        {/* A system with no logo of its own, such as a drive app, shows its name. */}
        {!system.logo ? (
          <span className="text-[15px] font-semibold text-copy">{system.name}</span>
        ) : system.logo.kind === "mark" ? (
          <>
            <Image
              src={system.logo.src}
              alt=""
              width={system.logo.width}
              height={system.logo.height}
              className="h-7 w-7 rounded-[6px]"
              aria-hidden="true"
            />
            <span className="text-[15px] font-semibold text-copy">{system.name}</span>
          </>
        ) : (
          <Image
            src={system.logo.src}
            alt={system.name}
            width={system.logo.width}
            height={system.logo.height}
            className="h-7 w-auto"
          />
        )}
      </span>
      <p className="mt-4 text-[15px] font-semibold text-t1">{system.role}</p>
      <ul className="mt-2 space-y-1">
        {system.items.map((item) => (
          <li key={item} className="text-[13.5px] leading-[1.5] text-t2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A labelled edge. Horizontal on desktop; when the diagram stacks, a forward
 * edge points down the stack and a returning edge points back up it.
 */
function Flow({
  label,
  direction = "right",
}: {
  label: string;
  direction?: "right" | "left";
}) {
  const Arrow = direction === "right" ? ArrowRight : ArrowLeft;
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
      <span className="text-[12.5px] leading-[1.35] text-t3">{label}</span>
      <Arrow className="hidden h-4 w-4 text-t2 lg:block" aria-hidden="true" />
      {direction === "right" ? (
        <ArrowDown className="h-4 w-4 text-t2 lg:hidden" aria-hidden="true" />
      ) : (
        <ArrowUp className="h-4 w-4 text-t2 lg:hidden" aria-hidden="true" />
      )}
    </div>
  );
}

export function ScenarioDiagram({ scenario }: { scenario: IntegrationScenario }) {
  const { source, target, record, flows } = scenario;

  return (
    // Unframed on the hero band: each step carries its own boundary instead,
    // so no step sits inside another (no card inside a card).
    <div className="pt-9 pb-2">
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_112px_minmax(0,1.3fr)_112px_minmax(0,1fr)] lg:gap-3">
        <SystemNode system={source} />

        <Flow label={flows.capture} />

        {/* The Powerhouse document, inside the boundary it is written under */}
        {/* The label sits above the card without taking row height, so all
            three stations share one top and bottom edge. */}
        <div className="relative mt-7 lg:mt-0">
          <p className="absolute -top-7 left-0 flex items-center gap-2 text-[13px] font-medium text-brand">
            <PowerhouseMark className="h-3.5 w-3.5" />
            Powerhouse
          </p>

          <div className="h-full rounded-[10px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.3)] ring-2 ring-brand/60">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="font-heading text-[15px] font-semibold text-copy">
                {record.title}
              </span>
              <span className="font-mono text-[12.5px] text-copy-muted">
                {record.model}
              </span>
            </div>

            <dl className="mt-3 space-y-1">
              {record.fields.map((field) => (
                <div
                  key={field.name}
                  className="flex items-baseline justify-between gap-3 font-mono text-[12.5px]"
                >
                  <dt className="text-copy-muted">{field.name}</dt>
                  <dd className="text-copy">{field.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 space-y-1.5 border-t border-border-light pt-3 text-[13px]">
              <p className="flex items-center gap-1.5 text-copy">
                <Check className="h-3.5 w-3.5 text-proof" aria-hidden="true" />
                {record.approval}
              </p>
              <p className="font-mono text-[12.5px] text-copy-muted">{record.evidence}</p>
              {record.verdict ? (
                <p className="font-semibold text-copy">{record.verdict}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* The record drives the target and, when the integration is two-way,
            the target reports back. A one-way record draws one edge. */}
        <div className="flex flex-row items-center justify-center gap-6 self-center lg:flex-col lg:gap-5">
          <Flow label={flows.dispatch} />
          {flows.report ? <Flow label={flows.report} direction="left" /> : null}
        </div>

        <SystemNode system={target} />
      </div>
    </div>
  );
}

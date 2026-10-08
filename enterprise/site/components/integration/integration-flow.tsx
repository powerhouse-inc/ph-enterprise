"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BADGE_PART_ATTR, IntegrationBadge, type IntegrationService } from "./integration-badge";

/**
 * The design system's "stage + diagram" usage of IntegrationBadge
 * (integrations.card.html): the badge on a dotted stage, with a wire from each
 * badge section down into the numbered step it runs. Light palette only; the
 * page this serves is light.
 */

export type FlowStep = {
  title: string;
  body: string;
  /** Badge section that runs the step: 0 is the Powerhouse cap, 1.. the services. */
  service: number;
};

const P = {
  bg: "#F3F5F7",
  ln: "#E3E7EB",
  c1: "#0B0D0F",
  c2: "rgba(11,13,15,0.68)",
  c3: "rgba(11,13,15,0.45)",
  wire: "#C9CBCC",
  stage: "#E8EBEE",
  dot: "rgba(11,13,15,0.17)",
};

const num = (i: number) => String(i + 1).padStart(2, "0");

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[12px] p-5 sm:p-7 ${className}`}
      style={{ background: P.bg, border: `1px solid ${P.ln}` }}
    >
      {children}
    </div>
  );
}

function Stage({ children }: { children: ReactNode }) {
  return (
    <div
      data-stage=""
      className="-mx-5 -mt-5 flex justify-center overflow-x-auto px-5 py-9 sm:-mx-7 sm:-mt-7 sm:px-7 sm:py-11"
      style={{
        background: P.stage,
        backgroundImage: `radial-gradient(circle, ${P.dot} 1px, transparent 1.4px)`,
        backgroundSize: "14px 14px",
        borderBottom: `1px solid ${P.ln}`,
      }}
    >
      {children}
    </div>
  );
}

type Measure = {
  parts: { x: number; w: number }[];
  bottom: number;
  stageBottom: number;
  anchors: { service: number; cx: number }[];
  w: number;
  h: number;
};

/**
 * One path per step: down from its badge section, across, then down past the
 * stage edge to stop above the step's number. The badge is narrower than the
 * columns, so wires converge; each service gets its own lane so no two run
 * along one line. Among wires heading left the leftmost source runs highest,
 * among wires heading right the rightmost does, which keeps them from crossing.
 */
function wirePaths(m: Measure): string[] {
  const y0 = Math.round(m.bottom);
  const sb = Math.round(m.stageBottom);
  const mid = Math.round((y0 + sb) / 2);
  const yEnd = sb + (sb - mid);
  const sourceX = (service: number) => {
    const part = m.parts[service];
    return part ? Math.round(part.x + part.w / 2) + 0.5 : null;
  };

  const lane = new Map<number, number>();
  for (const goingLeft of [true, false]) {
    const group = [
      ...new Set(
        m.anchors
          .filter((an) => {
            const x = sourceX(an.service);
            return x !== null && (an.cx <= x) === goingLeft;
          })
          .map((an) => an.service),
      ),
    ].sort((a, b) => (goingLeft ? 1 : -1) * ((sourceX(a) ?? 0) - (sourceX(b) ?? 0)));
    group.forEach((service, i) => {
      if (!lane.has(service)) lane.set(service, mid + Math.round((i - (group.length - 1) / 2) * 10));
    });
  }

  return m.anchors.flatMap((an) => {
    const x = sourceX(an.service);
    if (x === null) return [];
    const ym = (lane.get(an.service) ?? mid) + 0.5;
    return [`M${x} ${y0}V${ym}H${Math.round(an.cx) + 0.5}V${yEnd}`];
  });
}

/** lg and up: the wired diagram. Measured after layout, so wires follow the type. */
function Diagram({ services, steps }: { services: readonly IntegrationService[]; steps: readonly FlowStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<Measure | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const group = el.querySelector("[role=group]");
      const stage = el.querySelector("[data-stage]");
      if (!group || !stage) return;
      const base = el.getBoundingClientRect();
      if (base.width === 0) return; // hidden below lg
      const parts: Measure["parts"] = [];
      el.querySelectorAll<HTMLElement>(`[${BADGE_PART_ATTR}]`).forEach((n) => {
        const r = n.getBoundingClientRect();
        parts[Number(n.getAttribute(BADGE_PART_ATTR))] = { x: r.left - base.left, w: r.width };
      });
      const anchors = [...el.querySelectorAll<HTMLElement>("[data-anchor]")].map((n) => {
        const r = n.getBoundingClientRect();
        return { service: Number(n.dataset.anchor), cx: r.left - base.left + r.width / 2 };
      });
      const next: Measure = {
        parts,
        bottom: group.getBoundingClientRect().bottom - base.top,
        stageBottom: stage.getBoundingClientRect().bottom - base.top,
        anchors,
        w: base.width,
        h: base.height,
      };
      setM((old) => (JSON.stringify(old) === JSON.stringify(next) ? old : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    const imgs = [...el.querySelectorAll("img")];
    imgs.forEach((im) => im.addEventListener("load", measure));
    return () => {
      ro.disconnect();
      imgs.forEach((im) => im.removeEventListener("load", measure));
    };
  }, []);

  return (
    <Shell className="hidden lg:block">
      <div ref={ref} className="relative">
        <Stage>
          <IntegrationBadge size="lg" services={services} />
        </Stage>
        <ol
          className="grid items-start pt-9"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center gap-1.5 px-2.5 text-center">
              <span
                data-anchor={step.service}
                className="font-heading text-[40px] leading-none font-[680] tracking-[-0.05em]"
                style={{ color: P.c1 }}
              >
                {num(i)}
              </span>
              <h3 className="mt-1 text-[15px] leading-[1.35] font-semibold text-balance" style={{ color: P.c1 }}>
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-pretty" style={{ color: P.c2 }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        {m ? (
          <svg
            width={m.w}
            height={m.h}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 overflow-visible"
            fill="none"
            stroke={P.wire}
            strokeWidth="1"
          >
            {wirePaths(m).map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        ) : null}
      </div>
    </Shell>
  );
}

/** Below lg: the badge on its stage, then the steps as a list, each with the mark of the system that runs it. */
function StageList({ services, steps }: { services: readonly IntegrationService[]; steps: readonly FlowStep[] }) {
  return (
    <Shell className="lg:hidden">
      <Stage>
        <IntegrationBadge size="md" services={services} showNames={false} />
      </Stage>
      <ol className="mt-6 flex flex-col gap-5">
        {steps.map((step, i) => {
          const svc = step.service > 0 ? services[step.service - 1] : undefined;
          return (
            <li key={step.title} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-2.5">
              {/* The title's line height, so the number sits on its first line. */}
              <span className="font-mono text-[12px] leading-[21px]" style={{ color: P.c3 }}>
                {num(i)}
              </span>
              <div>
                <h3 className="flex items-start gap-2 text-[15px] leading-[21px] font-semibold" style={{ color: P.c1 }}>
                  {svc?.logo ? (
                    <Image src={svc.logo} alt="" width={18} height={18} className="mt-[1.5px] h-[18px] w-[18px] shrink-0 object-contain" />
                  ) : null}
                  {step.title}
                </h3>
                <p className="mt-1 text-[14px] leading-[1.6] text-pretty" style={{ color: P.c2 }}>
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}

export function IntegrationFlow({
  services,
  steps,
}: {
  services: readonly IntegrationService[];
  steps: readonly FlowStep[];
}) {
  return (
    <>
      <Diagram services={services} steps={steps} />
      <StageList services={services} steps={steps} />
    </>
  );
}

/** Just the badge on its stage, for prose columns such as a blog post. */
export function IntegrationStage({ services }: { services: readonly IntegrationService[] }) {
  return (
    <div className="my-9">
      <div className="overflow-hidden rounded-[12px]" style={{ border: `1px solid ${P.ln}` }}>
        <div
          className="flex justify-center px-5 py-10"
          style={{
            background: P.stage,
            backgroundImage: `radial-gradient(circle, ${P.dot} 1px, transparent 1.4px)`,
            backgroundSize: "14px 14px",
          }}
        >
          {/* Names do not fit a phone's column; the marks alone do. */}
          <span className="sm:hidden">
            <IntegrationBadge size="md" services={services} showNames={false} />
          </span>
          <span className="hidden sm:inline-flex">
            <IntegrationBadge size="md" services={services} />
          </span>
        </div>
      </div>
    </div>
  );
}

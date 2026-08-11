"use client";

import { Check, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { cn } from "@/lib/utils";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

/** Step number + title + description shown beside each diagram stage. */
function StageText({
  num,
  title,
  body,
  children,
}: {
  num: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="lg:pt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-heading w-[26px] shrink-0 text-[20px] leading-none font-semibold text-white/45">
          {num}
        </span>
        <h3 className="font-heading text-[17px] font-semibold text-white">
          {title}
        </h3>
      </div>
      <p className="mt-1.5 max-w-[520px] text-[14px] leading-[1.65] text-white/60">
        {body}
      </p>
      {children}
    </div>
  );
}

/** Scattered source-document mini cards for stage 01. */
function SourceCards() {
  return (
    <div className="relative mx-auto h-[152px] w-full max-w-[360px]">
      {/* Receipts */}
      <div className="absolute top-[0px] left-[16px] h-[66px] w-[108px] -rotate-[6deg] rounded-[10px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <p className="text-[9px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
          Receipts
        </p>
        <div className="mt-1.5 space-y-1">
          <div className="h-[3px] w-4/5 rounded-full bg-slate-200" />
          <div className="h-[3px] w-3/5 rounded-full bg-slate-200" />
        </div>
        <p className="mt-1.5 text-[10px] font-semibold text-slate-800">
          $182.40
        </p>
      </div>

      {/* Invoices */}
      <div className="absolute top-[12px] left-[150px] h-[66px] w-[108px] rotate-[4deg] rounded-[10px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <p className="text-[9px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
          Invoices
        </p>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[10px] rounded-[2px] bg-slate-200" />
          ))}
        </div>
      </div>

      {/* Claim status */}
      <div className="absolute top-[74px] left-[40px] h-[66px] w-[108px] -rotate-[3deg] rounded-[10px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <p className="text-[9px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
          Claim status
        </p>
        <div className="mt-2 h-[3px] w-4/5 rounded-full bg-slate-200" />
        <span className="mt-2 inline-flex rounded-full bg-amber-100 px-1.5 py-0.5 text-[8.5px] font-semibold text-amber-700">
          In review
        </span>
      </div>

      {/* Emails */}
      <div className="absolute top-[86px] left-[184px] h-[66px] w-[108px] rotate-[5deg] rounded-[10px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <p className="text-[9px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
          Emails
        </p>
        <div className="mt-1.5 space-y-1.5">
          {["80%", "60%", "72%"].map((w) => (
            <div key={w} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-slate-300" />
              <div
                className="h-[3px] rounded-full bg-slate-200"
                style={{ width: w }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Thin downward connector arrow. */
function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="36"
      viewBox="0 0 12 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 0v30m0 0-5-5.5M6 30l5-5.5"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Structured workflow rows for stage 02. */
function WorkflowRows() {
  return (
    <div className="mx-auto w-full max-w-[360px] space-y-2">
      {(
        [
          { label: "Receipts & invoices", color: "#46d68c", lock: true },
          { label: "Claim status", color: "#4f9cf9", lock: false },
          { label: "Email correspondence", color: "#9c6bff", lock: false },
        ] as const
      ).map((row) => (
        <div
          key={row.label}
          className="flex h-9 items-center gap-2.5 rounded-[9px] border border-white/20 bg-white/[0.13] px-3"
        >
          <span
            className="h-[10px] w-[10px] shrink-0 rounded-[3px]"
            style={{ backgroundColor: row.color }}
          />
          <span className="text-[12.5px] text-white/85">{row.label}</span>
          {row.lock ? (
            <Lock
              className="ml-auto h-3 w-3 text-[#7ed9a7]"
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Curved connector forking from the workflow rows to both AI zones. */
function ForkConnector() {
  const left = "M180 0C180 22 88 30 88 56";
  const right = "M180 0C180 22 272 30 272 56";

  return (
    <svg
      width="360"
      height="56"
      viewBox="0 0 360 56"
      fill="none"
      aria-hidden="true"
      className="mx-auto block h-[56px] w-full max-w-[360px]"
    >
      <path d={left} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <path d={right} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <path
        d={left}
        stroke="rgba(126,217,167,0.85)"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <path
        d={right}
        stroke="rgba(156,107,255,0.85)"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
    </svg>
  );
}

/** Small data chip used inside the AI zone cards. */
function ZoneChip({
  label,
  locked = false,
}: {
  label: string;
  locked?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-[6px] bg-black/[0.28] px-1.5 py-1 text-[10.5px] text-white/80",
        locked && "border border-[rgba(126,217,167,0.5)]",
      )}
    >
      {locked ? (
        <Lock className="h-[9px] w-[9px] text-[#7ed9a7]" aria-hidden="true" />
      ) : null}
      {label}
    </span>
  );
}

/** Side-by-side local / frontier model zones for stage 03. */
function ZoneCards() {
  return (
    <div className="mx-auto grid w-full max-w-[360px] grid-cols-2 gap-[10px]">
      <div className="flex min-h-[172px] flex-col rounded-[12px] border-[1.5px] border-[rgba(126,217,167,0.55)] bg-[rgba(56,199,128,0.09)] p-3">
        <div className="flex items-center gap-1.5">
          <ShieldCheck
            className="h-3.5 w-3.5 text-[#7ed9a7]"
            aria-hidden="true"
          />
          <span className="text-[11.5px] font-semibold text-white/90">
            Local models
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <ZoneChip label="Receipts & invoices" locked />
          <ZoneChip label="Claim status" />
          <ZoneChip label="Emails" />
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-3">
          <span className="flex -space-x-1.5">
            <span className="h-4 w-4 rounded-full border border-[#1b1e24] bg-slate-400" />
            <span className="h-4 w-4 rounded-full border border-[#1b1e24] bg-slate-500" />
          </span>
          <span className="text-[10px] font-medium text-[#7ed9a7]">
            2 operators only
          </span>
        </div>
      </div>

      <div className="flex min-h-[172px] flex-col rounded-[12px] border-[1.5px] border-dashed border-[rgba(146,92,255,0.6)] bg-[rgba(122,58,255,0.1)] p-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#cdb2ff]" aria-hidden="true" />
          <span className="text-[11.5px] font-semibold text-white/90">
            Frontier models
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <ZoneChip label="Claim status" />
          <ZoneChip label="Emails" />
        </div>
        <p className="mt-auto pt-3 text-[10px] font-medium text-[#cdb2ff]">
          Non-confidential data only
        </p>
      </div>
    </div>
  );
}

/** Approved output card shown below the human-approval gate. */
function OutputCard() {
  return (
    <div className="w-[196px] rounded-[12px] bg-white p-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-slate-800">Output</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#dcfce7]">
          <Check
            className="h-2.5 w-2.5 text-[#16a34a]"
            strokeWidth={3}
            aria-hidden="true"
          />
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        <p className="text-[11px] text-slate-500">Batch · 24 documents</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Claim #4821</span>
          <span className="rounded-full bg-[#dcfce7] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#15803d]">
            Approved
          </span>
        </div>
      </div>
    </div>
  );
}

const LEDGER_ROWS = [
  { label: "Receipts extracted · AI agent", dot: "#4f9cf9", muted: false },
  { label: "Amounts verified · Wouter K", dot: "#46d68c", muted: false },
  { label: "Batch claim drafted · AI agent", dot: "#9c6bff", muted: false },
  {
    label: "Batch approved · Wouter K",
    dot: "rgba(255,255,255,0.5)",
    muted: true,
  },
  {
    label: "Claim #4821 status updated · Approval Team",
    dot: "rgba(255,255,255,0.35)",
    muted: true,
    fade: true,
  },
];

/** Attributable history ledger for stage 05. */
function LedgerCard() {
  return (
    <div className="mx-auto w-full max-w-[360px] space-y-2.5 rounded-[12px] border border-white/[0.14] bg-white/5 p-4">
      {LEDGER_ROWS.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-2"
          style={
            "fade" in row && row.fade
              ? {
                  maskImage:
                    "linear-gradient(90deg, #000 40%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, #000 40%, transparent 100%)",
                }
              : undefined
          }
        >
          <span
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ backgroundColor: row.dot }}
          />
          <span
            className={cn(
              "text-[12.5px]",
              row.muted ? "text-white/50" : "text-white/75",
            )}
          >
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HowPowerhouseWorks() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section
      ref={rootRef}
      id="solution"
      className="border-t border-border-light bg-paper-soft py-20 text-copy"
    >
      <style>{`
        @keyframes hpw-pulse-travel {
          0% { top: 2%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { top: 96%; opacity: 0; }
        }
        .hpw-pulse { animation: hpw-pulse-travel 6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hpw-pulse { animation: none; opacity: 0; }
        }
      `}</style>

      <SectionContainer>
        <SectionHeading
          className="fade-up"
          eyebrow="How Powerhouse works"
          title={
            <>
              Map the workflow.
              <br className="max-sm:hidden" /> Control the boundary.
            </>
          }
          lead="Powerhouse turns your private processes into AI-ready software that you own. Explore solutions in a Powerhouse sandbox, then choose local, self-hosted, or remote deployment according to your needs."
        />

        {/* Dark diagram panel */}
        <div className="relative mt-12 overflow-hidden rounded-[24px] bg-[linear-gradient(170deg,#22262e_0%,#1b1e24_40%,#14161b_100%)] px-6 py-8 lg:px-12 lg:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_30%_38%,rgba(122,58,255,0.14),transparent_70%)]"
          />

          {/* Pulse dots travelling down the diagram column */}
          <div
            aria-hidden="true"
            className="hpw-pulse absolute left-[224px] hidden h-[10px] w-[10px] rounded-full lg:block"
            style={{
              background:
                "radial-gradient(circle, #cdb2ff 0%, rgba(205,178,255,0.4) 60%, transparent 100%)",
              boxShadow: "0 0 12px 4px rgba(205,178,255,0.5)",
            }}
          />
          <div
            aria-hidden="true"
            className="hpw-pulse absolute left-[225px] hidden h-2 w-2 rounded-full lg:block"
            style={{
              background:
                "radial-gradient(circle, rgba(126,217,167,0.95) 0%, rgba(126,217,167,0.4) 60%, transparent 100%)",
              boxShadow: "0 0 10px 3px rgba(126,217,167,0.45)",
              animationDelay: "-2.4s",
            }}
          />

          <div className="relative">
            {/* 01 — Connect existing systems */}
            <div className="fade-up grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-14">
              <SourceCards />
              <StageText
                num="01"
                title="Connect existing systems"
                body="Start from the documents, spreadsheets, inboxes, and legacy systems already carrying the work."
              />
            </div>

            <div className="flex w-full justify-center lg:w-[360px]">
              <ArrowDown />
            </div>

            {/* Boundary box wrapping 02 + 03. Bleeds out by its own padding on
                lg so the columns inside align exactly with the outer rows. */}
            <div className="fade-up relative rounded-[20px] border-[1.5px] border-dashed border-[rgba(146,92,255,0.8)] bg-[rgba(122,58,255,0.06)] p-6 pb-14 lg:-mx-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(146,92,255,0.5)] bg-[rgba(122,58,255,0.25)] px-3 py-1 text-[11px] font-semibold text-[#e4d5ff]">
                  <Lock className="h-[11px] w-[11px]" aria-hidden="true" />
                  Your boundary
                </span>
                <p className="text-[12.5px] text-[rgba(205,178,255,0.85)]">
                  You control which users and what systems access your data.
                </p>
              </div>

              {/* 02 — Structure the workflow */}
              <div className="mt-4 grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-14">
                <WorkflowRows />
                <StageText
                  num="02"
                  title="Structure the workflow"
                  body="Model the objects, approvals, permissions, exceptions, and data history behind the process."
                />
              </div>

              <div className="my-4 w-full lg:w-[360px]">
                <ForkConnector />
              </div>

              {/* 03 — Add scoped AI assistance */}
              <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-14">
                <ZoneCards />
                <StageText
                  num="03"
                  title="Add scoped AI assistance"
                  body="Use AI to extract, compare, draft, flag, and route work inside the approved workflow boundary."
                >
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#46d68c]" />
                      <span className="text-[12.5px] text-white/60">
                        Local models: confidential financial data, approved
                        operators only
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#9c6bff]" />
                      <span className="text-[12.5px] text-white/60">
                        Frontier models: claim status and non-confidential
                        correspondence
                      </span>
                    </div>
                  </div>
                </StageText>
              </div>

              {/* Gate circle straddling the boundary's bottom edge */}
              <div
                className="absolute bottom-0 left-1/2 flex h-[62px] w-[62px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white lg:left-[204px]"
                style={{ boxShadow: "0 0 0 6px #1b1e24" }}
              >
                <Check
                  className="h-7 w-7 text-[#16a34a]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 04 — Keep human approval */}
            <div className="fade-up grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-14">
              <div className="flex flex-col items-center pt-10">
                <ArrowDown />
                <div className="mt-2">
                  <OutputCard />
                </div>
              </div>
              <StageText
                num="04"
                title="Keep human approval"
                body="Operators approve, reject, or revise important actions with the right context in front of them. Here, an operator approves the batch claim and updates the claim status."
              />
            </div>

            {/* 05 — Retain attributable history */}
            <div className="fade-up mt-9 grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-14">
              <LedgerCard />
              <StageText
                num="05"
                title="Retain attributable history"
                body="Every source, rule, model output, and human decision remains inspectable as the workflow evolves."
              />
            </div>
          </div>
        </div>

      </SectionContainer>
    </section>
  );
}

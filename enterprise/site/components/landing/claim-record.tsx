import { Check } from "lucide-react";
import { PowerhouseMark } from "@/components/powerhouse-mark";

/*
 * The hero's product view: claim #4821 as one Powerhouse document, with its
 * line items, its status and the signed operations that made it, newest
 * first. Operation types and statuses are the real powerhouse/expense-report
 * model's (ADD_LINE_ITEM, UPDATE_LINE_ITEM, SET_STATUS to DRAFT, REVIEW or
 * FINAL). The paper slip on its corner is the hotel line's source receipt:
 * the AI agent read it as €321.00, the approver corrected it to €312.00, and
 * both changes are on the record.
 */

const LINE_ITEMS = [
  { label: "Train, Amsterdam to Rotterdam", amount: "€48.60" },
  { label: "Hotel, 2 nights", amount: "€312.00" },
  { label: "Client dinner", amount: "€184.40" },
];
const TOTAL = "€545.00";

const OPERATIONS = [
  { index: "06", type: "SET_STATUS", detail: "FINAL", who: "Wouter K", at: "10:04" },
  { index: "05", type: "UPDATE_LINE_ITEM", detail: "Hotel €312.00", who: "Wouter K", at: "10:02" },
  { index: "04", type: "SET_STATUS", detail: "REVIEW", who: "Maya L", at: "09:15" },
  { index: "03", type: "ADD_LINE_ITEM", detail: "3 receipts", who: "AI agent", at: "09:13" },
];
const SIGNED = 6;

/** A torn bottom edge: a zigzag of `TEETH` points along the slip's foot. */
const TEETH = 14;
const TORN = `polygon(0 0, 100% 0, ${Array.from({ length: TEETH + 1 }, (_, i) => {
  const x = 100 - (i / TEETH) * 100;
  return `${Math.round(x * 100) / 100}% ${i % 2 ? "100%" : "calc(100% - 6px)"}`;
}).join(", ")})`;

function Receipt({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]">
        <div
          className="w-[180px] bg-paper-soft px-4 pt-4 pb-6 font-mono text-[11px] leading-[1.6] text-copy"
          style={{ clipPath: TORN }}
        >
          <p className="font-sans text-[13px] leading-[1.35] font-medium">Harbour Hotel Rotterdam</p>
          <p className="mt-1 text-copy-muted">14 Oct 2026 · Room 412</p>
          <div className="my-3 border-t border-dashed border-copy/30" />
          <p className="flex justify-between gap-2">
            <span>2 nights</span>
            <span className="tabular-nums">€312.00</span>
          </p>
          <p className="text-copy-muted">€156.00 per night</p>
          <div className="my-3 border-t border-dashed border-copy/30" />
          <p className="flex justify-between gap-2 text-[12px] font-medium">
            <span>Total</span>
            <span className="tabular-nums">€312.00</span>
          </p>
          <p className="mt-1 text-copy-muted">Paid by card</p>
        </div>
      </div>
    </div>
  );
}

export function ClaimRecord() {
  return (
    <figure className="relative w-full">
      {/* From 1280px the window leaves room on its right for the receipt,
          which overlaps only its border. */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface xl:mr-[144px]">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <PowerhouseMark className="h-4 w-4 shrink-0 text-t3" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[15px] leading-5 font-medium text-t1">Claim #4821</p>
            <p className="truncate font-mono text-[12px] leading-4 text-t3">powerhouse/expense-report</p>
          </div>
          <p className="ml-auto flex shrink-0 items-center gap-2 text-[13px] text-t2">
            <span className="h-2 w-2 rounded-full bg-proof" aria-hidden="true" />
            Final
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-b border-border px-5 py-4 sm:grid-cols-3">
          <div>
            <dt className="text-[12px] leading-4 text-t3">Owner</dt>
            <dd className="mt-1 text-[14px] leading-5 text-t1">Maya Lindqvist</dd>
          </div>
          <div>
            <dt className="text-[12px] leading-4 text-t3">Period</dt>
            <dd className="mt-1 text-[14px] leading-5 text-t1">October 2026</dd>
          </div>
          <div className="max-sm:hidden">
            <dt className="text-[12px] leading-4 text-t3">Access</dt>
            <dd className="mt-1 text-[14px] leading-5 text-t1">Finance team</dd>
          </div>
        </dl>

        <table className="w-full text-[14px] leading-5">
          <thead>
            <tr className="text-[12px] leading-4 text-t3">
              <th scope="col" className="px-5 pt-4 pb-2 text-left font-normal">
                Line item
              </th>
              <th scope="col" className="px-5 pt-4 pb-2 text-right font-normal">
                Actuals
              </th>
            </tr>
          </thead>
          <tbody>
            {LINE_ITEMS.map((item) => (
              <tr key={item.label} className="border-t border-border">
                <td className="px-5 py-2 text-t2">{item.label}</td>
                <td className="px-5 py-2 text-right text-t1 tabular-nums">{item.amount}</td>
              </tr>
            ))}
            <tr className="border-t border-border">
              <td className="px-5 pt-2 pb-4 font-medium text-t1">Total</td>
              <td className="px-5 pt-2 pb-4 text-right font-medium text-t1 tabular-nums">{TOTAL}</td>
            </tr>
          </tbody>
        </table>

        <div className="border-t border-border bg-ink/50 px-5 pt-4 pb-5">
          <p className="flex items-baseline justify-between text-[12px] leading-4 text-t3">
            <span>History</span>
            <span>{SIGNED} signed operations</span>
          </p>
          <ol className="mt-3 space-y-2 font-mono text-[12px] leading-5">
            {OPERATIONS.map((op, i) => (
              <li
                key={op.index}
                className={`grid grid-cols-[20px_minmax(0,1fr)_auto_16px] items-center gap-3 sm:grid-cols-[20px_minmax(0,1fr)_auto_40px_16px] ${i === 3 ? "max-sm:hidden" : ""}`}
              >
                <span className="text-t3 tabular-nums">{op.index}</span>
                <span className="truncate text-t2">
                  <span className="text-t1">{op.type}</span> {op.detail}
                </span>
                <span className="text-t3">{op.who}</span>
                <span className="text-t3 tabular-nums max-sm:hidden">{op.at}</span>
                <Check className="h-4 w-4 text-proof" strokeWidth={1.5} aria-label="Signed" />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Receipt className="pointer-events-none absolute top-[22%] -right-6 hidden rotate-[5deg] xl:block" />

      <figcaption className="sr-only">
        Claim 4821 in Powerhouse: three line items totalling {TOTAL}, status final, and the last four of its {SIGNED} signed
        operations, newest first. Beside it, the paper hotel receipt for €312.00 that the hotel line was read from.
      </figcaption>
    </figure>
  );
}

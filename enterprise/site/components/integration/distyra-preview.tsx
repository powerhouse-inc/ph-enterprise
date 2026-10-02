/**
 * Evidence for the Distyra case study until a screenshot exists: the demo on
 * distyra.eu, redrawn. Raw European statement lines above; one of them as
 * Distyra Enrichment returns it, with the counterparty named. Every line and
 * figure is Distyra's own example, not ours.
 */
const RAW_LINES = [
  ["PRLV SEPA ORANGE SA 660198447", "−€59"],
  ["CARTE 03/04 SNCF INTERNET PARIS", "−€78"],
  ["VIR INST RECU STRIPE PAYMENTS UK", "+€3,180"],
] as const;

export function DistyraPreview() {
  return (
    <figure className="relative flex min-h-[260px] flex-col md:aspect-[16/10] md:min-h-0 justify-center gap-4 overflow-hidden rounded-[10px] bg-[#0D0F14] p-6 shadow-[0_6px_24px_rgba(17,22,20,0.12)] md:p-8">
      <ul className="space-y-2" aria-label="Raw statement lines">
        {RAW_LINES.map(([text, amount]) => (
          <li
            key={text}
            className="flex items-center justify-between gap-4 font-mono text-[11px] text-white/45 md:text-[13px]"
          >
            <span className="truncate">{text}</span>
            <span className="shrink-0">{amount}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-4 font-mono text-[11px] text-white/80 md:text-[13px]">
          <span className="truncate">VIR SEPA ACME SARL FACT 2024-0912</span>
          <span className="shrink-0">+&euro;12,400</span>
        </li>
      </ul>

      {/* The same line, enriched. */}
      <div className="flex items-center gap-3 rounded-[10px] bg-white p-3.5 md:p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[14px] font-semibold text-white">
          A
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-slate-900">Acme SARL</p>
          <p className="truncate text-[12px] text-slate-500">Customer payment &middot; FR</p>
        </div>
        <span className="hidden rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline">
          revenue
        </span>
        <span className="shrink-0 text-[14px] font-semibold text-slate-900">+&euro;12,400</span>
      </div>

      <figcaption className="text-[11.5px] text-white/40">
        Distyra&rsquo;s own example, from distyra.eu
      </figcaption>
    </figure>
  );
}

"use client";

import { useRef } from "react";
import { COMPARISON_ROWS } from "@/data/comparison";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function ComparisonSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-10 fade-up">
          <h2 className="text-[clamp(32px,3.4vw,46px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading mb-4">
            How this compares
          </h2>
          <p className="text-[15px] leading-[1.72] text-t2 max-w-[580px]">
            Your existing vendors &mdash; Microsoft, Salesforce, SAP &mdash; are adding AI to their
            platforms. But they&apos;re bolting it onto architectures never designed for machine
            interaction, and processing your data on their infrastructure.
          </p>
        </div>

        <div className="fade-up overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-semibold tracking-[0.06em] uppercase text-t3 pb-4 pr-6 w-[160px]">
                  &nbsp;
                </th>
                <th className="text-left text-[11px] font-semibold tracking-[0.06em] uppercase text-t3 pb-4 pr-6">
                  Cloud AI + Legacy
                </th>
                <th className="text-left text-[11px] font-semibold tracking-[0.06em] uppercase pb-4 gradient-text">
                  Powerhouse
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.dimension} className="border-t border-border">
                  <td className="text-[13px] font-semibold text-t1 py-4 pr-6 align-top">
                    {row.dimension}
                  </td>
                  <td className="text-[13px] leading-[1.68] text-t3 py-4 pr-6 align-top">
                    {row.legacy}
                  </td>
                  <td className="text-[13px] leading-[1.68] text-t2 py-4 align-top">
                    {row.powerhouse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
    </section>
  );
}

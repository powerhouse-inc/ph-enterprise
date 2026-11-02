// SiloedDataSection: "More data won't make AI agents reliable." (anchor: #problem)
// The heading and lead sit above the figure: expense claim #4821 as it lives
// today, spread across four tools. The section's three points are the
// figure's legend: each runs the part of the drawing that answers it.

import { FragmentsFigure } from "@/components/figures/fragments/figure";
import { SectionContainer } from "./section-container";

export function SiloedDataSection() {
  return (
    <section id="problem" className="border-t border-border-light bg-paper-soft py-20 text-copy">
      <SectionContainer>
        <FragmentsFigure
          intro={
            <div className="flex flex-col gap-5">
              <h2 className="font-heading text-[clamp(28px,3vw,40px)] leading-[1.1] font-medium tracking-[-0.02em]">
                More data won&apos;t make
                <br />
                AI agents reliable.
              </h2>
              <p className="max-w-[720px] text-[17px] leading-[1.6] text-pretty text-copy-muted">
                Connecting and structuring the data is the start. An AI agent also needs a fixed path: the business
                rules it must follow, the steps it may take, and a record of every change it makes.
              </p>
            </div>
          }
        />
      </SectionContainer>
    </section>
  );
}

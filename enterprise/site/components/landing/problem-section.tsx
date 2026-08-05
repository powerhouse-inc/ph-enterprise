"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUpInScope(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="border-t border-border-light bg-paper py-24 text-copy"
    >
      <SectionContainer>
        <div className="grid grid-cols-1 gap-9 md:grid-cols-[0.88fr_1fr] md:gap-16">
          <div className="fade-up">
            <p className="mb-4 text-[14px] font-medium text-copy-muted">
              Current reality.
            </p>
            <h2 className="font-heading text-[clamp(34px,4vw,54px)] font-[680] leading-[1.04] text-copy">
              Siloed data limits
              <br />
              what AI can deliver.
            </h2>
          </div>

          <div className="fade-up">
            <p className="max-w-[660px] text-[18px] leading-[1.65] text-copy">
              Critical workflows are spread across disconnected tools, with no
              shared structure, permissions, or history.
            </p>

            <div className="mt-9 divide-y divide-border-light border-y border-border-light">
              {[
                {
                  title: "AI sees fragments",
                  body: "Documents, spreadsheets, email threads, and legacy records do not add up to one trusted workflow boundary.",
                },
                {
                  title: "Private data moves too easily",
                  body: "Confidential context can be copied into external AI tools before access, storage, and approval rules are clear.",
                },
                {
                  title: "No accountable history",
                  body: "Teams need to know which source, human, model, and rule changed the state of work.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[170px_1fr] sm:gap-8"
                >
                  <h3 className="text-[14px] font-semibold text-copy">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-copy-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

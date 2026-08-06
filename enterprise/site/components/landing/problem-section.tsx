"use client";

import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUpInScope(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="border-t border-border-light bg-paper py-20 text-copy"
    >
      <SectionContainer>
        <SectionHeading
          className="fade-up"
          eyebrow="Current reality"
          title={
            <>
              Siloed data limits
              <br className="max-sm:hidden" /> what AI can deliver.
            </>
          }
          lead="Critical workflows are spread across disconnected tools, with no shared structure, permissions, or history."
        />

        <div className="fade-up mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
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
              className="rounded-[16px] border border-border-light bg-white p-6"
            >
              <h3 className="font-heading mb-2 text-[16px] font-semibold text-copy">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-copy-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

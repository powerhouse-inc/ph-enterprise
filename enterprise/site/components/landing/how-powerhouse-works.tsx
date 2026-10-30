"use client";

import { useRef, type ReactNode } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

export function HowPowerhouseWorks({ figure }: { figure: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section
      ref={rootRef}
      id="solution"
      className="border-t border-border-light bg-paper-soft py-20 text-copy"
    >
      <SectionContainer>
        <SectionHeading
          className="fade-up"
          eyebrow="How Powerhouse works"
          title={
            <>
              Structure the workflow.
              <br className="max-sm:hidden" /> Control the boundary.
            </>
          }
          lead="Powerhouse turns your private processes into AI-ready software that you own. Explore solutions in a Powerhouse sandbox, then choose local, self-hosted, or remote deployment according to your needs."
        />

        {/* The figure is built on the server (app/page.tsx) and passed in,
            so its geometry never ships to the browser. */}
        <div className="fade-up mt-12">{figure}</div>
      </SectionContainer>
    </section>
  );
}

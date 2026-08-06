"use client";

import {
  Check,
  GitBranch,
  History,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

const WORKFLOW_STEPS = [
  {
    title: "Connect existing systems",
    body: "Start from the documents, spreadsheets, inboxes, and legacy systems already carrying the work.",
    icon: Plug,
  },
  {
    title: "Structure the workflow",
    body: "Model the objects, approvals, permissions, exceptions, and data history behind the process.",
    icon: GitBranch,
  },
  {
    title: "Add scoped AI assistance",
    body: "Use AI to extract, compare, draft, flag, and route work inside the approved workflow boundary.",
    icon: Sparkles,
  },
  {
    title: "Keep human approval",
    body: "Operators approve, reject, or revise important actions with the right context in front of them.",
    icon: ShieldCheck,
  },
  {
    title: "Retain attributable history",
    body: "Every source, rule, model output, and human decision remains inspectable as the workflow evolves.",
    icon: History,
  },
];

export function SolutionSection() {
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
              Map the workflow.
              <br className="max-sm:hidden" /> Keep the boundary.
            </>
          }
          lead="Powerhouse turns your private processes into AI-ready software that you own. Explore solutions in a Powerhouse sandbox, then choose local, self-hosted, or remote deployment according to your needs."
        />

        <ol className="fade-up mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.title}
                className="rounded-[16px] border border-border-light bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border-light bg-paper-soft text-copy">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[12px] font-semibold tabular-nums text-copy-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading mb-2 text-[16px] font-semibold text-copy">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-copy-muted">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="fade-up mt-4 flex flex-col items-start gap-3 rounded-[16px] border border-border-light bg-copy px-5 py-4 text-paper md:flex-row">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-proof text-ink">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-[16px] font-semibold">
              Keep control of the workflow boundary.
            </p>
            <p className="mt-1 max-w-[760px] text-[14px] leading-[1.65] text-paper-muted">
              We map your existing workflow into a Powerhouse sandbox. You
              retain control of access, storage, approvals, and operational
              history before a build starts.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

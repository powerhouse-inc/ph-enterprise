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
      className="border-t border-border-light bg-paper-soft py-24 text-copy"
    >
      <SectionContainer>
        <div className="fade-up mb-14 grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1fr] md:gap-16">
          <div>
            <p className="mb-4 text-[14px] font-medium text-copy-muted">
              How Powerhouse works.
            </p>
            <h2 className="font-heading text-[clamp(34px,4vw,54px)] font-[680] leading-[1.04] text-copy">
              Map the workflow.
              <br />
              Keep the boundary.
            </h2>
          </div>
          <p className="max-w-[620px] self-end text-[18px] leading-[1.65] text-copy">
            Powerhouse turns your private processes into AI-ready software that
            you own. Explore solutions in a Powerhouse sandbox, then choose
            local, self-hosted, or remote deployment according to your needs.
          </p>
        </div>

        <ol className="fade-up divide-y divide-border-light border-y border-border-light">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.title}
                className="grid grid-cols-[44px_1fr] items-start gap-x-4 gap-y-2 py-6 md:grid-cols-[64px_240px_1fr] md:gap-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-white text-copy">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-[17px] font-semibold text-copy md:col-auto">
                  {index + 1}. {step.title}
                </h3>
                <p className="col-span-2 text-[15px] leading-[1.7] text-copy-muted md:col-span-1">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="fade-up mt-8 flex flex-col items-start gap-3 rounded-2xl border border-border-light bg-copy px-5 py-4 text-paper md:flex-row">
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

"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  FileText,
  History,
  Inbox,
  ListChecks,
  UserCheck,
} from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

const WORKFLOW_STEPS: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Inbox and documents",
    body: "An invoice arrives by email with supporting files and context scattered across tools.",
    icon: Inbox,
  },
  {
    title: "Structured records",
    body: "Powerhouse extracts and structures the relevant data as workflow objects.",
    icon: FileText,
  },
  {
    title: "Rules and exceptions",
    body: "The system checks the record against workflow rules and flags exceptions for review.",
    icon: ListChecks,
  },
  {
    title: "Human approval",
    body: "An accountable operator approves, rejects, or revises the work with the needed context.",
    icon: UserCheck,
  },
  {
    title: "Attributable history",
    body: "Every AI-assisted and human action is preserved as part of the operational record.",
    icon: History,
  },
];

export function WorkflowExampleSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="py-24 border-t border-border">
      <SectionContainer>
        <div className="mb-12 max-w-[720px] fade-up">
          <p className="mb-4 text-[15px] font-medium text-t3">
            Example workflow.
          </p>
          <h2 className="text-[clamp(36px,3.8vw,52px)] font-[680] leading-[1.06] tracking-[-0.04em] text-t1 font-heading">
            From documents to
            <br />
            <span className="text-t2">an operational workflow.</span>
          </h2>
        </div>

        <div className="fade-up grid grid-cols-[repeat(5,minmax(0,1fr))] gap-3 max-lg:grid-cols-1">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const showArrow = index < WORKFLOW_STEPS.length - 1;

            return (
              <div
                key={step.title}
                className="relative rounded-xl border border-border bg-surface p-5 transition-all hover:border-border-md"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-brand-low bg-brand-low text-brand">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {showArrow ? (
                    <ArrowRight
                      className="h-4 w-4 text-t3 max-lg:rotate-90"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-t1 font-heading">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-[1.68] text-t2">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

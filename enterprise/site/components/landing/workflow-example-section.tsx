"use client";

import Image from "next/image";
import {
  BarChart3,
  FileCheck2,
  FileSearch,
  History,
  LockKeyhole,
} from "lucide-react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";
import { SectionHeading } from "./section-heading";

const PROOF_ITEMS = [
  {
    title: "Access is scoped to the workflow",
    body: "Objects, roles, and approval state define who or what can see, change, or route work.",
    icon: LockKeyhole,
  },
  {
    title: "Ownership stays portable",
    body: "Data, schemas, exports, and workflow state remain inspectable and usable outside a single vendor surface.",
    icon: FileCheck2,
  },
  {
    title: "Approvals stay human-readable",
    body: "Exceptions, review state, and operator decisions are part of the record rather than buried in inboxes.",
    icon: FileSearch,
  },
  {
    title: "History remains attributable",
    body: "Source links, exports, status changes, and provenance are visible as first-class product surfaces.",
    icon: History,
  },
  {
    title: "Production evidence is measurable",
    body: "Powerhouse architecture supports 22 business modules. In one measured invoice-review deployment, review time was reduced by 65%. Treat this as deployment evidence, not a universal guarantee.",
    icon: BarChart3,
  },
];

export function WorkflowExampleSection() {
  const rootRef = useRef<HTMLElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <section ref={rootRef} className="border-t border-border bg-ink py-20">
      <SectionContainer>
        <SectionHeading
          className="fade-up mb-14"
          tone="dark"
          eyebrow="Control and ownership"
          title={
            <>
              Control is visible
              <br className="max-sm:hidden" /> in the workflow.
            </>
          }
          lead="Powerhouse turns access, storage, approvals, exports, and history into product surfaces your team can inspect and operate."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.08fr)_360px]">
          <div className="fade-up overflow-hidden rounded-[16px] border border-border bg-paper-soft">
            <Image
              src="/usecases/rfp-hub/03-rfp-detail-provenance.png"
              alt="Powerhouse product screenshot showing a structured RFP record with provenance, application context, dates, and source links."
              width={988}
              height={1218}
              className="h-auto w-full"
            />
          </div>

          <div className="fade-up divide-y divide-border">
            {PROOF_ITEMS.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="py-6 first:pt-0 last:pb-0">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-lifted text-brand">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-[16px] font-semibold text-t1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-t2">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

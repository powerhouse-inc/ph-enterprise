"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TIMING, SCROLL_START } from "@/lib/constants";
import { SectionContainer } from "./section-container";
import { WorkflowSignupButton } from "./workflow-signup-button";

const DELIVERABLES = [
  {
    title: "Workflow map",
    body: "The process boundary, sources, roles, approvals, exceptions, and handoffs.",
    icon: GitBranch,
  },
  {
    title: "AI readiness review",
    body: "Where structure, permissions, or human review are needed before AI can help safely.",
    icon: ShieldCheck,
  },
  {
    title: "Build plan",
    body: "A first sandbox scope with integrations, data model, risks, and deployment path.",
    icon: ClipboardCheck,
  },
];

export function ContactCta() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const cs = contextSafe!;
      const h2 = headingRef.current;
      const actions = actionsRef.current;
      if (!h2 || !actions) return;

      ScrollTrigger.create({
        trigger: h2,
        start: SCROLL_START.HEADING,
        onEnter: cs(() => {
          gsap.to(h2, {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            ...TIMING.HEADING_REVEAL,
          });
        }),
      });

      ScrollTrigger.create({
        trigger: h2,
        start: "top 80%",
        onEnter: cs(() => {
          gsap.to(actions, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: "power3.out",
          });
        }),
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      id="get-started"
      className="border-t border-border bg-ink-deep py-20 md:py-24"
    >
      <SectionContainer>
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            ref={headingRef}
            className="font-heading mb-6 text-[clamp(38px,4.6vw,62px)] font-[680] leading-[1.04] tracking-[-0.02em] text-t1 clip-reveal"
          >
            Start with a workflow assessment.
          </h2>

          <div ref={actionsRef}>
            <p className="mx-auto mb-8 max-w-[600px] text-[18px] leading-[1.65] text-t2">
              Find out where Powerhouse can improve operational efficiency. We
              map the first workflow before a build starts.
            </p>
            <div className="flex items-center justify-center gap-3 max-sm:flex-col">
              <WorkflowSignupButton
                label="Map your first workflow"
                className="h-11 px-5 text-[13px] font-semibold max-sm:w-full"
              />
              <Link
                href="/architecture"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-[13px] font-medium text-t2 transition-colors hover:border-border-md hover:text-t1 max-sm:w-full max-sm:justify-center"
              >
                Architecture
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[720px] space-y-4">
          <div className="rounded-[16px] border border-border bg-surface p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-low text-brand">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-[17px] font-semibold text-t1">
                    Five-day assessment
                  </p>
                  <p className="text-[13px] text-t3">
                    Assessment first. Build after the workflow is clear.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-border">
                {DELIVERABLES.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="grid grid-cols-[28px_1fr] gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <Icon
                      className="mt-0.5 h-4 w-4 text-proof"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-t1">
                        {title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-[1.6] text-t2">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          <p className="text-center text-[12px] leading-[1.6] text-t3">
            Contact requests are routed through the workflow assessment form.
            Local previews capture test submissions locally when email delivery
            is not configured.
          </p>
        </div>
      </SectionContainer>
    </div>
  );
}

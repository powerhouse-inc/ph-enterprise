"use client";

import { useActionState, useEffect, useState } from "react";
import { X } from "lucide-react";
import { submitDemoRequest, type DemoState } from "@/app/actions/submit-demo";
import { Button } from "@/components/ui/button";

const initialState: DemoState = { ok: false };

function WorkflowSignupForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitDemoRequest,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="py-5 text-center">
        <h2 className="font-heading text-[20px] font-semibold tracking-tight text-t1">
          Thanks, we&rsquo;ll be in touch.
        </h2>
        <p className="mx-auto mt-3 max-w-[34ch] text-[14px] leading-[1.7] text-t2">
          We received your email and will follow up about mapping your first
          workflow.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-9 rounded-md px-5 text-[13px]"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-heading text-[20px] font-semibold tracking-tight text-t1">
        Map your workflow
      </h2>
      <p className="mt-2 text-[13px] leading-[1.6] text-t2">
        Leave your work email and we&rsquo;ll follow up about the workflow
        assessment.
      </p>

      <form action={formAction} className="mt-6 space-y-3">
        <input type="hidden" name="intent" value="workflow-email-signup" />
        <input type="hidden" name="topic" value="Workflow mapping request" />
        <input
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div>
          <label
            htmlFor="workflow-signup-email"
            className="mb-1.5 block text-[12px] font-medium text-t2"
          >
            Work email <span className="text-t3">*</span>
          </label>
          <input
            id="workflow-signup-email"
            name="email"
            type="email"
            required
            autoFocus
            placeholder="you@company.com"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none transition-colors placeholder:text-t3 focus:border-border-md"
          />
        </div>

        {state.error ? (
          <p className="text-[12px] text-red-400">{state.error}</p>
        ) : null}

        <Button
          type="submit"
          variant="cta"
          disabled={pending}
          className="h-10 w-full rounded-md px-5 text-[13px] font-medium"
        >
          {pending ? "Sending..." : "Send email"}
        </Button>
        <p className="text-center text-[11px] text-t3">
          No spam. We&rsquo;ll only use this to contact you about Powerhouse.
        </p>
      </form>
    </>
  );
}

export function WorkflowSignupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [instanceId, setInstanceId] = useState(0);

  const open = () => {
    setInstanceId((id) => id + 1);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <Button
        type="button"
        variant="cta"
        className="h-8 px-4 rounded-md text-[13px]"
        onClick={open}
      >
        Map workflow
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Map your workflow"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-[420px] rounded-2xl border border-border bg-[#0E1013] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-t3 transition-colors hover:text-t1"
            >
              <X className="h-4 w-4" />
            </button>
            <WorkflowSignupForm key={instanceId} onClose={close} />
          </div>
        </div>
      ) : null}
    </>
  );
}

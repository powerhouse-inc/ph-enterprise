"use client";

import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitDemoRequest, type DemoState } from "@/app/actions/submit-demo";

type DemoModalContextValue = {
  open: (topic?: string) => void;
  close: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return ctx;
}

const initialState: DemoState = { ok: false };

function Field({
  name,
  label,
  type = "text",
  required,
  autoFocus,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={`demo-${name}`}
        className="mb-1.5 block text-[12px] font-medium text-t2"
      >
        {label}
        {required ? <span className="text-t3"> *</span> : null}
      </label>
      <input
        id={`demo-${name}`}
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none transition-colors placeholder:text-t3 focus:border-border-md"
      />
    </div>
  );
}

function DemoForm({ topic, onClose }: { topic: string; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitDemoRequest,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="py-6 text-center">
        <h2 className="font-heading text-[20px] font-semibold tracking-tight text-t1">
          Thanks, we&rsquo;ll be in touch.
        </h2>
        <p className="mx-auto mt-3 max-w-[34ch] text-[14px] leading-[1.7] text-t2">
          Your request is on its way to our team. We&rsquo;ll reach out at the
          email you provided.
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
        Request a demo
      </h2>
      <p className="mt-2 text-[13px] leading-[1.6] text-t2">
        See Powerhouse running in production. Tell us a little about your team
        and we&rsquo;ll set up a walkthrough.
      </p>

      <form action={formAction} className="mt-6 space-y-3">
        <input type="hidden" name="topic" value={topic} />
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Field name="name" label="Name" required autoFocus />
        <Field name="email" label="Work email" type="email" required />
        <Field name="company" label="Company" required />

        <div>
          <label
            htmlFor="demo-message"
            className="mb-1.5 block text-[12px] font-medium text-t2"
          >
            What would you like to see?{" "}
            <span className="text-t3">(optional)</span>
          </label>
          <textarea
            id="demo-message"
            name="message"
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none transition-colors placeholder:text-t3 focus:border-border-md"
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
          {pending ? "Sending…" : "Request demo"}
        </Button>
        <p className="text-center text-[11px] text-t3">
          No spam. We&rsquo;ll only use this to contact you about a demo.
        </p>
      </form>
    </>
  );
}

export function DemoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("Demo request");
  // Bumped on each open so the form (and its action state) remounts fresh.
  const [instanceId, setInstanceId] = useState(0);

  const open = (nextTopic?: string) => {
    setTopic(nextTopic ?? "Demo request");
    setInstanceId((id) => id + 1);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
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
    <DemoModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request a demo"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-[460px] rounded-2xl border border-border bg-[#0E1013] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-t3 transition-colors hover:text-t1"
            >
              <X className="h-4 w-4" />
            </button>
            <DemoForm key={instanceId} topic={topic} onClose={close} />
          </div>
        </div>
      ) : null}
    </DemoModalContext.Provider>
  );
}

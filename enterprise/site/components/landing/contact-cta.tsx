import { SectionContainer } from "./section-container";
import { BookCallButton } from "./book-call-button";

/* The closing band: one statement, the canonical CTA and the docs. Static. */
export function ContactCta() {
  return (
    <div id="get-started" className="border-t border-border-light bg-paper py-28 text-copy md:py-36">
      <SectionContainer>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-heading mb-6 text-[clamp(32px,3.6vw,48px)] leading-[1.1] font-medium tracking-[-0.02em] text-copy">
            Start with a workflow assessment.
          </h2>
          <p className="mx-auto mb-8 max-w-[600px] text-[18px] leading-[1.6] text-copy-muted">
            Find out where Powerhouse can improve operational efficiency. We map the first workflow before a build starts.
          </p>
          <div className="flex items-center justify-center gap-3 max-sm:flex-col">
            <BookCallButton className="h-11 px-5 text-[14px] max-sm:w-full" event="book-demo-footer" />
            <a
              href="https://vetra.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-md border border-border-light bg-white px-5 text-[14px] font-medium text-copy transition-colors hover:border-copy/30 max-sm:w-full max-sm:justify-center"
            >
              Explore the docs
            </a>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

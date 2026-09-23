import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BookCallButton } from "@/components/landing/book-call-button";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { INTEGRATIONS } from "@/data/integrations";
import { IntegrationRecordCard } from "./integration-record-card";

/**
 * The five parts of an integration. Rendered as a ruled definition list rather
 * than a card grid: DESIGN_STANDARD bans interchangeable feature-card grids,
 * and these are definitions, not features.
 */
const PARTS = [
  {
    term: "Connector",
    body: "A sync package that watches a system you already run, and reacts when something arrives in it. Runs are observable, and a delivery that lands twice is idempotent and refused.",
  },
  {
    term: "Document model",
    body: "The typed structure that data becomes: named fields, and a lifecycle the record moves through. Its history is an append-only log, so a record is auditable and deterministic: replay it and the same state returns.",
  },
  {
    term: "Boundary",
    body: "What enters, in which direction it travels, and who or what is allowed to read the result. Each write step declares the operations it may dispatch, which makes the boundary enforceable.",
  },
  {
    term: "Surfaces",
    body: "Where the structure becomes usable: an operator workspace, a queryable API, a dashboard. All read the same state over GraphQL or plain HTTP, which keeps it portable and interoperable.",
  },
  {
    term: "Deployable",
    body: "Code you can run today, with its prerequisites and its limits written down beside it. Self-hosted and open-source, and scalable by addition: another integration is another workflow, not another rewrite.",
  },
] as const;

/**
 * Objection handling, not marketing copy. Each answer is sourced from a record
 * already on this page, so nothing here can drift from what the integrations
 * actually do.
 */
const QUESTIONS = [
  {
    q: "Does anything leave my infrastructure?",
    a: "Both examples run in Docker on machines you control. The one external call is to the language model that reads a document, and you choose the provider and the model.",
  },
  {
    q: "What is the model actually allowed to do?",
    a: "In the UMH example it may fill the commitment and nothing else. Approval, opening, close-out and acknowledgement stay with people, and the boundary is what enforces that rather than a policy written down elsewhere.",
  },
  {
    q: "What happens when extraction gets it wrong?",
    a: "A reviewer sees the extracted fields beside the original scan before anything is approved. Changing a field records a correction on the document, with the extracted value and yours side by side.",
  },
  {
    q: "Do I have to replace anything?",
    a: "No. Paperless stays the archive for the original documents, and UMH keeps transporting and storing machine data. The integration adds a document model, a review gate and an operation log beside them.",
  },
] as const;

export function IntegrationsIndexPage() {
  // One integration reads as a record, not a grid. The grid engages on its own
  // once a second entry exists, so a sparse two-column layout never ships.
  const isCatalogue = INTEGRATIONS.length > 1;

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        <BlogHeroBand>
          <div className="max-w-[880px]">
            <h1 className="font-heading text-[clamp(38px,4.6vw,62px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
              Every integration is a data boundary.
            </h1>
            <div className="mt-7 max-w-[62ch] space-y-4 text-[17px] leading-[1.7] text-pretty text-t2">
              <p>
                Powerhouse runs alongside the systems you already operate. An
                integration connects one of them to a structured workflow
                layer: what enters, how it is structured, who can read it.
                That makes it a contract you can read before you deploy it.
                The result is operational software your team and scoped AI
                assistance can both work in.
              </p>
            </div>
          </div>
        </BlogHeroBand>

        {/* What an integration is */}
        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
              <div>
                <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
                  What ships in an integration
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
                  Five parts make up an integration. Each one is something you
                  can inspect before you commit to it.
                </p>
              </div>

              <dl className="divide-y divide-border-light border-t border-border-light">
                {PARTS.map((part) => (
                  <div
                    key={part.term}
                    className="grid grid-cols-1 gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[152px_minmax(0,1fr)]"
                  >
                    <dt className="font-mono text-[13px] text-copy">
                      {part.term}
                    </dt>
                    <dd className="text-[15px] leading-[1.6] text-pretty text-copy-muted">
                      {part.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </SectionContainer>
        </section>

        {/* The catalogue */}
        <section className="border-t border-border-light bg-paper py-20 text-copy md:py-24">
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              The integrations
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              Every integration added here carries the same record: its scope,
              the model it writes into, the surfaces it reaches, and its limits.
            </p>

            <div
              className={
                isCatalogue
                  ? "mt-10 grid gap-5 md:grid-cols-2"
                  : "mt-10 max-w-[640px]"
              }
            >
              {INTEGRATIONS.map((integration) => (
                <IntegrationRecordCard
                  key={integration.slug}
                  integration={integration}
                />
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* Questions the records answer, asked the way a buyer asks them. */}
        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              Before you wire anything up
            </h2>

            <dl className="mt-10 divide-y divide-border-light border-t border-border-light">
              {QUESTIONS.map((item) => (
                <div
                  key={item.q}
                  className="grid grid-cols-1 gap-x-10 gap-y-2 py-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]"
                >
                  <dt className="font-heading text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] text-copy">
                    {item.q}
                  </dt>
                  <dd className="text-[15px] leading-[1.65] text-pretty text-copy-muted">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </SectionContainer>
        </section>

        {/* Close */}
        <section className="border-t border-border-light bg-paper-soft py-24 text-copy md:py-28">
          <SectionContainer>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-heading text-[clamp(30px,3.4vw,46px)] leading-[1.08] font-[680] tracking-[-0.02em] text-copy">
                Connect the system you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-pretty text-copy-muted">
                Tell us which system holds the workflow, and we will walk
                through what entering the structured layer would look like.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <BookCallButton
                  className="h-12 rounded-lg px-6 text-[15px]"
                  event="book-demo-integrations-index-footer"
                />
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

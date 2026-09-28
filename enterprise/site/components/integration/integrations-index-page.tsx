import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BookCallButton } from "@/components/landing/book-call-button";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { CATALOGUE, LISTED_INTEGRATIONS } from "@/data/integrations";
import { BoundaryDiagram } from "./boundary-diagram";
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
 * Questions about the approach, asked the way a buyer asks them. None of them
 * is about one integration, so the section does not go stale as records are
 * added. Every answer restates a commitment the site already makes (MESSAGE.md
 * and the why section), and the compliance answer carries the same
 * qualification the procurement page does, as COPY_STANDARD requires.
 */
const QUESTIONS = [
  {
    q: "Where do we start?",
    a: "With a workflow assessment. We look at one workflow where the documents are private and the decisions carry weight, and structure it before anything is built. The assessment decides whether a build makes sense, so starting it commits you to nothing further.",
  },
  {
    q: "Do we have to replace the systems we already run?",
    a: "No. Powerhouse runs alongside them. The archive, the data layer or the ERP keeps doing its job, and the integration adds a document model, a review step and an operation history beside it. Replacing a system later stays your choice.",
  },
  {
    q: "What is AI allowed to do?",
    a: "Only what a workflow step declares. Each write step names the actions it may dispatch, and anything consequential, such as approval, stays with a person. Where a source system can confirm an answer, the model's output is checked against it before it is written.",
  },
  {
    q: "Where does our data go, and which model reads it?",
    a: "Deployment is chosen per workflow: local, self-hosted or managed, depending on how sensitive the work is. The model is chosen the same way, and that choice can change as your needs and policy change.",
  },
  {
    q: "What do we own at the end?",
    a: "The software itself. Powerhouse is an open-source platform, the document models and their data are portable, and every change is kept in an operation history you can read. Your team can inspect, extend and operate the system.",
  },
  {
    q: "Does this make a workflow compliant?",
    a: "It gives you the structure oversight tends to ask for: human approval where it matters, attributable history, and inputs you can trace back to their source. Whether a given workflow meets a given regulation is assessed per engagement, and we do not claim it on your behalf.",
  },
] as const;

/**
 * What Powerhouse adds on top of a piece. A piece moves an event between
 * services; these are the things that exist only because the event lands in a
 * document. Kept in plain words, per the feedback that the page carried too
 * much vocabulary.
 */
const ADDS = [
  {
    term: "Models for your industry",
    body: "Invoices, production ledgers, knowledge sources. Each is a typed record with named fields and the stages it moves through.",
  },
  {
    term: "Structured data",
    body: "What a workflow reads lands in a record your team, your reports and your AI tools all query the same way.",
  },
  {
    term: "People approve",
    body: "Each workflow step names what it may change. Approval and sign-off stay with a person.",
  },
  {
    term: "A full history",
    body: "Every change is kept on the record, with when it happened and who or what made it.",
  },
] as const;

/**
 * The install path. Kept to what holds for every listed record: a Switchboard
 * is required, packages come from the Vetra registry, and Workflows is an
 * environment add-on that loads pieces from the registry at run time.
 */
const INSTALL = [
  {
    term: "Run a Switchboard",
    body: "The Powerhouse server that holds your documents and runs workflows. Host it yourself, or use a managed one on Vetra Cloud.",
  },
  {
    term: "Install the packages",
    body: "Each record lists its packages. Install them from the Vetra registry, together, at the versions the record names.",
  },
  {
    term: "Turn on Workflows",
    body: "Only for integrations built from pieces. Workflows is an add-on for the environment, and it loads each piece from the registry when a workflow runs.",
  },
  {
    term: "Open it in Connect",
    body: "The records the integration writes appear in a drive, ready for a person to review.",
  },
] as const;

export function IntegrationsIndexPage() {
  // Records stack as full-width rows. Alternating the evidence side only makes
  // sense once there is more than one record to alternate between.
  const isCatalogue = LISTED_INTEGRATIONS.length > 1;

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        <BlogHeroBand>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
            <div>
              <h1 className="font-heading text-[clamp(40px,4.6vw,62px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
                Every integration is a data boundary.
              </h1>
              <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.7] text-pretty text-t2">
                Powerhouse runs alongside the systems you already operate. An
                integration connects one of them to a structured workflow
                layer: what enters, how it is structured, who can read it.
                That makes it a contract you can read before you deploy it.
                The result is operational software your team and scoped AI
                assistance can both work in.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <BookCallButton
                  className="h-11 rounded-md px-5 text-[14px]"
                  event="book-demo-integrations-index-hero"
                />
                <a
                  href="#records"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-t2 transition-colors hover:text-t1"
                >
                  See the integrations
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* The pattern every integration shares, rather than one use case. */}
            <figure className="hidden lg:block">
              <BoundaryDiagram />
              <figcaption className="mt-4 text-[13px] leading-[1.55] text-t3">
                The same shape for every system: what enters, the document it
                becomes, and every place it can be read.
              </figcaption>
            </figure>
          </div>
        </BlogHeroBand>

        {/* The integrations, first after the hero. */}
        <section
          id="records"
          className="scroll-mt-20 border-t border-border-light bg-paper py-20 text-copy md:py-24"
        >
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              The integrations
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              Each one names what starts it, what it does, and what it may
              touch. Open a record for the full detail and how to run it.
            </p>

            <div className="mt-12 flex flex-col gap-6">
              {LISTED_INTEGRATIONS.map((integration, i) => (
                <IntegrationRecordCard
                  key={integration.slug}
                  integration={integration}
                  flip={isCatalogue && i % 2 === 1}
                />
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* Activepieces as the catalogue the integrations are built in. */}
        <section
          id="catalogue"
          className="scroll-mt-20 border-t border-border-light bg-paper-soft py-20 text-copy md:py-24"
        >
          <SectionContainer>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
              <div>
                <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
                  Hundreds more through the {CATALOGUE.name} catalogue
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
                  {CATALOGUE.name} is an open-source catalogue of several
                  hundred pieces. Each piece connects one service. Its
                  triggers start a workflow, and its actions do something in
                  that service. Powerhouse runs the catalogue on your
                  Switchboard, so a piece can feed any workflow.
                </p>
                <div className="mt-7 flex flex-col items-start gap-3">
                  <a
                    href="https://www.activepieces.com/pieces"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
                  >
                    Browse the pieces
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    href={`/integrations/${CATALOGUE.slug}`}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
                  >
                    How Powerhouse runs them
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-[19px] leading-[1.3] font-semibold tracking-[-0.01em] text-copy">
                  What Powerhouse adds to a piece
                </h3>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-[1.6] text-pretty text-copy-muted">
                  A piece passes an event from one service to the next.
                  Powerhouse gives that event somewhere to land.
                </p>
                <dl className="mt-6 divide-y divide-border-light border-t border-border-light">
                  {ADDS.map((item) => (
                    <div
                      key={item.term}
                      className="grid grid-cols-1 gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[192px_minmax(0,1fr)]"
                    >
                      <dt className="text-[15px] font-semibold text-copy">
                        {item.term}
                      </dt>
                      <dd className="text-[15px] leading-[1.6] text-pretty text-copy-muted">
                        {item.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Install path. A Switchboard is the one hard prerequisite. */}
        <section
          id="install"
          className="scroll-mt-20 border-t border-border-light bg-paper py-20 text-copy md:py-24"
        >
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              Install an integration
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              Every integration installs onto a Switchboard. You need one
              before you start.
            </p>
            <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-border-light pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {INSTALL.map((step, i) => (
                <li key={step.term}>
                  <span className="font-mono text-[13px] text-copy-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[16px] font-semibold text-copy">
                    {step.term}
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.6] text-pretty text-copy-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </section>

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

        {/* Questions about the approach, independent of any one integration. */}
        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              How we approach it
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
                  className="h-11 rounded-md px-5 text-[14px]"
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

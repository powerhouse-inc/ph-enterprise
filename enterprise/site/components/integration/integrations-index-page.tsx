import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BookCallButton } from "@/components/landing/book-call-button";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { CATALOGUE, LISTED_INTEGRATIONS } from "@/data/integrations";
import { DistyraPreview } from "./distyra-preview";
import { IntegrationRecordCard } from "./integration-record-card";
import { IntegrationsHero } from "./integrations-hero";



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
 * PLACEHOLDER: the install walkthrough post is not written yet. Points at the
 * blog index so the link never 404s; set the post's slug when it lands.
 */
const INSTALL_GUIDE_HREF = "/blog";

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
        <IntegrationsHero />

        {/* The integrations, first after the hero. */}
        <section
          id="records"
          className="scroll-mt-20 border-t border-border-light bg-paper py-20 text-copy md:py-24"
        >
          <SectionContainer>
            <h2 className="font-heading text-[clamp(30px,3.2vw,42px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
              Enterprise apps built this way
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              Each one pairs a professional system with a document model and
              an app, and adds Activepieces pieces where the workflow needs
              them. Open one for the full detail and how to run it.
            </p>

            <div className="mt-12 flex flex-col gap-6">
              {LISTED_INTEGRATIONS.map((integration, i) => (
                <IntegrationRecordCard
                  key={integration.slug}
                  integration={integration}
                  flip={isCatalogue && i % 2 === 1}
                  evidence={
                    integration.slug === "distyra" ? <DistyraPreview /> : undefined
                  }
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
            <Link
              href={INSTALL_GUIDE_HREF}
              className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
            >
              Read the step-by-step guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
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

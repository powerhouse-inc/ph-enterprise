import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BookCallButton } from "@/components/landing/book-call-button";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import type { IntegrationEntry } from "@/data/integrations";
import { RecordVideo } from "./record-video";

/**
 * Sub-labels inside a section. Sentence case at body weight: DESLOP lists
 * uppercase tracked labels as a tell, and these carry information the heading
 * does not, so they stay as plain text rather than being styled up.
 */
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[14px] font-semibold text-copy ${className}`}>{children}</p>
  );
}

/** The hero's actions, shared by both hero layouts so they cannot drift. */
function HeroActions({
  repoUrl,
  walkthroughSlug,
  className = "",
}: {
  repoUrl?: string;
  walkthroughSlug?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-4 ${className}`}>
      <BookCallButton
        className="h-11 rounded-md px-5 text-[14px]"
        event="book-demo-integration-detail-hero"
      />
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-1.5 rounded-md border border-border-md bg-white/5 px-5 text-[14px] font-semibold text-t1 transition-colors hover:bg-white/10"
        >
          Run it yourself
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
      {walkthroughSlug ? (
        <Link
          href={`/blog/${walkthroughSlug}`}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-t2 transition-colors hover:text-t1"
        >
          Read the walkthrough
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[clamp(28px,3vw,40px)] leading-[1.14] font-[680] tracking-[-0.02em] text-copy">
      {children}
    </h2>
  );
}

export function IntegrationPage({
  integration,
}: {
  integration: IntegrationEntry;
}) {
  const {
    name,
    category,
    status,
    claim,
    oneLiner,
    primer,
    direction,
    inputs,
    scope,
    model,
    boundary,
    pipeline,
    surfaces,
    packages,
    requirements,
    limits,
    sample,
    repoUrl,
    walkthroughSlug,
    shots,
    video,
  } = integration;

  // The hero carries one piece of first-viewport evidence. A walkthrough video
  // wins when there is one, since it shows the whole flow; the lead shot then
  // joins the gallery. Without a video the lead shot opens the page, and on
  // mobile, where that hero figure is hidden, it drops into the gallery.
  const lead = video ? undefined : shots?.[0];
  const rest = video ? (shots ?? []) : (shots?.slice(1) ?? []);

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        {/* Identity */}
        <BlogHeroBand>
          <Link
            href="/integrations"
            className="mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-t3 transition-colors hover:text-t1"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All integrations
          </Link>

          {video ? (
            // A walkthrough is the page's strongest evidence, and its type was
            // set for 1920px. It gets the full container width below the
            // promise rather than half a split, where its labels are too
            // small to read.
            <>
              <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
                {/* Set a step smaller than the split hero: here the video, not
                    the headline, has to reach the first viewport. */}
                <h1 className="font-heading text-[clamp(36px,3.7vw,50px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
                  {name}
                  <span className="mt-1 block text-t2">{claim}</span>
                </h1>

                <div>
                  <p className="max-w-[48ch] text-[17px] leading-[1.7] text-pretty text-t2">
                    {oneLiner}
                  </p>
                  <p className="mt-4 text-[14px] text-t3">
                    {category}
                    <span className="px-2 text-t3/50" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-medium text-proof">{status}</span>
                  </p>
                  <HeroActions
                    repoUrl={repoUrl}
                    walkthroughSlug={walkthroughSlug}
                    className="mt-7"
                  />
                </div>
              </div>

              <figure className="mt-10 lg:mt-12">
                <div className="overflow-hidden rounded-[14px] border border-border-md bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  <RecordVideo
                    src={video.src}
                    poster={video.poster}
                    width={video.width}
                    height={video.height}
                    label={video.label}
                  />
                </div>
                <figcaption className="mt-4 max-w-[80ch] text-[13px] leading-[1.55] text-t3">
                  {video.caption}
                </figcaption>
              </figure>
            </>
          ) : (
            <div
              className={
                lead
                  ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14"
                  : "max-w-[880px]"
              }
            >
              <div>
                <h1 className="font-heading text-[clamp(38px,4.4vw,58px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
                  {name}
                  <span className="mt-1 block text-t2">{claim}</span>
                </h1>

                <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.7] text-pretty text-t2">
                  {oneLiner}
                </p>

                <p className="mt-5 text-[14px] text-t3">
                  {category}
                  <span className="px-2 text-t3/50" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-medium text-proof">{status}</span>
                </p>

                <HeroActions
                  repoUrl={repoUrl}
                  walkthroughSlug={walkthroughSlug}
                  className="mt-9"
                />
              </div>

              {lead ? (
                <figure className="hidden lg:block">
                  <div className="overflow-hidden rounded-[12px] border border-border-md shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <Image
                      src={lead.src}
                      alt={lead.alt}
                      width={lead.width}
                      height={lead.height}
                      priority
                      sizes="(min-width: 1024px) 46vw, 0px"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4 text-[13px] leading-[1.55] text-t3">
                    {lead.caption}
                  </figcaption>
                </figure>
              ) : null}
            </div>
          )}
        </BlogHeroBand>

        {/* The boundary */}
        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
              <div>
                <SectionTitle>The boundary</SectionTitle>
                <div className="mt-5 max-w-[62ch] space-y-4 text-[16px] leading-[1.7] text-pretty text-copy-muted">
                  {boundary.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                {primer ? (
                <div className="mt-8 rounded-[14px] border border-border-light bg-white/60 p-6">
                  <Label>{primer.label}</Label>
                  <p className="mt-3 text-[15px] leading-[1.65] text-pretty text-copy-muted">
                    {primer.body}
                  </p>
                </div>
                ) : null}
              </div>

              <div>
                <dl className="divide-y divide-border-light border-y border-border-light">
                  {scope.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[104px_minmax(0,1fr)] items-baseline gap-4 py-4"
                    >
                      <dt className="text-[12.5px] font-semibold text-copy-muted">
                        {row.label}
                      </dt>
                      <dd className="text-[14.5px] leading-[1.5] text-copy">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[104px_minmax(0,1fr)] items-baseline gap-4 py-4">
                    <dt className="text-[12.5px] font-semibold text-copy-muted">
                      Direction
                    </dt>
                    <dd className="text-[14.5px] leading-[1.5] text-copy">
                      {direction}
                    </dd>
                  </div>
                </dl>

                {inputs ? (
                  <>
                <Label className="mt-8">How material gets in</Label>
                <ul className="mt-4 space-y-2.5">
                  {inputs.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.6] text-pretty text-copy-muted"
                    >
                      <span
                        className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-copy-muted/50"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                  </>
                ) : null}
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* The document model */}
        {model ? (
        <section className="border-t border-border-light bg-paper py-20 text-copy md:py-24">
          <SectionContainer>
            <SectionTitle>The document model</SectionTitle>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              This is the structure the integration writes into. The fields are
              the same whether a person opens the record, an application queries
              it, or a scoped agent reads it.
            </p>

            <div className="mt-10 overflow-hidden rounded-[16px] border border-border-light bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light px-6 py-4">
                <span className="font-mono text-[13.5px] font-semibold text-copy">
                  {model.name}
                </span>
                <span className="text-[12px] text-copy-muted">
                  {model.fields.length} fields
                </span>
              </div>

              <dl className="divide-y divide-border-light">
                {model.fields.map((field) => (
                  <div
                    key={field.name}
                    className="grid grid-cols-1 gap-x-6 gap-y-1 px-6 py-3.5 sm:grid-cols-[190px_84px_minmax(0,1fr)] sm:items-baseline"
                  >
                    <dt className="font-mono text-[13px] text-copy">
                      {field.name}
                    </dt>
                    <dd className="font-mono text-[12px] text-copy-muted">
                      {field.type}
                    </dd>
                    <dd className="text-[14px] leading-[1.5] text-pretty text-copy-muted">
                      {field.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Label className="mt-10">Lifecycle</Label>
            <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5">
              {model.lifecycle.map((state, i) => (
                <li key={state} className="flex items-center gap-2">
                  <span className="rounded-md border border-border-light bg-white px-2.5 py-1 font-mono text-[12.5px] text-copy">
                    {state}
                  </span>
                  {i < model.lifecycle.length - 1 ? (
                    <span className="text-copy-muted/45" aria-hidden="true">
                      &rarr;
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.6] text-pretty text-copy-muted">
              Every transition is a signed operation on the record, so the
              history of the document is the audit trail.
            </p>
          </SectionContainer>
        </section>

        ) : null}

        {/* How it runs */}
        {pipeline ? (
        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <SectionTitle>How it runs</SectionTitle>
            <ol className="mt-10 divide-y divide-border-light border-y border-border-light">
              {pipeline.map((step, i) => (
                <li
                  key={step.label}
                  className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 sm:grid-cols-[40px_180px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-[13px] text-copy-muted/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-[17px] font-semibold text-copy">
                    {step.label}
                  </span>
                  <span className="text-[15px] leading-[1.65] text-pretty text-copy-muted">
                    {step.body}
                  </span>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </section>
        ) : null}

        {/* Surfaces */}
        <section className="border-t border-border-light bg-paper py-20 text-copy md:py-24">
          <SectionContainer>
            <SectionTitle>Where the result shows up</SectionTitle>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
              One record, reachable from several places. The archive keeps the
              original document, and the structured state is available wherever
              the work happens.
            </p>

            <dl className="mt-10 divide-y divide-border-light border-y border-border-light">
              {surfaces.map((surface) => (
                <div
                  key={surface.name}
                  className="grid grid-cols-1 gap-x-8 gap-y-1.5 py-5 sm:grid-cols-[200px_minmax(0,1fr)]"
                >
                  <dt className="font-heading text-[16px] font-semibold text-copy">
                    {surface.href ? (
                      <Link
                        href={surface.href}
                        className="underline-offset-4 hover:underline"
                      >
                        {surface.name}
                      </Link>
                    ) : (
                      surface.name
                    )}
                  </dt>
                  <dd className="text-[15px] leading-[1.65] text-pretty text-copy-muted">
                    {surface.role}
                  </dd>
                </div>
              ))}
            </dl>

            {sample ? (
              <div className="mt-10">
                <Label>{sample.label}</Label>
                <pre className="mt-4 overflow-x-auto rounded-[14px] border border-border-light bg-ink p-6 text-[13px] leading-[1.6] text-t2">
                  <code>{sample.code}</code>
                </pre>
              </div>
            ) : null}

            {lead ? (
              <figure className="mt-12 lg:hidden">
                <Image
                  src={lead.src}
                  alt={lead.alt}
                  width={lead.width}
                  height={lead.height}
                  className="w-full rounded-[14px] border border-border-light shadow-[0_8px_28px_rgba(17,22,20,0.16)]"
                />
                <figcaption className="mt-3 text-[13.5px] leading-[1.55] text-copy-muted">
                  {lead.caption}
                </figcaption>
              </figure>
            ) : null}

            {rest.map((shot) =>
              shot.stages && shot.height > shot.width ? (
                // A tall capture with a reading guide: the guide runs the
                // height of the image beside it, stage by stage, so the eye can
                // track each group of blocks against its description.
                <figure
                  key={shot.src}
                  className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[600px_minmax(0,1fr)] lg:gap-16"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 1024px) 600px, 92vw"
                    // self-start keeps the grid from stretching it off its
                    // aspect ratio; the guide column sets the row height.
                    className="mx-auto h-auto w-full max-w-[600px] self-start rounded-[14px] border border-border-light shadow-[0_8px_28px_rgba(17,22,20,0.16)]"
                  />
                  <div className="flex flex-col lg:py-2">
                    <figcaption className="max-w-[46ch] text-[17px] leading-[1.6] text-pretty text-copy">
                      {shot.caption}
                    </figcaption>
                    <ol className="mt-8 flex flex-1 flex-col justify-between gap-6">
                      {shot.stages.map((stage) => (
                        <li
                          key={stage.heading}
                          className="border-t border-border-light pt-4"
                        >
                          <h3 className="font-heading text-[17px] font-semibold text-copy">
                            {stage.heading}
                          </h3>
                          <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-pretty text-copy-muted">
                            {stage.body}
                          </p>
                          <ul className="mt-2.5 space-y-1.5">
                            {stage.steps.map((step) => (
                              <li
                                key={step.label}
                                className="flex flex-wrap items-baseline gap-x-2 text-[14px]"
                              >
                                <span className="text-copy">{step.label}</span>
                                <span className="font-mono text-[12.5px] text-copy-muted">
                                  {step.piece}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </div>
                </figure>
              ) : (
                <figure
                  key={shot.src}
                  className={
                    shot.height > shot.width
                      ? "mx-auto mt-12 max-w-[560px]"
                      : "mt-12"
                  }
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="w-full rounded-[14px] border border-border-light shadow-[0_8px_28px_rgba(17,22,20,0.16)]"
                  />
                  <figcaption className="mt-3 text-[13.5px] leading-[1.55] text-copy-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              ),
            )}
          </SectionContainer>
        </section>

        {/* Run it yourself. Only when there is genuinely something to run. */}
        {repoUrl || requirements || packages ? (
          <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
            <SectionContainer>
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <SectionTitle>Run it yourself</SectionTitle>
                  {repoUrl ? (
                    <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-pretty text-copy-muted">
                      The example is published as a repository you can clone
                      and run against your own reactor.
                    </p>
                  ) : null}

                  {requirements ? (
                    <>
                      <Label className="mt-8">What you need</Label>
                      <ul className="mt-4 space-y-2.5">
                        {requirements.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[15px] leading-[1.6] text-pretty text-copy-muted"
                          >
                            <span
                              className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-copy-muted/50"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {repoUrl ? (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-copy hover:underline"
                    >
                      Open the example repository
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>

                {packages ? (
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold tracking-[-0.015em] text-copy">
                      Packages installed
                    </h3>
                    <dl className="mt-5 divide-y divide-border-light border-y border-border-light">
                      {packages.map((pkg) => (
                        <div key={pkg.name} className="py-4">
                          <dt className="font-mono text-[13px] text-copy">
                            {pkg.name}
                          </dt>
                          <dd className="mt-1 text-[14px] leading-[1.55] text-pretty text-copy-muted">
                            {pkg.role}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            </SectionContainer>
          </section>
        ) : null}

        {/* Limits. Stands on its own so a record without a repo still states them. */}
        {limits ? (
          <section className="border-t border-border-light bg-paper py-20 text-copy md:py-24">
            <SectionContainer>
              <SectionTitle>Limits worth knowing</SectionTitle>
              <ul className="mt-8 max-w-[76ch] divide-y divide-border-light border-y border-border-light">
                {limits.map((item) => (
                  <li
                    key={item}
                    className="py-4 text-[15px] leading-[1.65] text-pretty text-copy-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SectionContainer>
          </section>
        ) : null}

        {/* Close */}
        <section className="border-t border-border-light bg-paper py-24 text-copy md:py-28">
          <SectionContainer>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-heading text-[clamp(30px,3.4vw,46px)] leading-[1.08] font-[680] tracking-[-0.02em] text-copy">
                Start with a workflow assessment.
              </h2>
              <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-pretty text-copy-muted">
                Find out where Powerhouse can improve operational efficiency. We
                structure the first workflow before a build starts.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <BookCallButton
                  className="h-11 rounded-md px-5 text-[14px]"
                  event="book-demo-integration-detail-footer"
                />
              </div>
              <Link
                href="/integrations"
                className="mt-12 inline-flex items-center gap-1.5 text-[13px] font-medium text-copy-muted transition-colors hover:text-copy"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                All integrations
              </Link>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

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
    slug,
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
  } = integration;

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        {/* Identity */}
        <BlogHeroBand>
          <div className="max-w-[880px]">
            <Link
              href="/integrations"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-t3 transition-colors hover:text-t1"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All integrations
            </Link>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[12.5px] text-t3">{slug}</span>
              <span className="text-t3/50" aria-hidden="true">
                /
              </span>
              <span className="text-[12px] font-semibold tracking-[0.06em] text-t2 uppercase">
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-t1">
                <span
                  className="h-[5px] w-[5px] rounded-full bg-proof"
                  aria-hidden="true"
                />
                {status}
              </span>
            </div>

            <h1 className="mt-6 font-heading text-[clamp(36px,4.4vw,58px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
              {name}
              <span className="mt-1 block text-t2">{claim}</span>
            </h1>

            <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-pretty text-t2">
              {oneLiner}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-border-md bg-white/5 px-5 text-[14px] font-semibold text-t1 transition-colors hover:bg-white/10"
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
          </div>
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
                  <p className="text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
                    {primer.label}
                  </p>
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
                <p className="mt-8 text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
                  How material gets in
                </p>
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
              This is the structure a captured document becomes. The fields are
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

            <p className="mt-10 text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
              Lifecycle
            </p>
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
                <p className="text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
                  {sample.label}
                </p>
                <pre className="mt-4 overflow-x-auto rounded-[14px] border border-border-light bg-ink p-6 text-[13px] leading-[1.6] text-t2">
                  <code>{sample.code}</code>
                </pre>
              </div>
            ) : null}

            {shots?.map((shot) => (
              <figure key={shot.src} className="mt-12">
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
            ))}
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
                      The example runs locally from a Docker-based repository.
                    </p>
                  ) : null}

                  {requirements ? (
                    <>
                      <p className="mt-8 text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
                        What you need
                      </p>
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
                  className="h-12 rounded-lg px-6 text-[15px]"
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

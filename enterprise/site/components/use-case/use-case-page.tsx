import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "@/components/landing/section-container";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import type { UseCaseDetail, UseCaseScreenshot } from "@/data/use-cases-detail";
import type { CSSWithVars } from "@/lib/utils";

function UseCaseNav({ useCase }: { useCase: UseCaseDetail }) {
  return (
    <header className="sticky top-0 z-200 h-[64px] border-b border-white/8 bg-[rgba(11,13,15,0.84)] backdrop-blur-[24px]">
      <SectionContainer className="flex h-full max-w-[1180px] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Powerhouse Enterprise"
        >
          <PowerhouseMark className="h-5 w-5 text-[rgba(243,245,247,0.7)]" />
          <span className="font-heading text-[15px] font-semibold tracking-tight text-t1">
            Powerhouse
          </span>
          <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-wide text-t3">Use Cases</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 rounded-md px-4 text-[13px] max-md:hidden" asChild>
            <Link href="/use-cases">All use cases</Link>
          </Button>
          <Button variant="cta" className="h-8 rounded-md px-4 text-[13px]" asChild>
            <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">
              Demo
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-t3">
      <span
        className="h-[5px] w-[5px] rounded-full bg-[var(--uc-accent)] shadow-[0_0_8px_var(--uc-accent)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/** A framed screenshot. The aspect-ratio box reserves space from the shot's
    intrinsic dimensions, so the image loading never shifts the layout (CLS).
    `cap` bounds the rendered width — used for tall "full" shots so a portrait
    UI doesn't tower over the page. */
function Shot({ shot, cap }: { shot: UseCaseScreenshot; cap?: string }) {
  return (
    <figure className="m-0">
      <div
        className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
        style={{ maxWidth: cap }}
      >
        <div style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot.src}
            alt={shot.caption}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        </div>
      </div>
      <figcaption className="mx-auto mt-3 max-w-[60ch] text-[13px] leading-[1.6] text-t3">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** One story beat.
    - No shot: copy spans a comfortable reading column.
    - "wide" shot: copy and image share a 2-column row; `flip` alternates sides.
    - "full" shot: dense / portrait UI — copy sits in a centered column on top,
      the image breaks out to full width below so detail stays legible. */
function MediaRow({
  eyebrow,
  shot,
  flip,
  children,
}: {
  eyebrow: string;
  shot?: UseCaseScreenshot;
  flip: boolean;
  children: React.ReactNode;
}) {
  if (!shot) {
    return (
      <section className="border-b border-border py-14 md:py-16">
        <SectionContainer className="max-w-[1180px]">
          <div className="max-w-[44rem]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-1">{children}</div>
          </div>
        </SectionContainer>
      </section>
    );
  }

  if (shot.layout === "full") {
    // Portrait shots get a narrower cap so they don't dominate; near-square ones
    // can run a touch wider.
    const portrait = shot.height >= shot.width;
    return (
      <section className="border-b border-border py-14 md:py-16">
        <SectionContainer className="max-w-[1180px]">
          <div className="max-w-[46rem]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-1">{children}</div>
          </div>
          <div className="mt-10">
            <Shot shot={shot} cap={portrait ? "640px" : "860px"} />
          </div>
        </SectionContainer>
      </section>
    );
  }

  return (
    <section className="border-b border-border py-14 md:py-16">
      <SectionContainer className="max-w-[1180px]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className={flip ? "md:order-2" : undefined}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-1">{children}</div>
          </div>
          <div className={flip ? "md:order-1" : undefined}>
            <Shot shot={shot} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

type Block = {
  key: string;
  eyebrow: string;
  shot?: UseCaseScreenshot;
  content: React.ReactNode;
};

export function UseCasePage({ useCase }: { useCase: UseCaseDetail }) {
  const shots = useCase.screenshots;
  let s = 0;
  const nextShot = () => (s < shots.length ? shots[s++] : undefined);

  const blocks: Block[] = [
    {
      key: "problem",
      eyebrow: "The problem",
      shot: nextShot(),
      content: (
        <div className="space-y-4 text-[15px] leading-[1.72] text-t2 md:text-[16px]">
          {useCase.problem.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      ),
    },
    {
      key: "solution",
      eyebrow: "What it does",
      shot: nextShot(),
      content: (
        <div className="space-y-4 text-[15px] leading-[1.72] text-t2 md:text-[16px]">
          {useCase.solution.map((para) => (
            <p key={para}>{para}</p>
          ))}
          {useCase.solutionSteps ? (
            <ul className="mt-5 space-y-3" role="list">
              {useCase.solutionSteps.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--uc-accent)]" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-t1">{step.label}.</span> {step.body}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ),
    },
  ];

  // Extra screenshots (beyond problem + solution) become their own beats,
  // attached to the remaining narrative so nothing piles up at the end.
  if (s < shots.length) {
    blocks.push({
      key: "how",
      eyebrow: "How it works",
      shot: nextShot(),
      content: (
        <div className="space-y-4 text-[15px] leading-[1.72] text-t2 md:text-[16px]">
          {useCase.howItWorks.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      ),
    });
  } else {
    blocks.push({
      key: "how",
      eyebrow: "How it works",
      content: (
        <div className="space-y-4 text-[15px] leading-[1.72] text-t2 md:text-[16px]">
          {useCase.howItWorks.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      ),
    });
  }

  blocks.push({
    key: "outcome",
    eyebrow: "The outcome",
    shot: nextShot(),
    content: (
      <ul className="space-y-3" role="list">
        {useCase.outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-3">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--uc-accent)]" aria-hidden="true" />
            <span className="text-[15px] leading-[1.66] text-t2 md:text-[16px]">{outcome}</span>
          </li>
        ))}
      </ul>
    ),
  });

  // Any screenshots still unused (e.g. a 5th shot) trail as full beats so
  // every image gets placed without a bottom dump.
  while (s < shots.length) {
    const shot = shots[s];
    blocks.push({
      key: `extra-${s}`,
      eyebrow: "In the product",
      shot,
      content: (
        <p className="text-[15px] leading-[1.72] text-t2 md:text-[16px]">{shot.caption}</p>
      ),
    });
    s++;
  }

  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <UseCaseNav useCase={useCase} />

      <main
        className="relative overflow-hidden"
        style={
          {
            "--uc-accent": useCase.accent,
            "--uc-accent-soft": useCase.accentSoft,
          } as CSSWithVars
        }
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true">
          <div className="absolute left-[8%] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--uc-accent-soft)_0%,transparent_72%)] blur-3xl" />
          <div className="absolute right-[10%] top-24 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,transparent_72%)] blur-3xl" />
        </div>

        {/* Hero */}
        <section className="relative border-b border-border py-16 md:py-20">
          <SectionContainer className="max-w-[1180px]">
            <Link
              href="/use-cases"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-t3 transition-colors hover:text-t1"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Use cases
            </Link>

            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-t3">
              <span className="font-semibold uppercase tracking-[0.12em] text-[var(--uc-accent)]">
                Use case
              </span>
              <span aria-hidden="true">—</span>
              <span>{useCase.domain}</span>
            </div>

            <h1 className="mt-6 max-w-[16ch] text-pretty text-[clamp(38px,5vw,64px)] font-[680] leading-[0.98] tracking-[-0.05em] text-t1 font-heading">
              {useCase.title}
            </h1>

            <p className="mt-7 max-w-[46rem] text-[17px] leading-[1.78] text-t2 md:text-[18px]">
              {useCase.oneLiner}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="cta" className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
                <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">
                  Request a demo
                </Link>
              </Button>
              {useCase.liveUrl ? (
                <Button variant="outline" className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
                  <a href={useCase.liveUrl} target="_blank" rel="noreferrer">
                    View it live
                    <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>

            <div className="mt-10 rounded-3xl border border-[color:var(--uc-accent-soft)] bg-[linear-gradient(135deg,var(--uc-accent-soft),rgba(255,255,255,0.03))] p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[var(--uc-accent)]">
                In short
              </p>
              <p className="mt-3 max-w-[60rem] text-[15px] leading-[1.78] text-t1 md:text-[16px]">
                {useCase.summary}
              </p>
            </div>
          </SectionContainer>
        </section>

        {/* Interleaved story: each block pairs a section of copy with a screenshot,
            consumed in order. Wide shots sit beside the copy (alternating sides);
            dense / portrait shots break out to a full-width row below the copy. */}
        {blocks.map((block, index) => (
          <MediaRow
            key={block.key}
            shot={block.shot}
            flip={index % 2 === 1}
            eyebrow={block.eyebrow}
          >
            {block.content}
          </MediaRow>
        ))}

        {/* CTA */}
        <section className="border-t border-border py-16 md:py-20">
          <SectionContainer className="max-w-[1180px]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-t3">
                Same framework, your domain
              </p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(26px,3vw,38px)] font-[680] leading-[1.08] tracking-[-0.04em] text-t1 font-heading">
                Have a problem that looks nothing like these?
              </h2>
              <p className="mt-4 max-w-[44rem] text-[16px] leading-[1.78] text-t2">
                These are a handful of examples, not a product list — the same building blocks
                adapt to whatever you’re working on.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="cta" className="h-10 rounded-md px-5 text-[13px] font-medium" asChild>
                  <Link href="mailto:hello@powerhouse.inc?subject=Enterprise%20Demo%20Request">
                    Request a demo
                  </Link>
                </Button>
                <Link
                  href="/use-cases"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-t1 transition-colors hover:text-[var(--uc-accent)]"
                >
                  See all use cases
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

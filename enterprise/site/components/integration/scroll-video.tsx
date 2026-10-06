"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import type { IntegrationVideo, VideoChapter } from "@/data/integrations";
import { SectionContainer } from "@/components/landing/section-container";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RecordVideo } from "./record-video";

/** Viewport heights of scroll per chapter of film. */
const VH_PER_CHAPTER = 30;
/**
 * Share of each chapter's scroll spent playing it. The rest holds the
 * chapter's settled frame, so wherever the visitor stops scrolling the stage
 * shows a finished frame rather than a transition between scenes.
 */
const PLAY_SHARE = 0.6;
/**
 * Seconds before the next chapter at which a chapter counts as settled. Each
 * scene fades out over its last 0.3-0.4 s, so the hold point sits before that
 * fade, on the finished frame.
 */
const SETTLE_LEAD = 0.55;
/** Viewport heights of scroll for the stage to land on the paper below. */
const LAND_VH = 30;
const NAV_PX = 58; // the fixed LandingNav
/** Seconds of closing fade left unplayed. */
const END_TRIM = 0.5;

/**
 * The stage starts on the dark plate and lands on the warm ground the next
 * section opens on (paper-soft), so the page continues without a seam. Every
 * colour on the stage reads from these variables, and only they are tweened.
 */
const DARK_BG = "#050708"; // ink-deep
const PAPER_BG = "#FBF9F4"; // paper-soft
const DARK_INK = {
  "--fg1": "#F6F8F5", // t1
  "--fg2": "#C4CEC8", // t2
  "--fg3": "#7E8B84", // t3
  "--frame-line": "rgba(246, 248, 245, 0.16)", // border-md
};
const PAPER_INK = {
  "--fg1": "#111614", // copy
  "--fg2": "#59625D", // copy-muted
  "--fg3": "#59625D",
  "--frame-line": "rgba(17, 22, 20, 0.14)", // border-light
};

/**
 * The record's film, driven by scroll rather than a loop: the stage pins under
 * the nav and the page's scroll position becomes the playhead, with the
 * chapter rail showing where in the flow the visitor is.
 *
 * - The file must be encoded with dense keyframes (every 5 frames here), or
 *   each seek decodes back to a distant keyframe and the scrub stutters.
 * - After the last frame the stage lands: its colours fade to the paper the
 *   next section opens on and the film steps back into a framed figure.
 * - Scroll-linked motion is motion (WCAG 2.3.3), so under reduced motion the
 *   pin is dropped for the ordinary figure plus a static chapter list.
 * - Below the desktop breakpoint the same still path is used: at phone width
 *   the film's type, set for 1920px, cannot be read, so pinning it would only
 *   spend the visitor's scroll on a thumbnail.
 */
export function ScrollVideo({
  video,
  chapters,
}: {
  video: IntegrationVideo;
  chapters: readonly VideoChapter[];
}) {
  const track = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLAnchorElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 1023px)").matches
      ) {
        setStill(true);
        return;
      }
      const el = film.current;
      if (!el) return;

      let target = 0;
      const n = chapters.length;
      // Where chapter i has finished animating and can be held.
      const settledAt = (i: number, duration: number) =>
        (i < n - 1 ? chapters[i + 1].start : duration - END_TRIM) - SETTLE_LEAD;

      const filmPx = () => (window.innerHeight * chapters.length * VH_PER_CHAPTER) / 100;

      trigger.current = ScrollTrigger.create({
        trigger: track.current,
        start: `top top+=${NAV_PX}`,
        end: () => `+=${filmPx()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Mobile Safari ignores preload until asked; a seek needs data.
          if (el.readyState === 0) el.load();
          const duration = el.duration || 0;
          if (!duration) return;
          // Each chapter owns an equal share of the scroll: play it, then hold.
          const x = Math.min(self.progress * n, n - 1e-6);
          const i = Math.floor(x);
          const from = chapters[i].start;
          const to = Math.max(from, settledAt(i, duration));
          target = from + (to - from) * Math.min(1, (x - i) / PLAY_SHARE);
          setActive(i);
        },
      });

      // The landing, scrubbed over the rest of the track.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track.current,
            start: () => `top+=${filmPx()} top+=${NAV_PX}`,
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        // Ground: an expo curve holds near dark, crosses fast, then holds near
        // paper, so the stage spends almost none of the scroll in mid-grey.
        .fromTo(stage.current, { "--stage-bg": DARK_BG }, { "--stage-bg": PAPER_BG, duration: 1, ease: "expo.inOut" }, 0)
        // Ink: swapped almost instantly at the midpoint of that crossing, so
        // text never sits on the grey between the two grounds.
        .fromTo(stage.current, DARK_INK, { ...PAPER_INK, duration: 0.04 }, 0.48)
        // The film is over once the landing starts; the skip link has no job.
        .to(skip.current, { autoAlpha: 0, duration: 0.15 }, 0)
        // Step back into a framed figure, keeping the grid's left edge.
        .fromTo(frame.current, { scale: 1 }, { scale: 0.88, transformOrigin: "left center", duration: 1 }, 0);

      // Seek on the shared ticker, and never while a seek is in flight:
      // queueing seeks behind each other is what makes a scrub lag.
      const tick = () => {
        if (!el.seeking && Math.abs(el.currentTime - target) > 1 / 60) {
          el.currentTime = target;
        }
      };
      gsap.ticker.add(tick);
      // A seek made before any data arrived can leave the first frame on
      // screen; seek again once there is a frame to show.
      const repaint = () => {
        el.currentTime = target;
      };
      el.addEventListener("loadeddata", repaint);
      return () => {
        gsap.ticker.remove(tick);
        el.removeEventListener("loadeddata", repaint);
      };
    },
    { scope: track, dependencies: [chapters] },
  );

  /** Jump the scroll position to where a chapter starts. */
  function goTo(index: number) {
    const st = trigger.current;
    if (!st) return;
    const at = st.start + ((st.end - st.start) * index) / chapters.length;
    window.scrollTo({ top: at + 1, behavior: "smooth" });
  }

  if (still) {
    // Same ground the scrolled stage lands on, so the boundary below follows
    // without a seam in this path too.
    return (
      <section className="bg-paper-soft pt-16 pb-20 text-copy md:pt-20 md:pb-24">
        <SectionContainer>
          <figure className="overflow-hidden rounded-[14px] border border-border-light bg-ink">
            <RecordVideo
              src={video.src}
              poster={video.poster}
              width={video.width}
              height={video.height}
              label={video.label}
            />
          </figure>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {chapters.map((c) => (
              <li key={c.title}>
                <p className="text-[14px] font-semibold text-copy">{c.title}</p>
                <p className="mt-1 text-[14px] leading-[1.55] text-copy-muted">{c.body}</p>
              </li>
            ))}
          </ol>
        </SectionContainer>
      </section>
    );
  }

  return (
    <section
      ref={track}
      aria-label="The integration, end to end"
      className="relative bg-ink-deep"
      style={{ height: `${chapters.length * VH_PER_CHAPTER + LAND_VH + 100}vh` }}
    >
      <div
        ref={stage}
        style={{ "--stage-bg": DARK_BG, ...DARK_INK } as CSSProperties}
        className="sticky top-[58px] flex h-[calc(100svh-58px)] items-center overflow-hidden bg-(--stage-bg)"
      >
        {/* Wider than the page's reading width: the film carries type set for
            1920px, so it gets the room, and the rail a fixed narrow column. */}
        <SectionContainer className="max-w-[1720px]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10 2xl:grid-cols-[minmax(0,1fr)_300px] 2xl:gap-14">
            <div
              ref={frame}
              // As wide as the column allows, but never taller than the pinned
              // stage (less 4rem of air), so short screens do not crop it.
              style={{ maxWidth: "calc((100svh - 58px - 4rem) * 16 / 9)" }}
              className="w-full overflow-hidden rounded-[14px] border border-(--frame-line) bg-ink lg:justify-self-end"
            >
              <video
                ref={film}
                src={video.src}
                poster={video.poster}
                width={video.width}
                height={video.height}
                muted
                playsInline
                preload="auto"
                aria-label={video.label}
                className="block h-auto w-full"
              />
            </div>

            {/* Rail on desktop; on mobile only the active chapter shows. */}
            <ol>
              {chapters.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.title} className={on ? "" : "hidden lg:block"}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on ? "step" : undefined}
                      className="w-full py-2.5 text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
                    >
                      <span
                        className={`block text-[15px] font-semibold transition-colors ${
                          on ? "text-(--fg1)" : "text-(--fg3) hover:text-(--fg2)"
                        }`}
                      >
                        {c.title}
                      </span>
                      {/* Only the active chapter carries its body. It fades in;
                          animating height would reflow the rail on every step. */}
                      {on ? (
                        <span className="mt-1 block text-[14px] leading-[1.55] text-(--fg2) animate-in fade-in duration-300 motion-reduce:animate-none">
                          {c.body}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Visible to everyone, not only keyboard users: the track is long,
                and a visitor who has seen enough should not have to scroll it. */}
            <a
              ref={skip}
              href="#after-film"
              className="inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-(--fg3) underline-offset-4 transition-colors hover:text-(--fg1) hover:underline focus-visible:text-(--fg1) focus-visible:underline lg:col-start-2"
            >
              Skip the film
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}

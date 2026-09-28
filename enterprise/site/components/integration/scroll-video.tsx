"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { IntegrationVideo, VideoChapter } from "@/data/integrations";
import { SectionContainer } from "@/components/landing/section-container";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RecordVideo } from "./record-video";

/** Viewport heights of scroll per chapter of film. */
const VH_PER_CHAPTER = 80;
/** Viewport heights of scroll for the stage to land on the paper below. */
const LAND_VH = 70;
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
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStill(true);
        return;
      }
      const el = film.current;
      if (!el) return;

      let target = 0;
      const chapterAt = (t: number) =>
        Math.max(0, chapters.findLastIndex((c) => c.start <= t));

      const filmPx = () => (window.innerHeight * chapters.length * VH_PER_CHAPTER) / 100;

      trigger.current = ScrollTrigger.create({
        trigger: track.current,
        start: `top top+=${NAV_PX}`,
        end: () => `+=${filmPx()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Mobile Safari ignores preload until asked; a seek needs data.
          if (el.readyState === 0) el.load();
          // Stop short of the film's closing fade (made for the loop), so
          // the stage lands on the end card rather than a blank frame.
          target = self.progress * Math.max(0, (el.duration || 0) - END_TRIM);
          setActive(chapterAt(target));
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
        // Ground: eased, so it spends little of the scroll in mid-grey.
        .fromTo(stage.current, { "--stage-bg": DARK_BG }, { "--stage-bg": PAPER_BG, duration: 1, ease: "power2.inOut" }, 0)
        // Ink: swapped in a short window at the crossover, never blended
        // through the grey the ground is passing through.
        .fromTo(stage.current, DARK_INK, { ...PAPER_INK, duration: 0.12 }, 0.44)
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
  function goTo(chapter: VideoChapter) {
    const st = trigger.current;
    const duration = film.current?.duration;
    if (!st || !duration) return;
    const at = st.start + (st.end - st.start) * (chapter.start / duration);
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
      {/* Keyboard users should not have to page through the whole track. */}
      <a
        href="#after-film"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-t1"
      >
        Skip past the film
      </a>

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
                      onClick={() => goTo(c)}
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
                      <span
                        className={`block overflow-hidden text-[14px] leading-[1.55] text-(--fg2) transition-[max-height,opacity] duration-300 ${
                          on ? "mt-1 max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {c.body}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}

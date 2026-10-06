"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plug } from "lucide-react";

/**
 * Industry examples for the integrations hero, one slide per vertical. The
 * industry is the headline; the integration is the example that serves it.
 *
 * Infinite: the slides are rendered three times and the track rests in the
 * middle copy. When scrolling settles in an outer copy, the track jumps
 * (without animation) to the same slide in the middle copy, so there is
 * always more to either side. Only the middle copy is exposed to assistive
 * tech and keyboard focus; the outer copies are visual padding.
 *
 * Scroll-snap does the moving, so touch and trackpad work natively. No
 * autoplay: DESIGN_STANDARD rules out auto-scrolling marquees.
 */
export type SlideLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** A square glyph is set beside the name; a wordmark replaces it. */
  kind: "mark" | "wordmark";
};

export type IndustrySlide = {
  industry: string;
  /** Used in the link label for external slides. */
  name: string;
  line: string;
  href: string;
  /** One or more integrations shown together. Empty draws a placeholder. */
  logos: readonly SlideLogo[];
  /** Placeholder tile text, when `logos` is empty. */
  placeholder?: string;
  /** Overrides the default link label. */
  linkLabel?: string;
};

const COPIES = 3;

function SlideCard({ slide, hidden }: { slide: IndustrySlide; hidden: boolean }) {
  const external = slide.href.startsWith("http");
  const body = (
    <>
      <span className="font-heading text-[26px] leading-[1.1] font-semibold tracking-[-0.015em] text-t1">
        {slide.industry}
      </span>
      {slide.logos.length ? (
        <span className="mt-4 flex h-12 w-fit items-center gap-2.5 rounded-[8px] bg-white px-3">
          {slide.logos.map((logo, i) => (
            <span key={logo.name} className="flex items-center gap-2">
              {i > 0 ? (
                <span className="text-[14px] text-slate-400" aria-hidden="true">
                  +
                </span>
              ) : null}
              {/* Explicit heights: some wordmarks ship a viewBox but no size,
                  and collapse to nothing under h-auto/w-auto here. */}
              <Image
                src={logo.src}
                alt={logo.kind === "mark" ? "" : logo.name}
                width={logo.width}
                height={logo.height}
                className={
                  logo.kind === "mark"
                    ? "h-8 w-auto"
                    : "h-7 w-auto max-w-[140px] object-contain"
                }
              />
              {logo.kind === "mark" ? (
                <span className="text-[14px] font-semibold text-copy">{logo.name}</span>
              ) : null}
            </span>
          ))}
        </span>
      ) : (
        // No integration to show yet: a dashed slot rather than a stand-in logo.
        <span className="mt-4 flex h-12 w-fit items-center gap-2 rounded-[8px] border border-dashed border-white/35 px-3 text-[13px] font-medium text-t2">
          <Plug className="h-4 w-4 text-t3" aria-hidden="true" />
          {slide.placeholder}
        </span>
      )}
      <span className="mt-4 block text-[14px] leading-[1.5] text-pretty text-t2">
        {slide.line}
      </span>
      <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-brand">
        {slide.linkLabel ?? (external ? `Visit ${slide.name}` : "Open the integration")}
        {external ? (
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </span>
    </>
  );
  const className =
    "flex h-full flex-col rounded-[12px] border border-border-md bg-white/[0.03] p-4 transition-colors hover:border-t3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
  const focus = hidden ? { tabIndex: -1 } : {};
  return external ? (
    <a href={slide.href} target="_blank" rel="noreferrer" className={className} {...focus}>
      {body}
    </a>
  ) : (
    <Link href={slide.href} className={className} {...focus}>
      {body}
    </Link>
  );
}

export function IndustryCarousel({ slides }: { slides: readonly IndustrySlide[] }) {
  const count = slides.length;
  const track = useRef<HTMLUListElement>(null);
  // Position in the tripled track. Starts on the first slide of the middle copy.
  const position = useRef(count);
  const settle = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);

  // Slides share one width, so the first slide's width plus the gap is a step.
  const step = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
  }, []);

  const jumpTo = useCallback(
    (index: number) => {
      const el = track.current;
      if (!el) return;
      position.current = index;
      el.scrollTo({ left: index * step(), behavior: "auto" });
    },
    [step],
  );

  // Rest in the middle copy on mount and whenever the slide width changes.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const recentre = () => jumpTo(count + (((position.current % count) + count) % count));
    recentre();
    const observer = new ResizeObserver(recentre);
    observer.observe(el);
    return () => observer.disconnect();
  }, [count, jumpTo]);

  function goBy(delta: number) {
    const el = track.current;
    if (!el) return;
    position.current += delta;
    setActive(((position.current % count) + count) % count);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: position.current * step(), behavior: reduce ? "auto" : "smooth" });
  }

  function goTo(index: number) {
    goBy(index - active);
  }

  function onScroll() {
    const el = track.current;
    const width = step();
    if (!el || !width) return;
    const index = Math.round(el.scrollLeft / width);
    setActive(((index % count) + count) % count);
    // Once scrolling settles, move back into the middle copy if we left it.
    // A timer rather than `scrollend`, which Safari does not fire.
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const settled = Math.round(el.scrollLeft / width);
      position.current = settled;
      if (settled < count || settled >= count * 2) {
        jumpTo(count + (((settled % count) + count) % count));
      }
    }, 140);
  }

  useEffect(() => () => window.clearTimeout(settle.current), []);

  return (
    <div className="flex flex-1 flex-col">
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label="Industries"
        className="-mx-1 flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }, (_, copy) =>
          slides.map((slide, i) => {
            const hidden = copy !== 1;
            return (
              <li
                key={`${copy}-${slide.industry}`}
                className="w-[78%] shrink-0 snap-start sm:w-[62%]"
                aria-hidden={hidden || undefined}
                aria-label={hidden ? undefined : `${i + 1} of ${count}: ${slide.industry}`}
              >
                <SlideCard slide={slide} hidden={hidden} />
              </li>
            );
          }),
        )}
      </ul>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => goBy(-1)}
          aria-label="Previous industry"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-md text-t2 transition-colors hover:border-t3 hover:text-t1 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goBy(1)}
          aria-label="Next industry"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-md text-t2 transition-colors hover:border-t3 hover:text-t1 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="ml-2 flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.industry}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${slide.industry}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                i === active ? "w-5 bg-brand" : "w-1.5 bg-t3/60 hover:bg-t2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

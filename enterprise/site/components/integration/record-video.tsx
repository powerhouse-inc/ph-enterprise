"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * A short, silent walkthrough that loops in the record's hero.
 *
 * - Plays only when the visitor has not asked for reduced motion; otherwise
 *   the poster stands in and the play control is there if they want it.
 * - Always carries a visible pause control: anything that moves for more than
 *   five seconds needs one (WCAG 2.2.2), and the loop never ends.
 * - The poster is a real frame, so the figure means something at rest and
 *   while the file loads.
 */
export function RecordVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Autoplay can still be refused by the browser; the control stays honest.
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-md bg-ink/75 text-t1 transition-colors hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

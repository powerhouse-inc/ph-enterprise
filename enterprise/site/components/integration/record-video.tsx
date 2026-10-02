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
 * - `timeline` swaps the lone pause button for a control bar: play/pause, the
 *   elapsed and total time, and a scrubber (a native range input, so it works
 *   by drag, click and arrow keys).
 */
export function RecordVideo({
  src,
  poster,
  width,
  height,
  label,
  timeline = false,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  timeline?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Metadata can load before hydration attaches onLoadedMetadata.
    if (video.readyState >= 1) setDuration(video.duration);
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

  function seek(value: number) {
    const video = ref.current;
    if (!video) return;
    video.currentTime = value;
    setTime(value);
  }

  const playIcon = playing ? (
    <Pause className="h-4 w-4" aria-hidden="true" />
  ) : (
    <Play className="h-4 w-4" aria-hidden="true" />
  );

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
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      {timeline ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/90 to-transparent px-3 pt-8 pb-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-md bg-ink/75 text-t1 transition-colors hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            {playIcon}
          </button>
          <span className="w-9 shrink-0 font-mono text-[12px] text-t2 tabular-nums">
            {formatTime(time)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.05}
            value={Math.min(time, duration || 0)}
            onChange={(e) => seek(Number(e.currentTarget.value))}
            aria-label="Video position"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            className="h-1.5 min-w-0 flex-1 cursor-pointer accent-brand"
          />
          <span className="w-9 shrink-0 text-right font-mono text-[12px] text-t3 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      ) : (
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-md bg-ink/75 text-t1 transition-colors hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
      >
        {playIcon}
      </button>
      )}
    </div>
  );
}

/** Seconds as m:ss. */
function formatTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

"use client";

import * as React from "react";
import { useInView, useLoop } from "@/components/iso/react/live";

/*
 * The clock behind a figure's legend. A tour walks the items; it pauses
 * while the pointer is over the figure and resumes shortly after it leaves.
 * Choosing an item (click, tap, focus) jumps to it. Each frame calls
 * `write(item, t, calm, dt)`, and the active item's progress is written to
 * the list as --fig-progress. Reduced motion: no tour, one still frame.
 */

const HAND_BACK = 6;
const START_AFTER = 1.2;

export function useTour({
  durations,
  write,
  anchor,
  list,
}: {
  /** Seconds each item runs before the tour moves on. */
  durations: readonly number[];
  write: (item: number, t: number, calm: boolean, dt: number) => void;
  anchor: React.RefObject<HTMLElement | null>;
  list: React.RefObject<HTMLOListElement | null>;
}) {
  const inView = useInView(anchor);
  const [active, setActive] = React.useState(0);
  const clock = React.useRef({ item: 0, t: 0, idle: HAND_BACK - START_AFTER, over: false, progress: -1 });

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const c = clock.current;
      c.idle += dt;
      if (c.over) c.idle = Math.min(c.idle, HAND_BACK - 1); // paused while someone is looking
      if (!calm) c.t += dt;
      const span = durations[c.item]! + 0.8;
      if (!calm && c.idle > HAND_BACK && c.t > span) {
        c.item = (c.item + 1) % durations.length;
        c.t = 0;
        setActive(c.item);
      }
      write(c.item, c.t, calm, dt);
      const progress = calm ? 1 : Math.round(Math.min(c.t / span, 1) * 200) / 200;
      if (progress !== c.progress) {
        c.progress = progress;
        list.current?.style.setProperty("--fig-progress", String(progress));
      }
      return !calm;
    },
    [durations, write, list],
  );

  const kick = useLoop(tick, inView);

  const choose = React.useCallback(
    (item: number) => {
      const c = clock.current;
      if (c.item !== item) {
        c.item = item;
        c.t = 0;
        setActive(item);
      }
      c.idle = 0;
      kick();
      write(item, c.t, false, 1 / 60);
    },
    [kick, write],
  );

  const handlers = {
    onPointerEnter: () => {
      clock.current.over = true;
    },
    onPointerLeave: () => {
      clock.current.over = false;
      clock.current.idle = HAND_BACK - 2; // resume the tour two seconds later
    },
  };

  return { active, choose, handlers };
}

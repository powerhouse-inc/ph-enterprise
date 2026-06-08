"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TIMING } from "@/lib/constants";

export function useHeroAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  refs: {
    sub: RefObject<HTMLParagraphElement | null>;
    actions: RefObject<HTMLDivElement | null>;
    mark: RefObject<HTMLDivElement | null>;
  },
) {
  useGSAP(
    () => {
      const sub = refs.sub.current;
      const actions = refs.actions.current;
      const mark = refs.mark.current;
      if (!sub || !actions || !mark) return;

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl.to(
        ".hero-headline .word",
        {
          opacity: 1,
          y: 0,
          ...TIMING.HERO_WORD,
        },
        0.2,
      );
      heroTl.to(sub, { opacity: 1, y: 0, duration: 0.6 }, 0.7);
      heroTl.to(actions, { opacity: 1, y: 0, duration: 0.5 }, 0.9);
      heroTl.to(mark, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.35);
    },
    { scope: sectionRef },
  );
}

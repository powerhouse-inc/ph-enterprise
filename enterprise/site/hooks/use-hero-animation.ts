"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TIMING } from "@/lib/constants";

export function useHeroAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  refs: {
    label: RefObject<HTMLDivElement | null>;
    sub: RefObject<HTMLParagraphElement | null>;
    actions: RefObject<HTMLDivElement | null>;
    mark: RefObject<HTMLDivElement | null>;
  },
) {
  useGSAP(
    () => {
      const label = refs.label.current;
      const sub = refs.sub.current;
      const actions = refs.actions.current;
      const mark = refs.mark.current;
      if (!label || !sub || !actions || !mark) return;

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl.to(label, { opacity: 1, y: 0, duration: 0.7 }, 0.2);
      heroTl.to(
        ".hero-headline .word",
        {
          opacity: 1,
          y: 0,
          ...TIMING.HERO_WORD,
        },
        0.4,
      );
      heroTl.to(sub, { opacity: 1, y: 0, duration: 0.6 }, 0.9);
      heroTl.to(actions, { opacity: 1, y: 0, duration: 0.5 }, 1.1);
      heroTl.to(mark, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.55);
    },
    { scope: sectionRef },
  );
}

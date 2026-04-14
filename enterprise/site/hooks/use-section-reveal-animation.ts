"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TIMING, SCROLL_START } from "@/lib/constants";

export function useSectionRevealAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  headingRef: RefObject<HTMLHeadingElement | null>,
  ledeRef: RefObject<HTMLParagraphElement | null>,
) {
  useGSAP(
    (_, contextSafe) => {
      const cs = contextSafe!;
      const root = sectionRef.current;
      const h2 = headingRef.current;
      const lede = ledeRef.current;
      if (!root || !h2 || !lede) return;

      ScrollTrigger.create({
        trigger: h2,
        start: SCROLL_START.HEADING,
        onEnter: cs(() => {
          gsap.to(h2, {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            ...TIMING.HEADING_REVEAL,
          });
        }),
      });

      ScrollTrigger.create({
        trigger: h2,
        start: SCROLL_START.LEDE,
        onEnter: cs(() => {
          gsap.to(lede, {
            opacity: 1,
            y: 0,
            ...TIMING.LEDE_FADE,
          });
        }),
      });

      const list = root.querySelector(".svc-list");
      const items = gsap.utils.toArray<HTMLElement>(".svc-item", root);
      if (list && items.length) {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          ...TIMING.LIST_STAGGER,
          scrollTrigger: {
            trigger: list,
            start: SCROLL_START.LIST,
          },
        });
      }
    },
    { scope: sectionRef },
  );
}

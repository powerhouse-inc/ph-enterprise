"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useFadeUpInScope(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    gsap.utils.toArray<HTMLElement>(".fade-up", root).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, { scope });
}

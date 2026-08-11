"use client";

import { useRef } from "react";
import { SVG3D } from "3dsvg";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * How far each layer travels with the cursor, in pixels. Different travel
 * per layer is what reads as depth. The mark itself no longer tilts via
 * GSAP — the SVG3D canvas orbits toward the cursor on its own, so GSAP
 * only translates it.
 */
const MARK_TRAVEL = 26;
const HALO_TRAVEL = 15;
const HALO_OUTER_TRAVEL = 8;

/** Powerhouse mark, extruded by the 3dsvg engine at runtime. */
const MARK_SVG = `<svg width="47.25" height="47.25" overflow="visible" style="display: block;" viewBox="0 0 47.25 47.25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M29.5486 0L10.0889 16.1136C7.23454 18.4772 7.02695 22.7819 9.64066 25.4092L16.3729 32.1763C18.3481 34.1618 18.7755 37.2129 17.4218 39.6646L13.2337 47.25H6.3C2.82061 47.25 0 44.4294 0 40.95V6.3C0 2.82061 2.82061 0 6.3 0H29.5486ZM33.2039 0L29.5691 6.62154C28.2289 9.06288 28.6507 12.0945 30.6065 14.0772L37.7482 21.3177C40.3562 23.9617 40.1229 28.2765 37.2449 30.6239L16.86 47.25H40.95C44.4294 47.25 47.25 44.4294 47.25 40.95V6.3C47.25 2.82061 44.4294 0 40.95 0H33.2039Z" fill="var(--fill-0, #32373B)"/>
</svg>
`;

export function HeroMark() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const haloOuterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (!scene) return;

      // Pointer parallax is decoration: skip it when motion is unwelcome, and
      // on touch devices where there is no hovering cursor to follow.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      if (reducedMotion || !finePointer) return;

      const layers = [
        { el: markRef.current, travel: MARK_TRAVEL },
        { el: haloRef.current, travel: HALO_TRAVEL },
        { el: haloOuterRef.current, travel: HALO_OUTER_TRAVEL },
      ].filter((layer) => layer.el !== null);

      const followers = layers.map((layer) => ({
        travel: layer.travel,
        x: gsap.quickTo(layer.el, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(layer.el, "y", { duration: 1.1, ease: "power3.out" }),
      }));

      const onPointerMove = (event: PointerEvent) => {
        const rect = scene.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalised against half the viewport rather than the scene box, so the
        // mark keeps responding to the cursor anywhere on screen.
        const offsetX = gsap.utils.clamp(
          -1,
          1,
          (event.clientX - centerX) / (window.innerWidth / 2),
        );
        const offsetY = gsap.utils.clamp(
          -1,
          1,
          (event.clientY - centerY) / (window.innerHeight / 2),
        );

        followers.forEach((follower) => {
          follower.x(offsetX * follower.travel);
          follower.y(offsetY * follower.travel);
        });
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => window.removeEventListener("pointermove", onPointerMove);
    },
    { scope: sceneRef },
  );

  return (
    <div
      ref={sceneRef}
      className="relative flex h-[300px] items-center justify-center lg:h-[380px]"
      style={{ perspective: "900px" }}
      aria-hidden="true"
    >
      {/*
        Halo boxes are square and explicitly sized rather than inset from the
        scene. A circle gradient sizes its radius off the farthest corner, so in
        a wide-but-short box it is still opaque when it meets the top and bottom
        edges, which shows up as a hard rim. Square keeps the 65% fade inside the
        box on every axis, at any viewport width.
      */}
      <div ref={haloOuterRef} className="absolute inset-0 opacity-60">
        <div className="hero-halo-outer absolute top-1/2 left-1/2 -mt-[280px] -ml-[280px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,var(--color-brand-low)_0%,transparent_65%)] lg:-mt-[360px] lg:-ml-[360px] lg:h-[720px] lg:w-[720px]" />
      </div>

      <div ref={haloRef} className="absolute inset-0 opacity-60">
        <div className="hero-halo absolute top-1/2 left-1/2 -mt-[210px] -ml-[210px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--color-brand-mid)_0%,transparent_65%)] lg:-mt-[260px] lg:-ml-[260px] lg:h-[520px] lg:w-[520px]" />
      </div>

      <div
        ref={markRef}
        className="relative z-10 aspect-square w-[280px] lg:w-[340px]"
      >
        <SVG3D
          svg={MARK_SVG}
          smoothness={0.6}
          color="#ffffff"
          animate="float"
          shadow={false}
          draggable={false}
          intro="none"
        />
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * How far each layer travels with the cursor, in pixels, and how much the
 * mark tilts. Different travel per layer is what reads as depth.
 */
const MARK_TRAVEL = 26;
const MARK_TILT = 7;
const HALO_TRAVEL = 15;
const HALO_OUTER_TRAVEL = 8;

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
        { el: markRef.current, travel: MARK_TRAVEL, tilt: MARK_TILT },
        { el: haloRef.current, travel: HALO_TRAVEL, tilt: 0 },
        { el: haloOuterRef.current, travel: HALO_OUTER_TRAVEL, tilt: 0 },
      ].filter((layer) => layer.el !== null);

      const followers = layers.map((layer) => ({
        travel: layer.travel,
        tilt: layer.tilt,
        x: gsap.quickTo(layer.el, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(layer.el, "y", { duration: 1.1, ease: "power3.out" }),
        rotationX: gsap.quickTo(layer.el, "rotationX", {
          duration: 1.4,
          ease: "power3.out",
        }),
        rotationY: gsap.quickTo(layer.el, "rotationY", {
          duration: 1.4,
          ease: "power3.out",
        }),
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

          if (follower.tilt) {
            follower.rotationY(offsetX * follower.tilt);
            follower.rotationX(-offsetY * follower.tilt);
          }
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
      <div ref={haloOuterRef} className="absolute -inset-32">
        <div className="hero-halo-outer h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-brand-low)_0%,transparent_65%)]" />
      </div>

      <div ref={haloRef} className="absolute -inset-16">
        <div className="hero-halo h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-brand-mid)_0%,transparent_65%)]" />
      </div>

      <div
        ref={markRef}
        className="relative z-10 aspect-square w-[200px] lg:w-[240px]"
      >
        <PowerhouseMark className="hero-mark h-full w-full text-t1" />
      </div>
    </div>
  );
}

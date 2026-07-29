"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/demo/demo-button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { cn } from "@/lib/utils";
import { useHeroAnimation } from "@/hooks/use-hero-animation";
import styles from "./landing-hero.module.css";
import { SectionContainer } from "./section-container";

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useHeroAnimation(sectionRef, {
    sub: subRef,
    actions: actionsRef,
    mark: markRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex flex-col justify-end pt-20 pb-24 overflow-hidden"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.blob4} />
        <div className={styles.blob5} />
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <SectionContainer
        className={cn(
          "relative z-10 grid grid-cols-[1fr_380px] items-end gap-12",
          "max-lg:grid-cols-1",
        )}
      >
        <div>
<h1 className="hero-headline text-[clamp(44px,6vw,80px)] font-[680] leading-[1.04] tracking-normal text-t1 mb-7 max-md:tracking-normal font-heading">
            <span className="word inline-block opacity-0 translate-y-[42px] text-t2">
              The
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px]">
              open-source
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px]">
              backend
            </span>
            <br />
            <span className="word inline-block opacity-0 translate-y-[42px] text-t2">
              for
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px] gradient-text">
              AI-native
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px] gradient-text">
              operations.
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-[17px] font-normal leading-[1.68] text-t2 max-w-[520px] mb-10 opacity-0 translate-y-4"
          >
            Built so your business data never leaves your infrastructure.
          </p>

          <div
            ref={actionsRef}
            className="flex items-center gap-3 opacity-0 translate-y-4 max-md:flex-col max-md:items-start"
          >
            <DemoButton
              variant="cta"
              className="h-10 px-5 rounded-md text-[13px] font-medium"
            >
              Request a Demo
            </DemoButton>
            <Button
              variant="outline"
              className="h-10 px-5 rounded-md text-[13px] font-medium"
              asChild
            >
              <Link href="#solution" prefetch={false}>
                See How It Works
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="flex items-center justify-center relative h-[280px] max-lg:hidden"
          aria-hidden="true"
        >
          <div className={cn(styles.heroMarkHaloOuter, "absolute -inset-40 bg-[radial-gradient(circle,var(--color-brand-low)_0%,transparent_65%)] rounded-full")} />
          <div className={cn(styles.heroMarkHalo, "absolute -inset-20 bg-[radial-gradient(circle,var(--color-brand-halo)_0%,transparent_65%)] rounded-full")} />
          <div
            ref={markRef}
            className={cn(styles.heroMark, "relative z-10 w-[140px] h-[140px] opacity-0")}
          >
            <PowerhouseMark className="w-full h-full text-white drop-shadow-[0_0_20px_rgba(0,212,255,0.75)] drop-shadow-[0_0_60px_rgba(122,58,255,0.38)] drop-shadow-[0_0_130px_rgba(0,212,255,0.15)]" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

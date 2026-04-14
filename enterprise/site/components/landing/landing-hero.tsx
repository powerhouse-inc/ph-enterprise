"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { cn } from "@/lib/utils";
import { useHeroAnimation } from "@/hooks/use-hero-animation";
import styles from "./landing-hero.module.css";
import { SectionContainer } from "./section-container";

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useHeroAnimation(sectionRef, {
    label: labelRef,
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
          <div
            ref={labelRef}
            className="flex items-center gap-2 mb-8 text-[11px] font-semibold tracking-[0.1em] uppercase text-t3 opacity-0 translate-y-3"
          >
            <span
              className="w-[5px] h-[5px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand-glow)]"
              aria-hidden="true"
            />
            Powerhouse Enterprise
          </div>

          <h1 className="hero-headline text-[clamp(48px,6.5vw,88px)] font-[680] leading-none tracking-[-0.04em] text-t1 mb-7 max-md:tracking-[-0.03em] font-heading">
            <span className="word inline-block opacity-0 translate-y-[42px]">
              AI-Native
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px]">
              Operations.
            </span>
            <br />
            <span className="word inline-block opacity-0 translate-y-[42px] text-t2">
              Private
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px] text-t2">
              by
            </span>{" "}
            <span className="word inline-block opacity-0 translate-y-[42px] gradient-text">
              Architecture.
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-[17px] font-normal leading-[1.68] text-t2 max-w-[480px] mb-10 opacity-0 translate-y-4"
          >
            Your competitors are adopting AI. The question isn&apos;t if you should &mdash; it&apos;s
            how you do it without compromising what makes your business yours.
            Powerhouse is infrastructure for AI-native operations that keeps your
            confidential data on your terms: your models, your servers, never exposed.
          </p>

          <div
            ref={actionsRef}
            className="flex items-center gap-3 opacity-0 translate-y-4 max-md:flex-col max-md:items-start"
          >
            <Button
              variant="cta"
              className="h-10 px-5 rounded-md text-[13px] font-medium"
              asChild
            >
              <Link href="#get-started" prefetch={false}>
                Request a Demo
              </Link>
            </Button>
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

          <a
            href="https://bai.powerhouse.io"
            className="inline-block mt-5 text-[13px] text-t3 hover:text-t2 transition-colors"
          >
            Or start with an AI readiness assessment &rarr;
          </a>
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

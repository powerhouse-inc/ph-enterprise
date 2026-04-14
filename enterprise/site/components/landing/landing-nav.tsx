"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { NAV_LINKS } from "@/data/nav";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionContainer } from "./section-container";

export function LandingNav() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const cs = contextSafe!;
      const nav = headerRef.current;
      if (!nav) return;

      ScrollTrigger.create({
        start: "top -20",
        onEnter: cs(() => nav.classList.add("scrolled")),
        onLeaveBack: cs(() => nav.classList.remove("scrolled")),
      });
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-200 h-[58px] flex items-center border-b border-transparent transition-all duration-400 [&.scrolled]:bg-[rgba(11,13,15,0.85)] [&.scrolled]:backdrop-blur-[24px] [&.scrolled]:border-border"
    >
      <SectionContainer className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5" aria-label="Powerhouse Enterprise">
          <PowerhouseMark className="w-5 h-5 text-[rgba(243,245,247,0.65)]" />
          <span className="text-[15px] font-semibold tracking-tight text-t1 font-heading">Powerhouse</span>
          <div className="w-px h-3.5 bg-border-md" aria-hidden="true" />
          <span className="text-[11px] font-medium text-t3 tracking-wide">Enterprise</span>
        </a>
        <div className="flex items-center gap-7">
          <ul className="flex gap-6 list-none max-md:hidden" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[13px] font-[450] text-t2 hover:text-t1 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="cta" className="h-8 px-4 rounded-md text-[13px]" asChild>
            <Link href="#get-started" prefetch={false}>
              Request a Demo
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}

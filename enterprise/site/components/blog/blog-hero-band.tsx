import Image from "next/image";
import type { ReactNode } from "react";
import { SectionContainer } from "@/components/landing/section-container";

/**
 * The dark band the blog pages open on: same gradient plate and top hairline
 * as LandingHero, cut down to a header height. Paper sections follow it, so
 * the page reads in the landing page's order of dark plate then warm ground.
 */
export function BlogHeroBand({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink-deep pt-32 pb-16 md:pt-36 md:pb-20">
      <Image
        src="/hero-gradient-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(246,248,245,0.08) 18%, rgba(246,248,245,0.2) 50%, rgba(246,248,245,0.08) 82%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <SectionContainer>{children}</SectionContainer>
      </div>
    </section>
  );
}

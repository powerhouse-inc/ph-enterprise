import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centred section heading: pill eyebrow, tight headline, muted lead beneath.
 *
 * The landing page alternates ink and paper sections, so `tone` picks the text
 * and pill colours rather than each caller restating them.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <div className={cn("mx-auto max-w-[820px] text-center", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "mb-5 inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold",
            onDark
              ? "bg-brand-low text-brand"
              : "border border-border-light bg-white text-copy-muted",
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "font-heading text-[clamp(32px,3.6vw,48px)] font-[680] leading-[1.08] tracking-[-0.02em]",
          onDark ? "text-t1" : "text-copy",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-[672px] text-[18px] leading-[1.6]",
            onDark ? "text-t2" : "text-copy-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

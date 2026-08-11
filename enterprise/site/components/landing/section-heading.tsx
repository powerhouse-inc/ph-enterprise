import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centred section heading: quiet plain-text eyebrow, tight headline, muted
 * lead beneath. The eyebrow is deliberately unchromed (no pill, no dot) —
 * keep it that way; bordered chips above headlines read as template output.
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
        <p
          className={cn(
            "mb-4 text-[13px] font-medium",
            onDark ? "text-t3" : "text-copy-muted",
          )}
        >
          {eyebrow}
        </p>
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

"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";

/**
 * Thin client wrapper so the article body can stay server-rendered while its
 * `.fade-up` blocks get the same scroll reveal the landing sections use.
 */
export function BlogReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFadeUpInScope(ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

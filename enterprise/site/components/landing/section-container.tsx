import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-13",
        className,
      )}
    >
      {children}
    </div>
  );
}

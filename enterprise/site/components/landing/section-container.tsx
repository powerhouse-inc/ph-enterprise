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
        "w-full max-w-[1100px] mx-auto px-13 max-md:px-5 max-lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { CTA_LABEL, CTA_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The site's primary CTA: one label, one destination, both from lib/site.ts.
 * Opens the booking page in a new tab so the visitor keeps their place.
 */
export function BookCallButton({ className }: { className?: string }) {
  return (
    <Button
      variant="cta"
      className={cn("h-8 rounded-md px-4 text-[13px]", className)}
      asChild
    >
      <a href={CTA_URL} target="_blank" rel="noreferrer">
        {CTA_LABEL}
      </a>
    </Button>
  );
}

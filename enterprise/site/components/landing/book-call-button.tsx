import { Button } from "@/components/ui/button";
import { CTA_LABEL, CTA_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The site's primary CTA: one label, one destination, both from lib/site.ts.
 * Opens the booking page in a new tab so the visitor keeps their place.
 * `event` is the Umami event name and must be distinct per placement so the
 * analytics report shows which slot earned the click.
 */
export function BookCallButton({
  className,
  event,
}: {
  className?: string;
  event: string;
}) {
  return (
    <Button
      variant="cta"
      className={cn("h-8 rounded-md px-4 text-[13px]", className)}
      asChild
    >
      <a href={CTA_URL} target="_blank" rel="noreferrer" data-umami-event={event}>
        {CTA_LABEL}
      </a>
    </Button>
  );
}

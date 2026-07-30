import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data/nav";
import { BAI_ENGAGEMENT_URL } from "@/lib/site";
import { SectionContainer } from "./section-container";

export function LandingNav() {
  return (
    <header className="sticky top-0 left-0 right-0 z-200 h-[64px] border-b border-border bg-[rgba(4,19,34,0.90)] backdrop-blur-[18px]">
      <SectionContainer className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Powerhouse Enterprise"
        >
          <PowerhouseMark className="h-5 w-5 text-brand" />
          <span className="font-heading text-[15px] font-semibold tracking-normal text-t1">
            Powerhouse
          </span>
          <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-normal text-t3">
            Enterprise
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <nav aria-label="Primary navigation" className="max-md:hidden">
            <ul className="flex list-none items-center gap-5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.route ? (
                    <Link
                      href={link.href}
                      className="font-mono text-[12px] font-medium uppercase tracking-normal text-t2 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="font-mono text-[12px] font-medium uppercase tracking-normal text-t2 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="cta" className="h-9 px-4 text-[12px]" asChild>
            <a href={BAI_ENGAGEMENT_URL}>
              Map workflow
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}

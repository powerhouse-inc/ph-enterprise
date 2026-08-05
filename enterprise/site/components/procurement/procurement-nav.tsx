import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PowerhouseMark } from "@/components/powerhouse-mark";
import { PROCUREMENT_SECTION_LINKS } from "@/data/procurement";
import { SectionContainer } from "@/components/landing/section-container";

export function ProcurementNav() {
  return (
    <header className="sticky top-0 z-200 h-[64px] border-b border-white/8 bg-[rgba(11,13,15,0.84)] backdrop-blur-[24px]">
      <SectionContainer className="flex h-full items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Powerhouse Enterprise">
            <PowerhouseMark className="h-5 w-5 text-[rgba(243,245,247,0.7)]" />
            <span className="font-heading text-[15px] font-semibold tracking-normal text-t1">
              Powerhouse
            </span>
            <div className="h-3.5 w-px bg-border-md" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-normal text-t3">
              Enterprise
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav
            aria-label="Section navigation"
            className="max-[1600px]:hidden"
          >
            <ul className="flex items-center gap-4 text-[12px] text-t3">
              {PROCUREMENT_SECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-t1">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button variant="outline" className="h-8 rounded-md px-4 text-[13px] max-md:hidden" asChild>
            <Link href="/architecture">Architecture</Link>
          </Button>
          <Button variant="cta" className="h-8 rounded-md px-4 text-[13px]" asChild>
            <a href="https://bai.powerhouse.io/#contact">Map workflow</a>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}

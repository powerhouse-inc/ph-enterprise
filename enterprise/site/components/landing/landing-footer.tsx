import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "./section-container";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-[rgba(4,13,24,0.35)] py-9 pb-11">
      <SectionContainer>
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:items-start">
          <div className="flex items-center gap-2.5">
            <PowerhouseMark className="h-4 w-4 text-brand" />
            <span className="font-heading text-sm font-semibold text-t2">Powerhouse</span>
            <span className="font-mono text-[11px] uppercase tracking-normal text-t3">
              Enterprise
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-normal text-t3">
            &copy; 2026 Powerhouse
          </span>
        </div>
      </SectionContainer>
    </footer>
  );
}

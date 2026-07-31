import { PowerhouseMark } from "@/components/powerhouse-mark";
import { SectionContainer } from "./section-container";

export function LandingFooter() {
  return (
    <footer className="py-9 pb-11 border-t border-border">
      <SectionContainer>
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:items-start">
          <div className="flex items-center gap-2.5">
            <PowerhouseMark className="w-4 h-4 text-[rgba(243,245,247,0.2)]" />
            <span className="text-sm font-semibold text-t2 font-heading">Powerhouse</span>
            <span className="text-[11px] text-t3">Enterprise</span>
          </div>
          <span className="text-[11px] text-t3">&copy; 2026 Powerhouse</span>
        </div>
      </SectionContainer>
    </footer>
  );
}

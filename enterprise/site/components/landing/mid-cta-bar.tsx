"use client";

import { useRef } from "react";
import { DemoButton } from "@/components/demo/demo-button";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { SectionContainer } from "./section-container";

export function MidCtaBar() {
  const rootRef = useRef<HTMLDivElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <div ref={rootRef} className="border-t border-b border-border py-7 bg-surface">
      <SectionContainer>
        <div className="flex items-center justify-between gap-6 flex-wrap fade-up max-md:flex-col max-md:items-start">
          <p className="text-base font-medium text-t1 tracking-normal">
            Ready to see AI-native operations on your own infrastructure?
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <DemoButton variant="cta" className="h-8 px-4 rounded-md text-[13px]">
              Request a Demo
            </DemoButton>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useFadeUpInScope } from "@/hooks/use-fade-up-scope";
import { CTA_LABEL, CTA_URL } from "@/lib/site";
import { SectionContainer } from "./section-container";

export function MidCtaBar() {
  const rootRef = useRef<HTMLDivElement>(null);
  useFadeUpInScope(rootRef);

  return (
    <div ref={rootRef} className="border-t border-b border-border py-7 bg-surface">
      <SectionContainer>
        <div className="flex items-center justify-between gap-6 flex-wrap fade-up max-md:flex-col max-md:items-start">
          <p className="text-base font-medium text-t1 tracking-tight">
            Ready to turn your first workflow into software you own?
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="cta" className="h-8 px-4 rounded-md text-[13px]" asChild>
              <a href={CTA_URL} target="_blank" rel="noreferrer">{CTA_LABEL}</a>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

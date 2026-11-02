import { Button } from "@/components/ui/button";
import { IndustryCarousel } from "@/components/integration/industry-carousel";
import { INDUSTRY_SLIDES } from "@/data/industry-slides";
import { BookCallButton } from "./book-call-button";
import { ClaimRecord } from "./claim-record";
import { SectionContainer } from "./section-container";

/*
 * The first screen: the canonical promise beside the product it describes,
 * one claim as a Powerhouse record with its signed history. The industries
 * the integrations serve follow underneath. Static: nothing here moves.
 */
export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-16 md:pt-32 md:pb-20" aria-label="Introduction">
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            {/* The canonical promise (COPY_STANDARD). */}
            <h1 className="font-heading text-[40px] leading-[1.06] font-medium tracking-[-0.02em] text-balance text-t1 sm:text-[52px] xl:text-[60px] xl:tracking-[-0.03em]">
              Turn workflows into software you own.
            </h1>
            <p className="mt-6 max-w-[36rem] text-[18px] leading-[1.6] text-pretty text-t2">
              Powerhouse connects the systems you already run and turns sensitive, document-heavy workflows into
              applications your team and AI agents share. Agents take on more of the work while people keep the
              decisions, and every change is signed.
            </p>
            <div className="mt-8 flex items-center gap-3 max-sm:flex-col">
              <BookCallButton className="h-11 px-5 text-[14px] max-sm:w-full" event="book-demo-hero" />
              <Button variant="outline" className="h-11 rounded-md px-5 text-[14px] font-medium max-sm:w-full" asChild>
                <a href="https://vetra.io/" target="_blank" rel="noreferrer">
                  Explore the docs
                </a>
              </Button>
            </div>
          </div>

          <ClaimRecord />
        </div>

        {/* The industries the integrations serve. Not on phones, where the
            hero is already long and the integrations section follows. */}
        <div className="mt-20 hidden sm:block">
          <p className="text-[13px] text-t3">Built for the work your industry runs on</p>
          <div className="mt-4">
            <IndustryCarousel slides={INDUSTRY_SLIDES} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

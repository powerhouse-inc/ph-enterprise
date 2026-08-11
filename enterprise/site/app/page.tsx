import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { SiloedDataSection } from "@/components/landing/siloed-data-section";
import { HowPowerhouseWorks } from "@/components/landing/how-powerhouse-works";
import { AppAnatomySection } from "@/components/landing/app-anatomy-section";
import { ControlOwnershipSection } from "@/components/landing/control-ownership-section";
import { WhySection } from "@/components/landing/why-section";
import { StackSection } from "@/components/landing/stack-section";
import { ContactCta } from "@/components/landing/contact-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <>
      <LandingLenis />
      <GrainOverlay />

      <LandingNav />
      <LandingHero />
      {/* Stacks above the sticky hero so the page scrolls up and over it. */}
      <div className="relative z-10">
        <SiloedDataSection />
        <HowPowerhouseWorks />
        <AppAnatomySection />
        <ControlOwnershipSection />
        <WhySection />
        <StackSection />
        <ContactCta />
        <LandingFooter />
      </div>
    </>
  );
}

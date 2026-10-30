import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { SiloedDataSection } from "@/components/landing/siloed-data-section";
import { WorkflowFigure } from "@/components/figures/workflow/figure";
import { HowPowerhouseWorks } from "@/components/landing/how-powerhouse-works";
import { AppAnatomySection } from "@/components/landing/app-anatomy-section";
import { ControlOwnershipSection } from "@/components/landing/control-ownership-section";
import { WhySection } from "@/components/landing/why-section";
import { StackSection } from "@/components/landing/stack-section";
import { IntegrationSection } from "@/components/landing/integration-section";
import { ContactCta } from "@/components/landing/contact-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <>
      <LandingLenis />

      <LandingNav />
      <LandingHero />
      {/* Connections first: the systems you already run, and the catalogue. */}
      <IntegrationSection />
      <SiloedDataSection />
      <HowPowerhouseWorks figure={<WorkflowFigure />} />
      <ControlOwnershipSection />
      <WhySection />
      {/* Building your own application comes after the case for it. */}
      <AppAnatomySection />
      <StackSection />
      <ContactCta />
      <LandingFooter />
    </>
  );
}

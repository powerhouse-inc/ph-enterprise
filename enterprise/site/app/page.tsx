import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { MidCtaBar } from "@/components/landing/mid-cta-bar";
import { PlatformSection } from "@/components/landing/platform-section";
import { IntegrationSection } from "@/components/landing/integration-section";
import { PrivacySection } from "@/components/landing/privacy-section";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { WhySection } from "@/components/landing/why-section";
import { ContactCta } from "@/components/landing/contact-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <>
      <LandingLenis />
      <GrainOverlay />

      <LandingNav />
      <LandingHero />
      <ProblemSection />
      <SolutionSection />
      <UseCasesSection />
      <MidCtaBar />
      <PlatformSection />
      <IntegrationSection />
      <PrivacySection />
      <EcosystemSection />
      <ComparisonSection />
      <WhySection />
      <ContactCta />
      <LandingFooter />
    </>
  );
}

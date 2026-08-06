import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowPowerhouseWorks } from "@/components/landing/how-powerhouse-works";
import { AppAnatomySection } from "@/components/landing/app-anatomy-section";
import { WorkflowExampleSection } from "@/components/landing/workflow-example-section";
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
      <ProblemSection />
      <HowPowerhouseWorks />
      <AppAnatomySection />
      <WorkflowExampleSection />
      <WhySection />
      <StackSection />
      <ContactCta />
      <LandingFooter />
    </>
  );
}

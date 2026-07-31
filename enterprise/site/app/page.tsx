import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { WorkflowExampleSection } from "@/components/landing/workflow-example-section";
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
      <WorkflowExampleSection />
      <WhySection />
      <ContactCta />
      <LandingFooter />
    </>
  );
}

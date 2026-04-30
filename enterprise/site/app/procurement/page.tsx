import type { Metadata } from "next";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { ProcurementPage } from "@/components/procurement/procurement-page";
import { ProcurementNav } from "@/components/procurement/procurement-nav";

export const metadata: Metadata = {
  title: "Procurement",
  description:
    "Buyer-side procurement workflow infrastructure for an AI-saturated supplier market. Keep proposal evaluation, pricing intelligence, and audit trails on your infrastructure.",
  openGraph: {
    title: "Procurement — Powerhouse Enterprise",
    description:
      "Close the buyer-side AI gap with local proposal evaluation, audit-ready workflows, and architecture-level data control.",
    url: "/procurement",
  },
};

export default function ProcurementRoute() {
  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <ProcurementNav />
      <ProcurementPage />
      <LandingFooter />
    </>
  );
}

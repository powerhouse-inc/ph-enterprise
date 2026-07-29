import type { Metadata } from "next";
import { UseCasesIndexPage } from "@/components/use-case/use-cases-index-page";

export const metadata: Metadata = {
  title: "Product Examples",
  description:
    "Concrete workflow software examples built on Powerhouse, including dashboards, operational hubs, subscription workflows, and provenance-backed records.",
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "Product Examples - Powerhouse Enterprise",
    description:
      "Concrete workflow software examples built on Powerhouse.",
    url: "/use-cases",
  },
};

export default function UseCasesRoute() {
  return <UseCasesIndexPage />;
}

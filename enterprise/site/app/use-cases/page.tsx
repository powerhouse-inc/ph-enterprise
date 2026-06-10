import type { Metadata } from "next";
import { UseCasesIndexPage } from "@/components/use-case/use-cases-index-page";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "A few of the things teams have built on Powerhouse — the same building blocks across commercial billing, legal operations, construction data, and open funding standards.",
  openGraph: {
    title: "Use Cases - Powerhouse Enterprise",
    description:
      "One framework, many domains. A look at what teams have built on Powerhouse.",
    url: "/use-cases",
  },
};

export default function UseCasesRoute() {
  return <UseCasesIndexPage />;
}

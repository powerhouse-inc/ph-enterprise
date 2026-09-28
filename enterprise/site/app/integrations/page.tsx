import type { Metadata } from "next";
import { IntegrationsIndexPage } from "@/components/integration/integrations-index-page";
import { SITE_NAME } from "@/lib/site";

const PAGE_DESCRIPTION =
  "Every integration is a data boundary: what enters, how it is structured, who can read it. Typed records, an auditable append-only history, deterministic replay.";

export const metadata: Metadata = {
  title: "Integrations",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/integrations",
  },
  openGraph: {
    title: `Integrations - ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: "/integrations",
  },
};

export default function IntegrationsRoute() {
  return <IntegrationsIndexPage />;
}

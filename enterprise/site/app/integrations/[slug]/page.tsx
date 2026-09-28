import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationPage } from "@/components/integration/integration-page";
import { INTEGRATION_ORDER, getIntegration } from "@/data/integrations";
import { SITE_NAME } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return INTEGRATION_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration) return {};

  return {
    title: `${integration.name} integration`,
    description: integration.metaDescription,
    alternates: {
      canonical: `/integrations/${slug}`,
    },
    openGraph: {
      title: `${integration.name} integration - ${SITE_NAME}`,
      description: integration.metaDescription,
      url: `/integrations/${slug}`,
    },
  };
}

export default async function IntegrationRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration) notFound();

  return <IntegrationPage integration={integration} />;
}

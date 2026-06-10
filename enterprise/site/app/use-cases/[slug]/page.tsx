import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCasePage } from "@/components/use-case/use-case-page";
import {
  USE_CASE_DETAILS,
  USE_CASE_ORDER,
  type UseCaseDetailSlug,
} from "@/data/use-cases-detail";

type Params = { slug: string };

function isUseCaseSlug(slug: string): slug is UseCaseDetailSlug {
  return slug in USE_CASE_DETAILS;
}

export function generateStaticParams(): Params[] {
  return USE_CASE_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isUseCaseSlug(slug)) return {};
  const uc = USE_CASE_DETAILS[slug];

  return {
    title: uc.title,
    description: uc.metaDescription,
    openGraph: {
      title: `${uc.title} - Powerhouse Enterprise`,
      description: uc.metaDescription,
      url: `/use-cases/${slug}`,
    },
  };
}

export default async function UseCaseRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!isUseCaseSlug(slug)) notFound();

  return <UseCasePage useCase={USE_CASE_DETAILS[slug]} />;
}

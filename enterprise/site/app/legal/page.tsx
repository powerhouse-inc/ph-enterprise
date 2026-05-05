import type { Metadata } from "next";
import { IndustryReportPage } from "@/components/industry-report/industry-report-page";
import { INDUSTRY_REPORTS } from "@/data/industry-reports";

const report = INDUSTRY_REPORTS.legal;

export const metadata: Metadata = {
  title: "Legal",
  description: report.metaDescription,
  openGraph: {
    title: "Legal - Powerhouse Enterprise",
    description: report.metaDescription,
    url: "/legal",
  },
};

export default function LegalRoute() {
  return <IndustryReportPage report={report} />;
}

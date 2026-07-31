import type { Metadata } from "next";
import { IndustryReportPage } from "@/components/industry-report/industry-report-page";
import { INDUSTRY_REPORTS } from "@/data/industry-reports";

const report = INDUSTRY_REPORTS.finance;

export const metadata: Metadata = {
  title: "Finance",
  description: report.metaDescription,
  openGraph: {
    title: "Finance - Powerhouse Enterprise",
    description: report.metaDescription,
    url: "/finance",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FinanceRoute() {
  return <IndustryReportPage report={report} />;
}

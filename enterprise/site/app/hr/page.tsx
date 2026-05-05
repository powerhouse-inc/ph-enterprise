import type { Metadata } from "next";
import { IndustryReportPage } from "@/components/industry-report/industry-report-page";
import { INDUSTRY_REPORTS } from "@/data/industry-reports";

const report = INDUSTRY_REPORTS.hr;

export const metadata: Metadata = {
  title: "HR",
  description: report.metaDescription,
  openGraph: {
    title: "HR - Powerhouse Enterprise",
    description: report.metaDescription,
    url: "/hr",
  },
};

export default function HrRoute() {
  return <IndustryReportPage report={report} />;
}

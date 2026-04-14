import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteDescription =
  "Powerhouse Enterprise: AI-native operations infrastructure for industries where data confidentiality is non-negotiable. Private by architecture — your models, your servers, never exposed.";

function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default:
      "Powerhouse Enterprise — AI-Native Operations. Private by Architecture.",
    template: "%s — Powerhouse Enterprise",
  },
  description: siteDescription,
  keywords: [
    "enterprise AI infrastructure",
    "private AI operations",
    "data sovereignty",
    "AI-native architecture",
    "on-premise AI",
    "local AI models",
    "enterprise data privacy",
    "AI agent infrastructure",
  ],
  authors: [{ name: "Powerhouse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Powerhouse Enterprise",
    title:
      "Powerhouse Enterprise — AI-Native Operations. Private by Architecture.",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Powerhouse Enterprise — AI-Native Operations. Private by Architecture.",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Powerhouse",
              url: siteUrl(),
              description: siteDescription,
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@powerhouse.inc",
                contactType: "sales",
              },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

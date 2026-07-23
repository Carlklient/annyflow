import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SocialRail } from "@/components/layout/SocialRail";
import { Preloader } from "@/components/brand/Preloader";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import "@fontsource-variable/outfit";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: Business Automation, Spreadsheets, Phone Systems & Outbound Calling`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#10B981",
      },
    ],
  },
  manifest: "/site.webmanifest",
  keywords: [
    "AnnyFlow",
    "business automation",
    "spreadsheet automation",
    "Excel automation",
    "Google Sheets automation",
    "CRM automation",
    "workflow automation",
    "n8n",
    "Zapier",
    "Make.com",
    "business phone system",
    "3CX",
    "FreePBX",
    "Asterisk PBX",
    "SIP trunks",
    "IVR",
    "outbound dialer",
    "Vicidial",
    "predictive dialer",
    "call center infrastructure",
  ],
  authors: [{ name: SITE.founder }, { name: SITE.name }],
  creator: SITE.name,
  category: "Business Automation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}: Business Automation, Spreadsheets, Phone Systems & Outbound Calling`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: Business Automation, Spreadsheets & Calling Infrastructure`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <JsonLd />
        <Preloader />
        <ScrollToTop />
        <SocialRail />
        <Header />
        <main
          id="main"
          className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)] md:pr-4 lg:pr-8"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

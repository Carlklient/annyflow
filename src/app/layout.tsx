import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SocialRail } from "@/components/layout/SocialRail";
import { Preloader } from "@/components/brand/Preloader";
import { SITE } from "@/lib/constants";
import "@fontsource-variable/outfit";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Business Automation & Calling Infrastructure`,
    template: `%s · ${SITE.name}`,
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
    "business automation",
    "CRM automation",
    "3CX",
    "Vicidial",
    "n8n",
    "Zapier",
    "PBX",
    "outbound dialer",
    "AnnyFlow",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Business Automation & Calling Infrastructure`,
    description: SITE.description,
    images: [{ url: "/brand/logo-full.png", width: 1344, height: 1539, alt: "AnnyFlow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Business Automation & Calling Infrastructure`,
    description: SITE.description,
    images: ["/brand/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
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
        <Preloader />
        <ScrollToTop />
        <SocialRail />
        <Header />
        <main id="main" className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)] md:pr-4 lg:pr-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

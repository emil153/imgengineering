import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
// Self-hosted fonts with Cyrillic + Latin subsets (loaded per unicode-range). PROVISIONAL choice.
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { company } from "@/content/site";
import { Header, MobileActionBar, UtilityBar } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "IMG Engineering | Отопление, климатизация и вентилация",
    template: "%s | IMG Engineering",
  },
  description:
    "Проектиране, доставка, монтаж и поддръжка на отоплителни, климатични и вентилационни системи за дома и бизнеса. IMG Engineering, София.",
  applicationName: "IMG Engineering",
  // PROTOTYPE: keep out of search indexes until launch. Flip to index:true at go-live.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "IMG Engineering",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg">
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-img-black px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Към основното съдържание
        </a>
        <UtilityBar />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <div aria-hidden="true" className="h-14 lg:hidden" />
      </body>
    </html>
  );
}

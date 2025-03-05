import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { SanityLive } from "@/sanity/lib/live";
import Header from "@/components/layout/Header";
import Fotter from "@/components/layout/Fotter";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: {
    template: "%s | AliTrendsFinds",
    absolute: "AliTrendsFinds",
  },
  description:
    "Curated selection of trending AliExpress products with exclusive deals. Find viral products and connect directly with top AliExpress sellers.",
  keywords: [
    "AliExpress deals",
    "trending products",
    "AliExpress finds",
    "discount shopping",
    "viral products",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alitrendsfinds.com",
    title: "AliTrendsFinds - Discover Trending AliExpress Products",
    description:
      "Curated selection of trending AliExpress products with exclusive deals",
    siteName: "AliTrendsFinds",
    images: [
      {
        url: "/og-image.png",
        width: 399,
        height: 352,
        alt: "AliTrendsFinds featured products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AliTrendsFinds - Trending AliExpress Products",
    description:
      "Discover viral products and amazing deals from top AliExpress sellers",
    images: ["/og-image.png"], // Create and add a Twitter card image
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
  alternates: {
    canonical: "https://alitrendsfinds.com",
  },
};
const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Header categorySelector={<HeaderCategorySelector />} />
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="a3b98e53-2744-45fe-913a-be8efa4ea6e0"
            strategy="beforeInteractive"
          />

          {children}
          <Fotter />
          <SanityLive />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { SanityLive } from "@/sanity/lib/live";
import Header from "@/components/layout/Header";
import Fotter from "@/components/layout/Fotter";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AliTrendsFinds",
  description: "Discover Trending Products at Direct Prices",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white min-h-[125vh]`}>
        <Header categorySelector={<HeaderCategorySelector />} />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="(YOUR UMAMI WEBSITE ID)"
          strategy="beforeInteractive"
        />

        {children}
        <Fotter />
        <SanityLive />
      </body>
    </html>
  );
};

export default RootLayout;

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
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
  description: "Discover Trending Products at Direct Prices",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Header categorySelector={<HeaderCategorySelector />} />
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="(YOUR UMAMI WEBSITE ID)"
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

import "./globals.css";
import { Red_Hat_Text, Source_Sans_3 } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import ApolloProviderWrapper from "./providers/ApolloProviderWrapper";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dessert Shop",
  description: "Browse and order delicious desserts",
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-red-hat-text",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "400", "900"],
  variable: "--font-source-sans",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${redHatText.variable} ${sourceSans3.variable}`}
    >
      <body>
        <ApolloProviderWrapper>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}

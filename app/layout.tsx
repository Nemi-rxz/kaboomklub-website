import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KaboomKlub — African Music, Culture, Business & Entertainment",
    template: "%s | KaboomKlub",
  },
  description:
    "Discover the music, people, ideas and stories shaping Africa's culture and creative economy. KaboomKlub covers African music, Afrobeats, entertainment, culture, and business.",
  metadataBase: new URL("https://kaboomklub.com"),
  openGraph: {
    siteName: "KaboomKlub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaboomklub",
  },
  keywords: [
    "African music",
    "Afrobeats",
    "Nigerian music",
    "African entertainment",
    "African culture",
    "music business",
    "artist discovery",
    "Kaboomklub",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full bg-[#f7f3ea] text-[#17120c]"><Suspense fallback={<div className="min-h-screen bg-[#f7f3ea]" />}>{children}</Suspense></body>
    </html>
  );
}

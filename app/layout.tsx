import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KaboomKlub",
    template: "%s",
  },
  description: "KaboomKlub brings together the website and @kaboomklub Instagram with simple, regular content across entertainment, Afrobeats, lifestyle, and creator updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f7f3ea] text-[#17120c]">{children}</body>
    </html>
  );
}

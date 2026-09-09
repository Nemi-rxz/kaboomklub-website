import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import OrganizationLd from "@/components/seo/OrganizationLd";
import { getSiteSettings } from "@/lib/posts";

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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

async function OrgLd() {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> = null;
  try {
    settings = await getSiteSettings();
  } catch (_) {
    settings = null;
  }

  const siteUrl =
    (settings && typeof (settings as any)?.siteUrl === "string" && (settings as any).siteUrl.trim()) ||
    "https://kaboomklub.com";

  const s = settings as Record<string, any> | null;
  const socialCandidates = s
    ? [s.instagram, s.tiktok, s.twitter, s.youtube, s.spotify, s.facebook]
    : [];
  const socialLinks = socialCandidates.filter(
    (u): u is string => Boolean(typeof u === "string" && u.trim().startsWith("http"))
  );

  const logoUrl =
    s && typeof s.logoUrl === "string" && s.logoUrl.trim().length > 0
      ? /^https?:\/\//i.test(s.logoUrl)
        ? s.logoUrl
        : `${siteUrl.replace(/\/$/, "")}${s.logoUrl.startsWith("/") ? "" : "/"}${s.logoUrl}`
      : undefined;

  return (
    <OrganizationLd
      siteName="KaboomKlub"
      siteUrl={siteUrl}
      logo={logoUrl}
      description={metadata.description as string | undefined}
      socialLinks={socialLinks}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <head>
        <Suspense fallback={null}>
          <OrgLd />
        </Suspense>
      </head>
      <body className="min-h-full bg-[#f7f3ea] text-[#17120c]">
        <Suspense fallback={<div className="min-h-screen bg-[#f7f3ea]" />}>{children}</Suspense>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import { getPublicSiteConfig, categories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "About",
  description:
    "About KaboomKlub — an African digital media platform covering music, entertainment, culture and business. Powered by Fish Art X.",
};

const platforms = [
  { name: "Website", handle: "kaboomklub.com", href: "/", desc: "The central digital home — full stories, features, artist profiles, playlists, events and original editorial." },
  { name: "Instagram", handle: "@kaboomklub", href: "https://www.instagram.com/kaboomklub/", desc: "Discovery, short-form content, artist promotion, breaking news, community and conversation." },
  { name: "TikTok", handle: "@kaboomklub", href: "https://www.tiktok.com/@kaboomklub", desc: "Short-form video, music discovery, cultural moments and viral content." },
  { name: "X / Twitter", handle: "@kaboomklub", href: "https://x.com/kaboomklub", desc: "Industry conversation, music commentary, news and real-time reactions." },
  { name: "YouTube", handle: "@kaboomklub", href: "https://www.youtube.com/@kaboomklub", desc: "Original video content, artist interviews, event coverage and multimedia features." },
  { name: "Spotify", handle: "KaboomKlub Playlists", href: "https://open.spotify.com/", desc: "Curated African music playlists — Afrobeats, new releases, emerging artists and genre discovery." },
  { name: "Newsletter", handle: "The Kaboomklub Brief", href: "/newsletter", desc: "Direct-to-inbox coverage of African music, culture, business and entertainment. Free weekly." },
];

export default async function AboutPage() {
  const siteConfig = await getPublicSiteConfig();
  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Who We Are</p>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
                About<br />KaboomKlub
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f7f3ea]/60">
                {siteConfig.mission}
              </p>
            </div>
            <div className="border border-[#f7f3ea]/12 bg-[#080b10] p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">KaboomKlub</p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight">
                {siteConfig.tagline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#f7f3ea]/55">
                {siteConfig.mission}
              </p>
              <p className="mt-4 text-[10px] font-medium text-[#f7f3ea]/30">
                {siteConfig.companyNote}
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">What We Do</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Our Mission
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#5c4933]">
                KaboomKlub is a modern African digital media platform. We discover, cover, document, promote
                and build media around music, business, culture and entertainment.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5c4933]">
                We started with a passion for African music — especially Afrobeats, Nigerian music and the
                emerging sounds reshaping the continent&apos;s creative landscape. That passion grew into something
                bigger: a platform that covers not just the music, but the people, businesses, and culture
                surrounding it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5c4933]">
                The website is our central digital home. Social media is our distribution network. Together,
                they give KaboomKlub a presence that exists both inside and outside the algorithm.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">What We Cover</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group flex items-start gap-5 border border-[#17120c]/12 p-5 transition-all hover:border-[#17120c]"
                >
                  <span
                    className="mt-1 h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: cat.color }}>
                      {cat.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#5c4933]">{cat.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Original media franchises */}
        <section className="border-b border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Original Editorial</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Our Media Formats</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Kaboomklub Interviews", desc: "In-depth conversations with artists, creatives, executives and cultural figures." },
                { name: "Artist Spotlight", desc: "Dedicated features celebrating artists and their work." },
                { name: "Kaboomklub Explains", desc: "Clear, accessible explainers on music, business, tech and culture." },
                { name: "The Business of Music", desc: "Recurring coverage of the economics, industry and business side of African music." },
                { name: "Culture Watch", desc: "Tracking emerging cultural movements, trends and creative energy." },
                { name: "Industry Watch", desc: "Analysis of developments across music, entertainment and media." },
                { name: "Kaboomklub Reviews", desc: "Honest reviews of music, films, and entertainment products." },
                { name: "Deep Dive", desc: "Long-form journalism and analysis on the stories that need more space." },
                { name: "Kaboomklub Sessions", desc: "Live and performance content — featuring artists in their element." },
              ].map(({ name, desc }) => (
                <div key={name} className="border border-[#17120c]/12 bg-white p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#b3241b]">{name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4933]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The KaboomKlub ecosystem */}
        <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Where We Are</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">The KaboomKlub Ecosystem</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col border border-[#17120c]/12 p-6 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">{p.name}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#17120c]/50">{p.handle}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4933]">{p.desc}</p>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] transition-colors group-hover:text-[#17120c]">
                    Visit →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Media kit + Fish Art X */}
        <section className="px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-6 lg:grid-cols-2">

            {/* Media kit */}
            <div className="border border-[#17120c] p-8 sm:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">For Brands & Agencies</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                Media Kit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5c4933]">
                Want to advertise with or partner with KaboomKlub? Request our current media kit for
                audience information, platform details, advertising opportunities, and rate information.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact?type=media-kit" className="bg-[#17120c] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]">
                  Request Media Kit →
                </Link>
                <Link href="/advertise" className="border border-[#17120c] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                  Advertise With Us →
                </Link>
              </div>
            </div>

            {/* Fish Art X + 9JA Lifestyle */}
            <div className="flex flex-col gap-6">
              <div className="border border-[#17120c]/12 bg-[#17120c] p-8 text-[#f7f3ea]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Powered By</p>
                <h3 className="mt-3 text-2xl font-black uppercase">Fish Art X</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#f7f3ea]/60">
                  {siteConfig.companyNote} Fish Art X is the creative company behind the KaboomKlub
                  media platform, providing strategic, creative and commercial direction.
                </p>
              </div>

              <div className="border border-[#17120c]/12 p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Collaboration</p>
                <h3 className="mt-3 text-2xl font-black uppercase">KaboomKlub × 9JA Lifestyle</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5c4933]">
                  KaboomKlub maintains an active collaboration with 9JA Lifestyle, connecting across
                  Nigerian music, culture, lifestyle coverage and audience communities.
                </p>
                <Link
                  href="https://www.instagram.com/9ja.lifestyle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] hover:text-[#17120c]"
                >
                  @9ja.lifestyle →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Work with us CTA */}
        <section className="border-t border-[#17120c] bg-[#b3241b] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/60">Get Involved</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
                Work With KaboomKlub
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                Artists, labels, brands, agencies, creatives and businesses — let&apos;s work together.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/services" className="shrink-0 bg-[#f7f3ea] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Our Services →
              </Link>
              <Link href="/contact" className="shrink-0 border border-[#f7f3ea]/30 px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:border-[#f7f3ea] hover:bg-[#f7f3ea] hover:text-[#b3241b]">
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

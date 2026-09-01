import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";

export const metadata: Metadata = {
  title: "Advertise & Partner",
  description:
    "Advertise with KaboomKlub — reach young, culturally engaged African audiences through sponsored content, digital campaigns, playlist promotion, and media partnerships.",
};

const opportunities = [
  {
    title: "Sponsored Content",
    desc: "Commission original editorial content that integrates your brand, artist, or message into the KaboomKlub editorial voice.",
    tags: ["Brands", "Labels", "Artists"],
  },
  {
    title: "Sponsored Articles",
    desc: "Publish branded editorial features, announcements, and press releases directly on KaboomKlub with full editorial treatment.",
    tags: ["PR Agencies", "Labels", "Brands"],
  },
  {
    title: "Artist Promotion",
    desc: "Promote an artist, release, or project to KaboomKlub's engaged audience through editorial placements and social amplification.",
    tags: ["Artists", "Managers", "Labels"],
  },
  {
    title: "Brand Campaigns",
    desc: "Run full digital campaigns across KaboomKlub's platforms — website, social media, newsletter, and editorial channels.",
    tags: ["Brands", "Agencies"],
  },
  {
    title: "Playlist Promotion",
    desc: "Feature your music or brand in KaboomKlub curated playlists and discovery channels across streaming platforms.",
    tags: ["Artists", "Labels", "Distributors"],
  },
  {
    title: "Newsletter Sponsorship",
    desc: "Sponsor The Kaboomklub Brief — our curated newsletter covering African music, culture, business and entertainment.",
    tags: ["Brands", "Labels", "Events"],
  },
  {
    title: "Event Sponsorship",
    desc: "Partner with KaboomKlub on events, cultural activations, listening sessions and creative industry gatherings.",
    tags: ["Brands", "Events", "Entertainment"],
  },
  {
    title: "Media Partnerships",
    desc: "Long-term editorial, creative, or commercial partnerships built around shared audiences and cultural goals.",
    tags: ["Media", "Brands", "Organizations"],
  },
  {
    title: "Social Media Campaigns",
    desc: "Amplify your campaign across KaboomKlub's social channels — Instagram, TikTok, X and YouTube.",
    tags: ["Brands", "Labels", "Artists"],
  },
];

export default function AdvertisePage() {
  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Commercial</p>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Advertise &<br />Partner
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f7f3ea]/60">
                Reach young, culturally engaged African audiences through KaboomKlub&apos;s editorial channels, social
                platforms, playlists and newsletter. Talk to our team about what&apos;s right for your campaign.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="border border-[#f7f3ea]/12 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Our Audience</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { label: "Platform", value: "Kaboomklub.com" },
                    { label: "Channels", value: "Web, Social, Email" },
                    { label: "Focus", value: "African Music & Culture" },
                    { label: "Audience", value: "Young Africans & Diaspora" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#f7f3ea]/35">{label}</p>
                      <p className="mt-1 text-sm font-bold text-[#f7f3ea]/70">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/contact?type=advertise"
                className="block bg-[#b3241b] py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
              >
                Request A Media Proposal →
              </Link>
            </div>
          </div>
        </section>

        {/* Advertising opportunities */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mb-10 border-b border-[#17120c] pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Opportunities</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">How We Can Work Together</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => (
              <div key={opp.title} className="flex flex-col border border-[#17120c]/12 p-7 transition-all hover:border-[#17120c]">
                <h3 className="text-base font-black uppercase">{opp.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4933]">{opp.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {opp.tags.map((tag) => (
                    <span key={tag} className="border border-[#17120c]/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-[#17120c]/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why KaboomKlub */}
        <section className="border-y border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Why Partner</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Why KaboomKlub</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Culturally Connected",
                  desc: "KaboomKlub is rooted in African music and culture. Our audience trusts us because we are authentically part of the conversation.",
                },
                {
                  title: "Multi-Channel Reach",
                  desc: "We operate across website, Instagram, TikTok, X, YouTube, Spotify and newsletter — giving your campaign multiple touchpoints.",
                },
                {
                  title: "Editorial Credibility",
                  desc: "KaboomKlub is a media platform with editorial standards. Sponsored content on our platform carries genuine credibility.",
                },
                {
                  title: "Music-First Audience",
                  desc: "Our audience is young, digitally active and music-obsessed — making KaboomKlub ideal for music, entertainment and culture-adjacent brands.",
                },
                {
                  title: "Tailored Campaigns",
                  desc: "We don&apos;t do one-size-fits-all. Every campaign is designed around your specific goals, audience and budget.",
                },
                {
                  title: "Creative Capability",
                  desc: "We can create the content too — from editorial writing and social assets to campaign strategy and design.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="border border-[#17120c]/12 bg-white p-6">
                  <h3 className="text-base font-black uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c4933]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media kit + CTA */}
        <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="border border-[#17120c] p-8 sm:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Media Kit</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                Request Our<br />Media Kit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5c4933]">
                Want full details on our audience, platforms, advertising opportunities and rates?
                Contact us and we&apos;ll send over our current media kit.
              </p>
              <Link
                href="/contact?type=media-kit"
                className="mt-6 inline-block border border-[#17120c] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
              >
                Request Media Kit →
              </Link>
            </div>

            <div className="border border-[#17120c] bg-[#17120c] p-8 text-[#f7f3ea] sm:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Get Started</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                Partner With<br />KaboomKlub
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#f7f3ea]/60">
                Tell us about your campaign, project or partnership idea. We&apos;ll review it and come back
                with a tailored proposal.
              </p>
              <Link
                href="/contact?type=advertise"
                className="mt-6 inline-block bg-[#b3241b] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
              >
                Request A Proposal →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

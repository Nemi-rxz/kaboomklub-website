import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getPublicSiteConfig, getLatestPosts } from "@/lib/posts";
import NewsletterSignup from "./NewsletterSignup";

const whatWeCover = [
  { label: "Music", desc: "New releases, artist news, Afrobeats, emerging acts and the records shaping the conversation." },
  { label: "Entertainment", desc: "Nollywood, film, TV, streaming, concerts and the entertainment stories connected to culture." },
  { label: "Culture", desc: "Fashion, art, lifestyle, youth culture and the creative movements shaping African identity." },
  { label: "Business", desc: "Music business, creative economy, industry analysis, startups and the systems behind growth." },
  { label: "Discoveries", desc: "New artists, emerging sounds and the finds that deserve more attention." },
  { label: "Features", desc: "Original KaboomKlub editorial — interviews, spotlights, explainers and deep dives." },
];

export default async function NewsletterPage() {
  const latestPosts = await getLatestPosts(3);
  const siteConfig = await getPublicSiteConfig();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Hero */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Newsletter</p>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                {siteConfig.newsletterName}
              </h1>
              <p className="mt-5 text-xl font-medium leading-relaxed text-[#f7f3ea]/70">
                The week in African music, culture, business and entertainment — delivered directly to your inbox.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/50">
                {siteConfig.newsletterDescription} No spam. No noise. Just the stories, sounds and
                conversations that matter.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/35">
                <span>Free</span>
                <span>·</span>
                <span>Weekly</span>
                <span>·</span>
                <span>Unsubscribe Anytime</span>
              </div>
            </div>

            {/* Signup form */}
            <div className="border border-[#f7f3ea]/12 bg-[#080b10] p-8 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Subscribe Free</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight">
                Get The Brief<br />In Your Inbox
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#f7f3ea]/50">
                Join the KaboomKlub community and stay on top of African music and culture.
              </p>

              <NewsletterSignup />
            </div>
          </div>
        </section>

        {/* What we cover */}
        <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">What&apos;s Inside</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">What We Cover</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whatWeCover.map(({ label, desc }) => (
                <div key={label} className="border border-[#17120c]/12 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">{label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c4933]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest from the site */}
        {latestPosts.length > 0 && (
          <section className="bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Recent</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Latest Stories</h2>
                </div>
                <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#b3241b]">
                  All Stories →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter sponsorship */}
        <section className="border-t border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Sponsors</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                Sponsor The Kaboomklub Brief
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                Reach KaboomKlub&apos;s engaged newsletter audience — artists, industry professionals, brands,
                and culturally connected readers across Africa and the diaspora. Contact us to discuss sponsorship
                opportunities.
              </p>
            </div>
            <Link
              href="/contact?type=newsletter-sponsorship"
              className="shrink-0 bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
            >
              Sponsor The Brief →
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

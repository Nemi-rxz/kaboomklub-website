import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import MajorHeadline from "@/components/MajorHeadline";
import { getPostsByCategory, getPostsByContentFormat } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Original KaboomKlub editorial — interviews, artist spotlights, profiles, explainers and deep dives.",
};

const formats = [
  { label: "Kaboomklub Interviews", format: "Interview" },
  { label: "Artist Spotlight", format: "Artist Spotlight" },
  { label: "Kaboomklub Explains", format: "Explainer" },
  { label: "The Business of Music", format: "The Business of Music" },
  { label: "Culture Watch", format: "Culture Watch" },
  { label: "Industry Watch", format: "Industry Watch" },
  { label: "Deep Dive", format: "Deep Dive" },
  { label: "Kaboomklub Reviews", format: "Review" },
];

export default function FeaturesPage() {
  const posts = getPostsByCategory("features");
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  const interviews = getPostsByContentFormat("Interview").slice(0, 3);
  const explainers = getPostsByContentFormat("Explainer").slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b-[6px] border-[#e85d04] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#e85d04]">Original Editorial</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Features
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Original KaboomKlub editorial — interviews, artist spotlights, profiles, explainers and deep dives into
              the music, culture and business shaping Africa.
            </p>
            {/* Format labels */}
            <div className="mt-8 flex flex-wrap gap-3">
              {formats.map((f) => (
                <span key={f.format} className="border border-[#e85d04]/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#e85d04]/80">
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {featuredPost && <MajorHeadline post={featuredPost} />}

        {/* Interviews */}
        {interviews.length > 0 && (
          <section className="border-b border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e85d04]">KaboomKlub</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Interviews</h2>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {interviews.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All features grid */}
        {gridPosts.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">All Features</h2>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#e85d04]">
                All Stories →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {gridPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* KaboomKlub Explains */}
        {explainers.length > 0 && (
          <section className="border-y border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#f7f3ea]/12 pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e85d04]">Series</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#f7f3ea]">
                    KaboomKlub Explains
                  </h2>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {explainers.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-24 text-center sm:px-10 lg:px-16">
            <p className="text-lg font-black uppercase text-[#17120c]/30">Original features coming soon.</p>
            <Link href="/stories" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">Browse All Stories →</Link>
          </section>
        )}

        {/* Pitch CTA */}
        <section className="border-t border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e85d04]">Get Featured</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Artist Spotlight & Interviews
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                KaboomKlub produces original features, interviews and artist spotlights for artists, creatives and
                industry figures shaping African music and culture.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact?service=artist-spotlight" className="bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]">
                Request A Feature →
              </Link>
              <Link href="/services" className="border border-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Our Services →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import MajorHeadline from "@/components/MajorHeadline";
import { getPostsByCategory, getPostsByContentFormat } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Music business, creative economy, startups, entrepreneurship, technology and the systems behind growth in Africa.",
};

const subcategories = [
  "Music Business",
  "Creative Economy",
  "Startups",
  "Entrepreneurship",
  "Technology",
  "Creator Economy",
  "Industry",
];

export default async function BusinessPage() {
  const posts = await getPostsByCategory("business");
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);
  const businessOfMusicPosts = (await getPostsByContentFormat("The Business of Music")).slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b-[6px] border-[#1a8f6e] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#1a8f6e]">KaboomKlub</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Business
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Music business, creative economy, startups, entrepreneurship, technology and the systems behind growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {subcategories.map((sub) => (
                <span key={sub} className="border border-[#f7f3ea]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/55">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>

        {featuredPost && <MajorHeadline post={featuredPost} />}

        {/* The Business of Music series */}
        {businessOfMusicPosts.length > 0 && (
          <section className="border-b border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a8f6e]">Series</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">The Business of Music</h2>
                </div>
                <Link href="/features" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#1a8f6e]">
                  All Features →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {businessOfMusicPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All business posts */}
        {gridPosts.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">Latest Business</h2>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#1a8f6e]">
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

        {posts.length === 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-24 text-center sm:px-10 lg:px-16">
            <p className="text-lg font-black uppercase text-[#17120c]/30">Business stories coming soon.</p>
            <Link href="/stories" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">Browse All Stories →</Link>
          </section>
        )}

        {/* Services CTA */}
        <section className="border-t border-[#17120c] bg-[#1a8f6e] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/60">Work With Us</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Grow Your Music Business
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                KaboomKlub works with artists, labels, brands and creative businesses to deliver campaigns,
                features, and growth strategies that actually work.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/services" className="shrink-0 bg-[#f7f3ea] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#1a8f6e] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Our Services →
              </Link>
              <Link href="/contact" className="shrink-0 border border-[#f7f3ea]/30 px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:border-[#f7f3ea] hover:bg-[#f7f3ea] hover:text-[#1a8f6e]">
                Get A Quote →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

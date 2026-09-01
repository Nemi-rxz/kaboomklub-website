import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import MajorHeadline from "@/components/MajorHeadline";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Entertainment",
  description:
    "Nollywood, film, TV, streaming, concerts, festivals, pop culture and the entertainment stories shaping Africa.",
};

const subcategories = ["Nollywood", "Film", "TV & Streaming", "Pop Culture", "Concerts", "Festivals", "Celebrity"];

export default function EntertainmentPage() {
  const posts = getPostsByCategory("entertainment");
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b-[6px] border-[#7c3aed] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#7c3aed]">KaboomKlub</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-9xl">
              Entertainment
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Nollywood, film, TV, streaming, concerts, festivals, celebrity news and the entertainment stories connected to culture.
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

        {gridPosts.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">Latest Entertainment</h2>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#7c3aed]">
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
            <p className="text-lg font-black uppercase text-[#17120c]/30">Entertainment stories coming soon.</p>
            <Link href="/stories" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">Browse All Stories →</Link>
          </section>
        )}

        {/* Events CTA */}
        <section className="border-t border-[#17120c] bg-[#7c3aed] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/60">Live & Events</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Concerts, Festivals & Events
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                Stay up to date with the concerts, festivals, and entertainment events happening across Africa.
              </p>
            </div>
            <Link
              href="/events"
              className="shrink-0 bg-[#f7f3ea] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#7c3aed] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
            >
              Browse Events →
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

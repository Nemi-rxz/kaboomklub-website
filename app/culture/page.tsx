import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import MajorHeadline from "@/components/MajorHeadline";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "African culture, fashion, lifestyle, youth culture, digital trends and the creative movements shaping identity.",
};

const subcategories = ["Fashion", "Lifestyle", "Art", "Youth Culture", "Digital Culture", "Identity", "Creative Movements"];

export default async function CulturePage() {
  const posts = await getPostsByCategory("culture");
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b-[6px] border-[#f2c14e] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">KaboomKlub</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Culture
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              African culture, fashion, lifestyle, youth culture, digital trends and the creative movements shaping identity.
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
              <h2 className="text-2xl font-black uppercase tracking-tight">Latest Culture</h2>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#f2c14e]">
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
            <p className="text-lg font-black uppercase text-[#17120c]/30">Culture stories coming soon.</p>
            <Link href="/stories" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">Browse All Stories →</Link>
          </section>
        )}

        {/* Culture Watch promo */}
        <section className="border-t border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Original Format</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Culture Watch
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                KaboomKlub&apos;s Culture Watch tracks the emerging movements, trends, and creative energy shaping African
                identity — from Lagos streets to global stages.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/features" className="border border-[#17120c] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Browse Features →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

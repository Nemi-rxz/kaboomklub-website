import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { categories, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Stories",
  description:
    "Browse every story from KaboomKlub — African music, entertainment, culture, business, and original features.",
};

export default function StoriesPage() {
  const posts = getPosts();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Archive</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
              All Stories
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c4933]">
              Original journalism, features, music coverage, entertainment, culture, business, and more — every story
              from the KaboomKlub editorial desk.
            </p>

            {/* Category filter links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors cat-pill-${cat.slug}`}
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#17120c]/35">
            {posts.length} {posts.length === 1 ? "Story" : "Stories"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

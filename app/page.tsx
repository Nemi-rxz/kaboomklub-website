import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import MajorHeadline from "@/components/MajorHeadline";
import PostCard from "@/components/PostCard";
import { categories, getFeaturedPost, getPosts, getPostsByCategory, getPostsByPriority } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  const featuredPost = getFeaturedPost();
  const secondaryPosts = getPostsByPriority("SECONDARY");
  const sidebarPosts = getPostsByPriority("SIDEBAR");
  const latestPosts = posts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">
        <MajorHeadline post={featuredPost} />

        <section className="border-b border-[#17120c] bg-[#17120c] text-[#f7f3ea]">
          <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-5 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f2c14e]">
              Trending Now
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {latestPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/story/${post.slug}`}
                  className="text-sm font-bold uppercase tracking-wide text-[#f7f3ea]/80 transition-colors hover:text-[#f2c14e]"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="grid gap-12 xl:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="flex items-end justify-between gap-6 border-b border-[#17120c] pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                    Front Page
                  </p>
                  <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                    Entertainment Lead
                  </h2>
                </div>
                <Link
                  href="/stories"
                  className="text-xs font-black uppercase tracking-[0.2em] text-[#17120c]/60 transition-colors hover:text-[#b3241b]"
                >
                  View All
                </Link>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {secondaryPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            <aside className="space-y-10">
              <div className="border border-[#17120c] bg-white p-8">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                  Editor&apos;s Note
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight">
                  Entertainment, African music, and lifestyle with a louder point of view.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#5c4933]">
                  KaboomKlub now leans harder into pop culture, Afrobeats, creator energy, and the polished
                  lifestyle moments that travel fastest across modern editorial and social platforms.
                </p>
              </div>

              <div className="border border-[#17120c]/15 bg-[#fffaf2] p-8">
                <div className="flex items-end justify-between gap-4 border-b border-[#17120c]/10 pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                      Side Stack
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
                      Fast Reads
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17120c]/40">
                    Quick Hits
                  </span>
                </div>

                <div className="mt-2">
                  {sidebarPosts.map((post) => (
                    <PostCard key={post.id} post={post} horizontal />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-[#17120c] bg-[#efe6d7]">
          <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-16">
            <div className="flex flex-col gap-5 border-b border-[#17120c] pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                  Sections
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                  Browse The Noise
                </h2>
              </div>
              <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.12em] text-[#17120c]/50">
                Clean editorial buckets for readers moving between entertainment news, African music, style, and creator tech.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-4">
              {categories.map((category) => {
                const categoryPosts = getPostsByCategory(category.slug);

                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group border border-[#17120c]/15 bg-white p-6 transition-all hover:border-[#17120c] hover:shadow-[8px_8px_0px_0px_rgba(23,18,12,1)]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                      {category.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-black uppercase tracking-tight">
                      {categoryPosts.length} Stories
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#5c4933]">
                      {category.description}
                    </p>
                    <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors group-hover:text-[#b3241b]">
                      Open Desk +
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="border border-[#17120c] bg-white p-8 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                About KaboomKlub
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                A sharper home for entertainment-led stories.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5c4933]">
                The site now feels closer to a culture publication: more focus on entertainment, Afrobeats,
                lifestyle coverage, stronger hierarchy, and a front page that fits a modern media brand.
              </p>
            </div>

            <div
              id="newsletter"
              className="border border-[#17120c] bg-[#17120c] p-8 text-[#f7f3ea] sm:p-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f2c14e]">
                Stay Loud
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Get the weekly drop.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                Follow the newest coverage in entertainment, Afrobeats, lifestyle, and creator tools with a cleaner reader-first layout.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="min-w-0 flex-1 border border-[#f7f3ea]/20 bg-transparent px-4 py-4 text-sm font-black outline-none transition-colors placeholder:text-[#f7f3ea]/35 focus:border-[#f2c14e]"
                />
                <button className="bg-[#b3241b] px-6 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:bg-[#f2c14e] hover:text-[#17120c]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

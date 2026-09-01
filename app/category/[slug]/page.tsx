import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { categories, getCategoryMeta, getPostsByCategory } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryMeta(slug);

  if (!category) return { title: "Category | KaboomKlub" };

  return {
    title: `${category.label} — African Music, Culture, Business & Entertainment`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryMeta(slug);

  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const mainPosts = posts.slice(0, 1);
  const gridPosts = posts.slice(1);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Category header */}
        <section
          className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16"
          style={{ borderTop: `6px solid ${category.color}` }}
        >
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: category.color }}>
              Section
            </p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              {category.label}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c4933]">
              {category.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="border border-[#17120c]/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#17120c]/50 transition-colors hover:border-[#17120c] hover:text-[#17120c]"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-black uppercase text-[#17120c]/30">No stories yet in this section.</p>
              <Link href="/stories" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                Browse All Stories →
              </Link>
            </div>
          ) : (
            <>
              {/* Lead post */}
              {mainPosts.length > 0 && (
                <div className="mb-12 border-b border-[#17120c]/15 pb-12">
                  <Link href={`/story/${mainPosts[0].slug}`} className="group grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]"
                          style={{ backgroundColor: category.color }}
                        >
                          {mainPosts[0].contentFormat || mainPosts[0].subcategory}
                        </span>
                        <span className="text-[10px] font-bold text-[#17120c]/40">
                          {mainPosts[0].date} · {mainPosts[0].readTime}
                        </span>
                      </div>
                      <h2 className="text-4xl font-black uppercase leading-none tracking-tight transition-colors group-hover:text-[#b3241b] sm:text-5xl lg:text-6xl">
                        {mainPosts[0].title}
                      </h2>
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5c4933]">
                        {mainPosts[0].excerpt}
                      </p>
                      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/40">
                        Read Story →
                      </p>
                    </div>
                    <div className="relative min-h-[280px] overflow-hidden bg-[#17120c] lg:min-h-full">
                      <Image
                        src={mainPosts[0].image}
                        alt={mainPosts[0].title}
                        fill
                        className="object-cover opacity-90"
                      />
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid */}
              {gridPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {gridPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <EditorialFooter />
    </>
  );
}

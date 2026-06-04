import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getPostBySlug, getPosts, getPostsByCategory } from "@/lib/posts";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Story | KaboomKlub",
    };
  }

  return {
    title: `${post.title} | KaboomKlub`,
    description: post.excerpt,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getPostsByCategory(post.category.toLowerCase())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">
        <section className="border-b border-[#17120c]">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-16">
            <div className="flex flex-col justify-between gap-10">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/category/${post.category.toLowerCase()}`}
                    className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
                  </Link>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17120c]/45">
                    {post.date}
                    {" // "}
                    {post.readTime}
                  </span>
                </div>

                <h1 className="mt-6 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5c4933]">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-[#17120c]/10 pt-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b3241b] text-sm font-black text-[#f7f3ea]">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide">{post.author}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#17120c]/45">
                    {post.authorRole}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-[#17120c]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover opacity-85"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-6 py-16 sm:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[80px_1fr]">
            <div className="hidden lg:block">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#17120c]/35 [writing-mode:vertical-rl]">
                KaboomKlub
              </p>
            </div>

            <article className="space-y-8 text-lg leading-relaxed text-[#2d241a]">
              <p>
                {post.excerpt} KaboomKlub frames stories like this with a magazine sensibility: bold visuals,
                clear hierarchy, and a strong editorial voice that works across entertainment, Afrobeats, lifestyle,
                and creator culture.
              </p>
              <p>
                The redesigned reading experience gives the headline room to breathe, makes the category context
                instantly visible, and keeps the brand palette and imagery intact while presenting them in a cleaner,
                more polished, publication-style format.
              </p>
              <div className="border-l-4 border-[#b3241b] pl-6">
                <p className="text-2xl font-black uppercase leading-tight tracking-tight text-[#17120c]">
                  &quot;A strong culture site depends on rhythm: better contrast, stronger pacing, and smarter entry points
                  into each story.&quot;
                </p>
              </div>
              <p>
                That same principle carries through the front page, archive, and category pages, helping KaboomKlub
                feel less like a placeholder and more like a destination readers can browse with confidence.
              </p>
            </article>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="border-t border-[#17120c] bg-[#efe6d7]">
            <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-16">
              <div className="flex items-end justify-between gap-6 border-b border-[#17120c] pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                    More {post.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                    Related Stories
                  </h2>
                </div>
                <Link
                  href={`/category/${post.category.toLowerCase()}`}
                  className="text-xs font-black uppercase tracking-[0.2em] text-[#17120c]/60 transition-colors hover:text-[#b3241b]"
                >
                  Open Category
                </Link>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <EditorialFooter />
    </>
  );
}

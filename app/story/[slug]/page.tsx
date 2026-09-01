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

  if (!post) return { title: "Story | KaboomKlub" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.socialImage ? [post.socialImage] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getPostsByCategory(post.category.toLowerCase())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c]">
          <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[1fr_1fr]">

            {/* Left: meta + title */}
            <div className="flex flex-col justify-between gap-8 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${post.category.toLowerCase()}`}
                    className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
                  </Link>
                  {post.contentFormat && (
                    <span className="border border-[#17120c]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#17120c]/55">
                      {post.contentFormat}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-[#5c4933]">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#17120c]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#17120c]/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author + meta */}
              <div className="flex items-center gap-4 border-t border-[#17120c]/10 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b3241b] text-sm font-black text-[#f7f3ea]">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide">{post.author}</p>
                  <p className="text-xs font-medium text-[#17120c]/45">{post.authorRole}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#17120c]/45">{post.date}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#17120c]/35">{post.readTime}</p>
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative min-h-[320px] bg-[#17120c] lg:min-h-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover opacity-90"
              />
              {post.imageCaption && (
                <p className="absolute bottom-3 left-3 right-3 text-[10px] font-medium text-[#f7f3ea]/55">
                  {post.imageCaption}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="mx-auto max-w-[860px] px-6 py-14 sm:px-10 lg:py-20">
          <article className="space-y-7 text-lg leading-[1.75] text-[#2d241a]">
            {post.body && post.body.length > 0 ? (
              post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p>{post.excerpt}</p>
            )}
          </article>

          {/* Share / back */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#17120c]/12 pt-8">
            <Link
              href={`/${post.category.toLowerCase()}`}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors hover:text-[#b3241b]"
            >
              ← More {post.category}
            </Link>
            <div className="flex gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/35">Share:</span>
              <Link
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://kaboomklub.com/story/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black uppercase tracking-[0.18em] text-[#17120c]/50 transition-colors hover:text-[#17120c]"
              >
                X
              </Link>
              <Link
                href={`https://www.instagram.com/kaboomklub/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black uppercase tracking-[0.18em] text-[#17120c]/50 transition-colors hover:text-[#17120c]"
              >
                Instagram
              </Link>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-[#17120c] bg-[#efe6d7]">
            <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: post.categoryColor }}>
                    More {post.category}
                  </p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                    Related Stories
                  </h2>
                </div>
                <Link
                  href={`/${post.category.toLowerCase()}`}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors hover:text-[#b3241b]"
                >
                  All {post.category} →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <EditorialFooter />
    </>
  );
}

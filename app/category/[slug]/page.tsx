import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  if (!category) {
    return {
      title: "Category | KaboomKlub",
    };
  }

  return {
    title: `${category.label} | KaboomKlub`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryMeta(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">
        <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="border-b border-[#17120c] pb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
              Category
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
              {category.label}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c4933]">
              {category.description}
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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

import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import SearchClient from "@/components/SearchClient";
import { getPosts, categories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search KaboomKlub — find stories, artists, topics and more across African music, entertainment, culture and business.",
};

export default async function SearchPage() {
  const allPosts = await getPosts();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-12 text-[#f7f3ea] sm:px-10 sm:py-14 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Find It</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
              Search
            </h1>
            <p className="mt-4 max-w-xl text-base text-[#f7f3ea]/55">
              Search across all KaboomKlub stories, features, music coverage, culture, entertainment and business.
            </p>
          </div>
        </section>

        {/* Search interface */}
        <section className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
          <SearchClient allPosts={allPosts} />
        </section>

        {/* Browse by section */}
        <section className="border-t border-[#17120c]/15 bg-[#efe6d7] px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Browse By Section</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group border border-[#17120c]/12 bg-white p-5 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
                >
                  <div className="mb-2 h-1.5 w-8" style={{ backgroundColor: cat.color }} />
                  <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: cat.color }}>
                    {cat.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5c4933] line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/stories"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors hover:text-[#b3241b]"
              >
                Browse All Stories →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

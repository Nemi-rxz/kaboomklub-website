"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/types/blog";

interface SearchClientProps {
  allPosts: Post[];
}

export default function SearchClient({ allPosts }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { value: "all", label: "All" },
    { value: "music", label: "Music" },
    { value: "entertainment", label: "Entertainment" },
    { value: "culture", label: "Culture" },
    { value: "business", label: "Business" },
    { value: "features", label: "Features" },
  ];

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        post.category.toLowerCase() === activeCategory.toLowerCase();

      if (!term) return matchesCategory;

      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.subcategory,
        post.author,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(term);
    });
  }, [query, activeCategory, allPosts]);

  const hasQuery = query.trim().length > 0;

  return (
    <>
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#17120c]/30"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, artists, topics..."
            autoFocus
            className="w-full border-2 border-[#17120c] bg-white py-4 pl-12 pr-5 text-base font-medium text-[#17120c] outline-none placeholder:text-[#17120c]/30 focus:border-[#b3241b]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#17120c]/40 hover:text-[#17120c]"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              activeCategory === cat.value
                ? "bg-[#17120c] text-[#f7f3ea]"
                : "border border-[#17120c]/20 text-[#17120c]/55 hover:border-[#17120c] hover:text-[#17120c]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results summary */}
      {hasQuery && (
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#17120c]/40">
          {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Results */}
      {hasQuery && results.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-black uppercase text-[#17120c]/30">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-3 text-sm text-[#5c4933]">
            Try different keywords, or browse a section below.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["/music", "/entertainment", "/culture", "/business", "/features"].map((href) => (
              <Link
                key={href}
                href={href}
                className="border border-[#17120c]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#17120c]/55 hover:border-[#17120c] hover:text-[#17120c]"
              >
                {href.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {!hasQuery && (
        <div className="py-12 text-center">
          <p className="text-base font-medium text-[#17120c]/35">
            Start typing to search KaboomKlub stories...
          </p>
        </div>
      )}

      {results.length > 0 && hasQuery && (
        <div className="space-y-0">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/story/${post.slug}`}
              className="group flex gap-5 border-b border-[#17120c]/10 py-6 last:border-0 hover:bg-[#efe6d7]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                  {post.contentFormat && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#17120c]/40">
                      {post.contentFormat}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black uppercase leading-tight transition-colors group-hover:text-[#b3241b]">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5c4933] line-clamp-2">{post.excerpt}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold text-[#17120c]/35">{post.date}</span>
                  <span className="text-[10px] font-bold text-[#17120c]/35">{post.readTime}</span>
                </div>
              </div>
              <span className="shrink-0 self-center text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                Read →
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import MajorHeadline from "@/components/MajorHeadline";
import PostCard from "@/components/PostCard";
import {
  categories,
  getFeaturedPost,
  getLatestPosts,
  getPlaylists,
  getFeaturedArtists,
  getPostsByCategory,
  getTrendingPosts,
  siteConfig,
} from "@/lib/posts";

export default function Home() {
  const featuredPost = getFeaturedPost();
  const latestPosts = getLatestPosts(9).filter((p) => p.slug !== featuredPost.slug);
  const trendingPosts = getTrendingPosts(4).filter((p) => p.slug !== featuredPost.slug).slice(0, 4);
  const musicPosts = getPostsByCategory("music").filter((p) => p.slug !== featuredPost.slug).slice(0, 3);
  const businessPosts = getPostsByCategory("business").slice(0, 3);
  const featuresPosts = getPostsByCategory("features").slice(0, 2);
  const playlists = getPlaylists();
  const featuredArtists = getFeaturedArtists().slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* ── HERO: featured story ── */}
        <MajorHeadline post={featuredPost} />

        {/* ── TRENDING STRIP ── */}
        {trendingPosts.length > 0 && (
          <section className="border-b border-[#17120c] bg-[#17120c] text-[#f7f3ea]">
            <div className="mx-auto flex max-w-[1600px] items-center gap-0 px-6 sm:px-10 lg:px-16">
              <span className="shrink-0 border-r border-[#f7f3ea]/15 py-4 pr-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">
                Trending
              </span>
              <div className="flex flex-1 gap-8 overflow-x-auto py-4 pl-6 trending-scroll">
                {trendingPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/story/${post.slug}`}
                    className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[#f7f3ea]/70 transition-colors hover:text-[#f2c14e]"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CATEGORY NAV STRIP ── */}
        <section className="border-b border-[#17120c]/15">
          <div className="mx-auto flex max-w-[1600px] gap-0 overflow-x-auto px-6 trending-scroll sm:px-10 lg:px-16">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="shrink-0 border-r border-[#17120c]/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.22em] transition-colors hover:text-[#b3241b] last:border-r-0"
                style={{ color: cat.color }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── MAIN CONTENT GRID: Latest + Sidebar ── */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:grid lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-16">

          {/* Latest stories */}
          <div>
            <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Latest</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Stories</h2>
              </div>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors hover:text-[#b3241b]">
                View All →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {latestPosts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="mt-14 lg:mt-0">
            {/* Trending sidebar list */}
            <div className="mb-10 border border-[#17120c]/12 p-6">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Most Read</p>
              {trendingPosts.map((post, i) => (
                <Link key={post.id} href={`/story/${post.slug}`} className="group flex gap-4 border-b border-[#17120c]/10 py-4 last:border-0">
                  <span className="mt-0.5 shrink-0 text-3xl font-black leading-none text-[#17120c]/12 group-hover:text-[#b3241b]/30 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.2em]"
                      style={{ color: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                    <p className="mt-1 text-sm font-black uppercase leading-tight transition-colors group-hover:text-[#b3241b]">
                      {post.title}
                    </p>
                    <p className="mt-1 text-[10px] font-bold text-[#17120c]/40">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter widget */}
            <div className="mb-10 bg-[#17120c] p-6 text-[#f7f3ea]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Newsletter</p>
              <h3 className="mt-3 text-xl font-black uppercase leading-tight">
                {siteConfig.newsletterName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#f7f3ea]/60">
                {siteConfig.newsletterDescription}
              </p>
              <Link
                href="/newsletter"
                className="mt-5 block bg-[#b3241b] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#f2c14e] hover:text-[#17120c]"
              >
                Subscribe Free →
              </Link>
            </div>

            {/* Playlists widget */}
            {playlists.length > 0 && (
              <div className="mb-10 border border-[#17120c]/12 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Playlists</p>
                  <Link href="/playlists" className="text-[10px] font-black uppercase tracking-[0.15em] text-[#17120c]/40 hover:text-[#b3241b]">
                    All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {playlists.slice(0, 3).map((pl) => (
                    <Link
                      key={pl.id}
                      href={pl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1db954]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black uppercase leading-tight transition-colors group-hover:text-[#b3241b]">
                          {pl.title}
                        </p>
                        <p className="text-[10px] text-[#17120c]/40">{pl.cadence}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* ── MUSIC SECTION ── */}
        <section className="border-y border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8 flex items-end justify-between border-b border-[#f7f3ea]/12 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Section</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#f7f3ea] sm:text-4xl">Music</h2>
              </div>
              <Link href="/music" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/40 transition-colors hover:text-[#b3241b]">
                All Music →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {musicPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ARTIST DISCOVERY ── */}
        {featuredArtists.length > 0 && (
          <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Discover</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Artists</h2>
                </div>
                <Link href="/artists" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 transition-colors hover:text-[#b3241b]">
                  All Artists →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredArtists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artists/${artist.slug}`}
                    className="group flex items-center gap-5 border border-[#17120c]/12 p-5 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#17120c] text-2xl font-black text-[#f7f3ea]">
                      {artist.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-black uppercase transition-colors group-hover:text-[#b3241b]">
                        {artist.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#17120c]/55">{artist.genre}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#17120c]/35">{artist.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FEATURES + BUSINESS TWO COLUMNS ── */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-16">
          {/* Features */}
          {featuresPosts.length > 0 && (
            <div>
              <div className="mb-6 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e85d04]">Original</p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Features</h2>
                </div>
                <Link href="/features" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#e85d04]">
                  All →
                </Link>
              </div>
              <div className="space-y-0">
                {featuresPosts.map((post) => (
                  <PostCard key={post.id} post={post} horizontal />
                ))}
              </div>
            </div>
          )}

          {/* Business */}
          {businessPosts.length > 0 && (
            <div className="mt-14 lg:mt-0">
              <div className="mb-6 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a8f6e]">Industry</p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Business</h2>
                </div>
                <Link href="/business" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#1a8f6e]">
                  All →
                </Link>
              </div>
              <div className="space-y-0">
                {businessPosts.map((post) => (
                  <PostCard key={post.id} post={post} horizontal />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── NEWSLETTER FULL-WIDTH BAND ── */}
        <section id="newsletter" className="border-y border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Newsletter</p>
                <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
                  The Kaboomklub Brief
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5c4933]">
                  {siteConfig.newsletterDescription} No spam. No noise. Just the stories that matter.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    className="newsletter-input flex-1 border border-[#17120c] bg-[#17120c] px-5 py-4 text-[11px] font-bold text-[#f7f3ea] outline-none placeholder:text-[#f7f3ea]/40"
                  />
                  <Link
                    href="/newsletter"
                    className="shrink-0 bg-[#b3241b] px-6 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#17120c]"
                  >
                    Subscribe
                  </Link>
                </div>
                <p className="text-[10px] text-[#5c4933]/60">
                  Free. Unsubscribe anytime. Powered by KaboomKlub.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES CTA BAND ── */}
        <section className="border-b border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-6 border border-[#17120c] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Work With Us</p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                  Artists. Brands. Labels.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5c4933]">
                  Brand design, promotional campaigns, playlist pitching, press releases, artist features,
                  digital campaigns, and more. Kaboomklub works with artists, labels, brands and businesses
                  across the creative economy.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/services"
                  className="bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="border border-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
                >
                  Get A Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <EditorialFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import MajorHeadline from "@/components/MajorHeadline";
import { getPostsByCategory, getPlaylists, getFeaturedArtists } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Music",
  description:
    "African music news, Afrobeats, new releases, artist discovery, music business, reviews and the stories shaping the sound of Africa.",
};

const subcategories = [
  "Music News",
  "New Releases",
  "Artist Stories",
  "Emerging Artists",
  "Music Business",
  "Reviews",
  "Afrobeats",
];

export default function MusicPage() {
  const posts = getPostsByCategory("music");
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);
  const playlists = getPlaylists();
  const featuredArtists = getFeaturedArtists().slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Section header */}
        <section className="border-b-[6px] border-[#b3241b] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#b3241b]">KaboomKlub</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Music
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              African music news, Afrobeats, new releases, artist discovery, music business and the records shaping the conversation.
            </p>
            {/* Subcategory tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {subcategories.map((sub) => (
                <span
                  key={sub}
                  className="border border-[#f7f3ea]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/55"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured music story */}
        {featuredPost && <MajorHeadline post={featuredPost} />}

        {/* Music grid */}
        {gridPosts.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">Latest Music Stories</h2>
              <Link href="/stories" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#b3241b]">
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

        {/* Artist discovery strip */}
        {featuredArtists.length > 0 && (
          <section className="border-y border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Discovery</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Artist Spotlight</h2>
                </div>
                <Link href="/artists" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#b3241b]">
                  All Artists →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredArtists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artists/${artist.slug}`}
                    className="group border border-[#17120c]/15 bg-white p-6 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#b3241b] text-2xl font-black text-[#f7f3ea]">
                      {artist.name[0]}
                    </div>
                    <h3 className="text-lg font-black uppercase transition-colors group-hover:text-[#b3241b]">{artist.name}</h3>
                    <p className="mt-1 text-sm text-[#5c4933]">{artist.genre}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#17120c]/40">{artist.location}</p>
                    {artist.latestRelease && (
                      <p className="mt-3 border-t border-[#17120c]/10 pt-3 text-[10px] font-bold text-[#17120c]/50">
                        Latest: {artist.latestRelease}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Playlists strip */}
        {playlists.length > 0 && (
          <section className="px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Listen</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">KaboomKlub Playlists</h2>
                </div>
                <Link href="/playlists" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#b3241b]">
                  All Playlists →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {playlists.map((pl) => (
                  <Link
                    key={pl.id}
                    href={pl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border border-[#17120c]/12 bg-[#17120c] p-6 text-[#f7f3ea] transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#1db954]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black uppercase leading-tight transition-colors group-hover:text-[#f2c14e]">
                      {pl.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#f7f3ea]/55">{pl.description}</p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-wide text-[#f7f3ea]/35">{pl.cadence}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Submit music CTA */}
        <section className="border-t border-[#17120c] bg-[#b3241b] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/60">Artists & Labels</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Submit Your Music
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                Send us your music for consideration across KaboomKlub playlists, editorial features, artist spotlights,
                and press coverage.
              </p>
            </div>
            <Link
              href="/submit"
              className="shrink-0 bg-[#f7f3ea] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
            >
              Submit Music →
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

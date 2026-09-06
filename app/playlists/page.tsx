import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import { getPlaylists } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Playlists",
  description:
    "KaboomKlub playlists — Afrobeats, new music, discovery, mood and genre playlists curated for African music culture.",
};

const playlistTypes = [
  "KaboomKlub Weekly",
  "New Afrobeats",
  "Emerging Artists",
  "Discovery",
  "Night Drive",
  "Mood Playlists",
  "Genre Picks",
];

export default async function PlaylistsPage() {
  const playlists = await getPlaylists();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#1db954]">Listen</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Playlists
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Curated African music playlists — Afrobeats, new releases, emerging artists, and sounds shaping the culture.
              Updated regularly on Spotify.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {playlistTypes.map((t) => (
                <span key={t} className="border border-[#f7f3ea]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/55">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Playlist grid */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          {playlists.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-black uppercase text-[#17120c]/30">Playlists coming soon.</p>
              <Link href="/music" className="mt-6 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                Browse Music →
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 border-b border-[#17120c] pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">
                  {playlists.length} {playlists.length === 1 ? "Playlist" : "Playlists"}
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">KaboomKlub Playlists</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {playlists.map((pl) => (
                  <div key={pl.id} className="flex flex-col border border-[#17120c]/12 bg-[#17120c] text-[#f7f3ea]">
                    {/* Playlist colour block */}
                    <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[#1db954]/20 to-[#17120c] p-8">
                      <div className="flex h-16 w-16 items-center justify-center bg-[#1db954]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </div>
                      <span className="absolute right-4 top-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/40">
                        {pl.platform}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">{pl.cadence}</p>
                      <h3 className="mt-2 text-xl font-black uppercase leading-tight">{pl.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f7f3ea]/60">{pl.description}</p>
                      <Link
                        href={pl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block bg-[#1db954] py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#f7f3ea] hover:text-[#17120c]"
                      >
                        Open on {pl.platform} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Submit music strip */}
        <section className="border-t border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Get Playlisted</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Submit Your Music
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                Artists and labels can submit music for consideration across KaboomKlub&apos;s editorial playlists
                and discovery channels.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/submit"
                className="bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
              >
                Submit Music →
              </Link>
              <Link
                href="/services#playlist-pitching"
                className="border border-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
              >
                Playlist Pitching Service →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getArtists, getDiscoverPosts } from "@/lib/posts";
import PublicImage from "@/components/PublicImage";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Discover African artists — emerging voices, established acts, producers and the people shaping African music.",
};

export default async function ArtistsPage() {
  const artists = await getArtists();
  const discoverPosts = await getDiscoverPosts(3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#b3241b]">Discover</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Artists
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Emerging artists, established acts, producers and the people shaping African music. Discover who
              KaboomKlub is watching.
            </p>
          </div>
        </section>

        {/* Artists grid */}
        <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          {artists.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-black uppercase text-[#17120c]/30">Artist profiles coming soon.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 border-b border-[#17120c] pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">
                  {artists.length} {artists.length === 1 ? "Artist" : "Artists"}
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">KaboomKlub Artists</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artists/${artist.slug}`}
                    className="group flex flex-col border border-[#17120c]/12 transition-all hover:border-[#17120c] hover:shadow-[6px_6px_0px_0px_rgba(23,18,12,1)]"
                  >
                    {/* Artist image / initial block */}
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#17120c]">
                      {artist.image ? (
                        <PublicImage src={artist.image} alt={artist.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform group-hover:scale-105" />
                      ) : (
                        <span className="text-8xl font-black text-[#f7f3ea]/10 transition-all group-hover:text-[#b3241b]/20">
                          {artist.name[0]}
                        </span>
                      )}
                      {artist.featured && (
                        <span className="absolute right-4 top-4 bg-[#b3241b] px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-black uppercase leading-tight transition-colors group-hover:text-[#b3241b]">
                        {artist.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#5c4933]">{artist.genre}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#17120c]/40">{artist.location}</p>
                      <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-[#17120c]/60">{artist.bio}</p>

                      {artist.latestRelease && (
                        <p className="mt-4 border-t border-[#17120c]/10 pt-4 text-[10px] font-bold text-[#17120c]/45">
                          Latest: <span className="font-black text-[#17120c]/70">{artist.latestRelease}</span>
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {artist.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="border border-[#17120c]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#17120c]/45">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                        View Profile →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Discovery posts */}
        {discoverPosts.length > 0 && (
          <section className="border-t border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Artist Stories</h2>
                </div>
                <Link href="/music" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#b3241b]">
                  All Music →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {discoverPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Submit CTA */}
        <section className="border-t border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Artists</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Get Featured on KaboomKlub
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                Submit your music, request an artist spotlight, or pitch an interview. KaboomKlub is always looking
                for the next great African artist to cover.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/submit" className="bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]">
                Submit Music →
              </Link>
              <Link href="/contact?service=artist-spotlight" className="border border-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Request A Spotlight →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

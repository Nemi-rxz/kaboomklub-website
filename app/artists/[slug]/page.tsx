import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getArtistBySlug, getArtists, getPosts } from "@/lib/posts";

type ArtistPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artist | KaboomKlub" };
  return {
    title: `${artist.name} — Artist Profile`,
    description: artist.bio,
    openGraph: { title: artist.name, description: artist.bio },
  };
}

export default async function ArtistProfilePage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  // Get posts that mention the artist by tag or name
  const relatedPosts = (await getPosts())
    .filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes(artist.name.toLowerCase())) ||
      p.title.toLowerCase().includes(artist.name.toLowerCase())
    )
    .slice(0, 3);

  const socialPlatforms = Object.entries(artist.socialLinks).filter(([, v]) => v);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Artist hero */}
        <section className="border-b border-[#17120c] bg-[#17120c] text-[#f7f3ea]">
          <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[1fr_1fr]">

            {/* Left: artist info */}
            <div className="flex flex-col justify-between gap-8 px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
              <div>
                <Link
                  href="/artists"
                  className="text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f3ea]/40 transition-colors hover:text-[#b3241b]"
                >
                  ← Artists
                </Link>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#b3241b]">Artist Profile</p>
                <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                  {artist.name}
                </h1>
                <p className="mt-3 text-base font-medium text-[#f7f3ea]/55">{artist.genre}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/35">{artist.location}</p>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">{artist.bio}</p>

                {artist.latestRelease && (
                  <div className="mt-6 border border-[#f7f3ea]/15 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#f2c14e]">Latest Release</p>
                    <p className="mt-2 text-base font-black uppercase">{artist.latestRelease}</p>
                  </div>
                )}
              </div>

              {/* Social links */}
              {socialPlatforms.length > 0 && (
                <div className="border-t border-[#f7f3ea]/10 pt-6">
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/35">Follow</p>
                  <div className="flex flex-wrap gap-3">
                    {socialPlatforms.map(([platform, href]) => (
                      <Link
                        key={platform}
                        href={href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#f7f3ea]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/60 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: artist visual */}
            <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-[#b3241b]/20 to-[#080b10] lg:min-h-full">
              <span className="text-[200px] font-black leading-none text-[#f7f3ea]/5 select-none">
                {artist.name[0]}
              </span>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex flex-wrap gap-2">
                  {artist.tags.map((tag) => (
                    <span key={tag} className="border border-[#f7f3ea]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#f7f3ea]/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KaboomKlub coverage */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Coverage</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                KaboomKlub on {artist.name}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length === 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-16">
            <div className="border border-[#17120c]/12 p-10 text-center">
              <p className="text-base font-black uppercase text-[#17120c]/30">
                No stories yet — check back soon.
              </p>
              <Link href="/music" className="mt-4 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">
                Browse Music →
              </Link>
            </div>
          </section>
        )}

        {/* Feature this artist CTA */}
        <section className="border-t border-[#17120c] bg-[#b3241b] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f3ea]/60">Artists</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Get Your Story Told
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/70">
                KaboomKlub produces artist spotlights, interviews, and editorial features for emerging and
                established African artists.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact?service=artist-spotlight" className="shrink-0 bg-[#f7f3ea] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]">
                Request A Feature →
              </Link>
              <Link href="/submit" className="shrink-0 border border-[#f7f3ea]/30 px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:border-[#f7f3ea] hover:bg-[#f7f3ea] hover:text-[#b3241b]">
                Submit Music →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

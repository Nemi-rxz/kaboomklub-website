import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import MajorHeadline from "@/components/MajorHeadline";
import PostCard from "@/components/PostCard";
import { categories, getFeaturedPost, getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  const featuredPost = getFeaturedPost();
  const latestPosts = posts.filter((post) => post.slug !== featuredPost.slug);
  const musicPosts = posts.filter((post) => post.category === "MUSIC").slice(0, 3);

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">
        <section className="border-b border-[#17120c] bg-[#080b10] text-[#f7f3ea]">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f2c14e]">
                  @kaboomklub
                </p>
                <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
                  Music, culture, playlists, and regular updates.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/72">
                  KaboomKlub is a DJ and culture page focused on music, entertainment, playlists, P.R, publicity,
                  and simple regular content that also works well as a website archive.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-4">
                  <p className="text-3xl font-black">197</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f7f3ea]/55">Posts</p>
                </div>
                <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-4">
                  <p className="text-3xl font-black">210</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f7f3ea]/55">Followers</p>
                </div>
                <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-4">
                  <p className="text-3xl font-black">2</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f7f3ea]/55">Following</p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-medium text-[#f7f3ea]/82">
                <p>DJ</p>
                <p>For the music</p>
                <p>Playlists | P.R | Publicity</p>
                <p className="text-[#f2c14e]">@9ja.lifestyle</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.instagram.com/kaboomklub/"
                  className="bg-[#f7f3ea] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#080b10] transition-colors hover:bg-[#f2c14e]"
                >
                  Open Instagram
                </Link>
                <Link
                  href="https://open.spotify.com/"
                  className="border border-[#f7f3ea]/25 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Open Spotify
                </Link>
              </div>
            </div>

            <div className="grid gap-6 self-start sm:grid-cols-2">
              <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Highlights</p>
                <h2 className="mt-3 text-2xl font-black uppercase">Services</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#f7f3ea]/70">
                  DJ sets, playlists, P.R, publicity, and regular music culture support.
                </p>
              </div>
              <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Highlights</p>
                <h2 className="mt-3 text-2xl font-black uppercase">Playlists</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#f7f3ea]/70">
                  Easy playlist access and music-driven content connected to the KaboomKlub page.
                </p>
              </div>
              <div className="rounded-sm border border-[#f7f3ea]/12 bg-[#121821] p-6 sm:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f2c14e]">Main Topics</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="border border-[#f7f3ea]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f7f3ea]/80 transition-colors hover:border-[#f2c14e] hover:text-[#f2c14e]"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MajorHeadline post={featuredPost} />

        <section className="border-b border-[#17120c] bg-[#17120c] text-[#f7f3ea]">
          <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-5 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f2c14e]">
              Feed
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {musicPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/story/${post.slug}`}
                  className="text-sm font-bold uppercase tracking-wide text-[#f7f3ea]/80 transition-colors hover:text-[#f2c14e]"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="flex items-end justify-between gap-6 border-b border-[#17120c] pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                Latest Posts
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                Instagram-Led Updates
              </h2>
            </div>
            <Link
              href="/stories"
              className="text-xs font-black uppercase tracking-[0.2em] text-[#17120c]/60 transition-colors hover:text-[#b3241b]"
            >
              View All
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-[#17120c] bg-[#efe6d7]">
          <div className="mx-auto grid max-w-[1600px] gap-8 px-6 py-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
            <div className="border border-[#17120c] bg-white p-8 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b3241b]">
                About KaboomKlub
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                One page, regular content, easy control.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5c4933]">
                The homepage now follows the Instagram direction more closely: dark profile-led intro, visual content
                cards, simple sections, and regular topics that are easy to update from a single content file.
              </p>
            </div>

            <div className="border border-[#17120c] bg-[#17120c] p-8 text-[#f7f3ea] sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f2c14e]">
                Links
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Keep it connected.
              </h2>
              <div className="mt-8 space-y-4">
                <Link
                  href="https://www.instagram.com/kaboomklub/"
                  className="block border border-[#f7f3ea]/20 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Instagram
                </Link>
                <Link
                  href="https://open.spotify.com/"
                  className="block border border-[#f7f3ea]/20 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Spotify
                </Link>
                <Link
                  href="/category/services"
                  className="block border border-[#f7f3ea]/20 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:border-[#f2c14e] hover:text-[#f2c14e]"
                >
                  Services
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

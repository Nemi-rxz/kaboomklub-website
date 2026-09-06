import type { Metadata } from "next";
import Link from "next/link";
import EditorialFooter from "@/components/EditorialFooter";
import EditorialNavbar from "@/components/EditorialNavbar";
import PostCard from "@/components/PostCard";
import { getPostsByContentFormat, getPostsByCategory, getVideos } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Video",
  description:
    "KaboomKlub video content — artist interviews, music features, event coverage, and multimedia from across African music and culture.",
};

const videoFormats = [
  "Artist Interviews",
  "Music Features",
  "Event Coverage",
  "Short Documentaries",
  "Behind the Scenes",
  "Artist Performances",
  "Culture Features",
  "Industry Conversations",
];

export default async function VideoPage() {
  // Surface interview and feature posts as "video-adjacent" editorial content
  const interviews = (await getPostsByContentFormat("Interview")).slice(0, 3);
  const featurePosts = (await getPostsByCategory("features")).slice(0, 3);
  const videos = await getVideos();

  return (
    <>
      <EditorialNavbar />
      <main className="bg-[#f7f3ea] text-[#17120c]">

        {/* Header */}
        <section className="border-b border-[#17120c] bg-[#080b10] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f2c14e]">Multimedia</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-[120px]">
              Video
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f7f3ea]/60">
              Artist interviews, music features, event coverage, short documentaries and multimedia from across
              African music and culture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {videoFormats.map((f) => (
                <span key={f} className="border border-[#f7f3ea]/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f7f3ea]/50">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* YouTube CTA */}
        <section className="border-b border-[#17120c] bg-[#17120c] px-6 py-14 text-[#f7f3ea] sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Watch</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                KaboomKlub on YouTube
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7f3ea]/60">
                Original video content, artist interviews, and multimedia features — watch everything on the
                KaboomKlub YouTube channel.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="https://www.youtube.com/@kaboomklub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#ff0000] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#cc0000]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch on YouTube →
              </Link>
              <Link
                href="https://www.instagram.com/kaboomklub/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-[#f7f3ea]/20 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]/70 transition-all hover:border-[#f2c14e] hover:text-[#f2c14e]"
              >
                Instagram Reels →
              </Link>
            </div>
          </div>
        </section>

        {videos.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 border-b border-[#17120c] pb-4"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Published</p><h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Latest Videos</h2></div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{videos.map((video) => <a key={video.id} href={video.videoUrl || video.embedUrl} target="_blank" rel="noopener noreferrer" className="group border border-[#17120c]/12 p-5 transition-all hover:border-[#17120c] hover:shadow-[4px_4px_0px_0px_rgba(23,18,12,1)]"><div className="aspect-video overflow-hidden bg-[#17120c]"><img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" /></div><p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#b3241b]">{video.platform}</p><h3 className="mt-2 text-lg font-black uppercase leading-tight group-hover:text-[#b3241b]">{video.title}</h3><p className="mt-2 line-clamp-2 text-sm text-[#5c4933]">{video.description}</p></a>)}</div>
          </section>
        )}

        {/* Video-adjacent content */}
        {interviews.length > 0 && (
          <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mb-8 border-b border-[#17120c] pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Interviews & Features</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {interviews.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {featurePosts.length > 0 && (
          <section className="border-t border-[#17120c] bg-[#efe6d7] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#17120c] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e85d04]">Original</p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Original Features</h2>
                </div>
                <Link href="/features" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17120c]/50 hover:text-[#e85d04]">
                  All Features →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featurePosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Coming soon notice + collaborate */}
        <section className="border-t border-[#17120c] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-[1600px] grid gap-8 border border-[#17120c] p-8 lg:grid-cols-[1fr_auto] lg:items-center sm:p-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f2c14e]">Video Production</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Video Collaborations
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4933]">
                KaboomKlub produces original video content — artist interviews, event coverage, music features and
                short documentaries. Contact us to discuss a collaboration.
              </p>
            </div>
            <Link
              href="/contact?type=video"
              className="shrink-0 bg-[#17120c] px-8 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea] transition-all hover:bg-[#b3241b]"
            >
              Collaborate With Us →
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </>
  );
}

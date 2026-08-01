import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/blog";

export default function PostCard({ post, horizontal = false }: { post: Post, horizontal?: boolean }) {
  if (horizontal) {
    return (
      <Link href={`/story/${post.slug}`} className="group block">
        <article className="flex gap-4 border-b border-[#17120c]/10 py-6 last:border-0">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-[#17120c]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b3241b]">
              {post.category}
            </span>
            <h3 className="mt-2 text-base font-black leading-tight uppercase transition-colors group-hover:text-[#b3241b]">
              {post.title}
            </h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#17120c]/40">
              {post.date}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/story/${post.slug}`} className="group flex flex-col overflow-hidden border border-[#17120c]/15 bg-[#17120c] transition-all hover:border-[#17120c] hover:shadow-[8px_8px_0px_0px_rgba(23,18,12,1)]">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#17120c]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/55 to-transparent" />
          <div className="absolute left-3 top-3">
            <span className="bg-[#17120c]/70 px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#f4efe5]">
              Kaboom
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f2c14e]">
              {post.category}
            </p>
            <h3 className="mt-2 text-2xl font-black leading-[1.05] tracking-tight text-[#f7f3ea] transition-colors group-hover:text-[#f2c14e]">
              {post.title}
            </h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7f3ea]/60">
                {post.date}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f7f3ea]">
                Open +
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/blog";

export default function PostCard({ post, horizontal = false }: { post: Post, horizontal?: boolean }) {
  if (horizontal) {
    return (
      <Link href={`/story/${post.slug}`} className="group block">
        <article className="flex gap-6 py-6 border-b border-[#17120c]/10 last:border-0">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#17120c]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#b3241b]">
              {post.category}
            </span>
            <h3 className="mt-2 text-lg font-black leading-tight group-hover:text-[#b3241b] transition-colors">
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
    <Link href={`/story/${post.slug}`} className="group flex flex-col border border-[#17120c]/15 bg-white transition-all hover:border-[#17120c] hover:shadow-[8px_8px_0px_0px_rgba(23,18,12,1)]">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#17120c]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#17120c] px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#f7f3ea]">
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-black leading-[1.1] tracking-tight group-hover:text-[#b3241b] transition-colors">
            {post.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#5c4933] line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#17120c]/40">
              {post.date}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#17120c]">
              READ +
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

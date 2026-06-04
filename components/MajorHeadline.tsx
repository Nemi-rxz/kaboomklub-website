import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/blog";

export default function MajorHeadline({ post }: { post: Post }) {
  return (
    <section className="grid min-h-[52vh] grid-cols-1 border-b border-[#17120c] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-[300px] overflow-hidden bg-[#17120c] lg:min-h-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-[center_28%] opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120c]/70 to-transparent lg:hidden" />
      </div>

      <div className="flex flex-col justify-center bg-[#f7f3ea] p-8 sm:p-10 lg:p-14">
        <div className="mb-6 flex items-center gap-4">
          <span
            className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
            style={{ backgroundColor: post.categoryColor }}
          >
            {post.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#17120c]/50">
            {post.date}
            {" // "}
            {post.readTime}
          </span>
        </div>

        <Link href={`/story/${post.slug}`} className="group">
          <h1 className="text-4xl font-black leading-[0.92] tracking-tighter transition-colors group-hover:text-[#b3241b] sm:text-6xl lg:text-7xl">
            {post.title}
          </h1>
        </Link>
        
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4b3b2a] lg:text-xl">
          {post.excerpt}
        </p>

        <div className="mt-6">
          <Link
            href={`/story/${post.slug}`}
            className="inline-flex items-center gap-3 border border-[#17120c] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-[#17120c] hover:text-[#f7f3ea]"
          >
            Read Feature
            <span aria-hidden="true">+</span>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-[#17120c]/10 pt-6">
          <div className="h-12 w-12 bg-[#b3241b] rounded-full flex items-center justify-center text-[#f7f3ea] font-black text-xs">
            {post.author[0]}
          </div>
          <div>
            <p className="text-sm font-black uppercase">{post.author}</p>
            <p className="text-xs text-[#17120c]/60 font-medium">{post.authorRole}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

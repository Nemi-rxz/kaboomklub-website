import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { PostModel } from "@/lib/models/Post";
import PostForm from "../PostForm";
import { requireSession } from "@/lib/session";

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connection();
  await requireSession();
  await connectDB();
  const post = await PostModel.findById(id).lean();
  if (!post) notFound();
  const values = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body.join("\n\n"),
    category: post.category,
    contentFormat: post.contentFormat,
    priority: post.priority,
    status: post.status,
    tags: post.tags.join(", "),
    image: post.image,
    socialImage: post.socialImage,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    author: post.author,
    authorRole: post.authorRole,
    readTime: post.readTime,
    featured: post.featured,
  };
  return <div className="p-8 text-white"><div className="mb-8 flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial CMS</p><h1 className="mt-2 text-3xl font-black uppercase">Edit Story</h1></div><Link href="/admin/content" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Back to content</Link></div><PostForm id={id} post={values} /></div>;
}
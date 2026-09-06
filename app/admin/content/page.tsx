import Link from "next/link";
import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { PostModel } from "@/lib/models/Post";
import { deletePostAction, togglePostStatusAction } from "@/lib/actions/posts";
import StatusBadge from "@/components/admin/StatusBadge";
import { requireSession } from "@/lib/session";

export default async function ContentPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; category?: string }> }) {
  const params = await searchParams;
  await connection();
  await requireSession();
  await connectDB();
  const query: Record<string, unknown> = {};
  if (params.q) query.title = { $regex: params.q, $options: "i" };
  if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(params.status ?? "")) query.status = params.status;
  if (["MUSIC", "ENTERTAINMENT", "CULTURE", "BUSINESS", "FEATURES"].includes(params.category ?? "")) query.category = params.category;
  const posts = await PostModel.find(query).sort({ updatedAt: -1 }).lean();

  return <div className="p-8 text-white">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial CMS</p><h1 className="mt-2 text-3xl font-black uppercase">Content</h1></div><Link href="/admin/content/new" className="bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em]">New Story +</Link></div>
    <form className="mb-6 grid gap-3 sm:grid-cols-[1fr_180px_180px_auto]" method="get"><input name="q" defaultValue={params.q} placeholder="Search stories" className="border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white outline-none focus:border-[#b3241b]" /><select name="status" defaultValue={params.status ?? ""} className="border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white"><option value="">All statuses</option><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select><select name="category" defaultValue={params.category ?? ""} className="border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white"><option value="">All categories</option><option>MUSIC</option><option>ENTERTAINMENT</option><option>CULTURE</option><option>BUSINESS</option><option>FEATURES</option></select><button className="border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em]">Filter</button></form>
    <div className="overflow-x-auto border border-white/10 bg-[#111]"><table className="w-full text-left text-sm"><thead><tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.15em] text-white/40"><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Format</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Priority</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{posts.map((post) => <tr key={String(post._id)} className="border-b border-white/5"><td className="px-4 py-3 font-bold text-white"><Link href={`/admin/content/${post._id}`} className="hover:text-[#f2c14e]">{post.title}</Link></td><td className="px-4 py-3 text-white/60">{post.category}</td><td className="px-4 py-3 text-white/60">{post.contentFormat ?? "-"}</td><td className="px-4 py-3"><StatusBadge status={post.status} /></td><td className="px-4 py-3 text-white/60">{post.priority}</td><td className="px-4 py-3 text-white/40">{post.date || post.createdAt.toLocaleDateString()}</td><td className="px-4 py-3"><div className="flex gap-3 text-[10px] font-bold uppercase tracking-[0.1em]"><Link href={`/admin/content/${post._id}`} className="text-[#f2c14e]">Edit</Link><form action={deletePostAction.bind(null, String(post._id))}><button className="text-[#b3241b]">Delete</button></form><form action={togglePostStatusAction.bind(null, String(post._id), post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")}><button className="text-white/60">{post.status === "PUBLISHED" ? "Unpublish" : "Publish"}</button></form></div></td></tr>)}</tbody></table>{posts.length === 0 && <p className="p-10 text-center text-sm text-white/30">No stories match these filters.</p>}</div>
  </div>;
}
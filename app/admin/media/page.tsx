import { connectDB } from "@/lib/db";
import { connection } from "next/server";
import { MediaModel } from "@/lib/models/Media";
import { deleteMediaAction } from "@/lib/actions/media";
import MediaUploader from "./MediaUploader";
import { requireSession } from "@/lib/session";

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  await connection();
  await requireSession();
  await connectDB();
  const query = q ? { $or: [{ originalFilename: { $regex: q, $options: "i" } }, { tags: { $regex: q, $options: "i" } }] } : {};
  const media = await MediaModel.find(query).sort({ createdAt: -1 }).lean();
  return <div className="p-8 text-white"><div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Asset Manager</p><h1 className="mt-2 text-3xl font-black uppercase">Media Library</h1></div><MediaUploader /><form className="my-6 flex gap-3"><input name="q" defaultValue={q} placeholder="Search filenames" className="w-full max-w-md border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white outline-none" /><button className="border border-white/20 px-4 text-[10px] font-black uppercase tracking-[0.15em]">Search</button></form><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{media.map((item) => <div key={String(item._id)} className="overflow-hidden border border-white/10 bg-[#111]"><img src={item.thumbnailUrl || item.url} alt={item.originalFilename} className="aspect-[4/3] w-full object-cover" /><div className="space-y-2 p-4"><p className="truncate text-xs font-bold text-white">{item.originalFilename}</p><p className="text-[10px] text-white/40">{new Date(item.createdAt).toLocaleDateString()} · {item.format.toUpperCase()}</p><form action={deleteMediaAction.bind(null, String(item._id))}><button className="text-[10px] font-black uppercase tracking-[0.15em] text-[#b3241b]">Delete</button></form></div></div>)}</div>{media.length === 0 && <p className="py-12 text-center text-sm text-white/30">No media uploaded yet.</p>}</div>;
}
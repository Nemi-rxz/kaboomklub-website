import { connectDB } from "@/lib/db";
import { connection } from "next/server";
import { MediaModel } from "@/lib/models/Media";
import { deleteMediaAction } from "@/lib/actions/media";
import MediaUploader from "./MediaUploader";
import { requireSession } from "@/lib/session";

const PAGE_SIZE = 24;

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page: pageRaw } = await searchParams;
  const page = Math.max(1, Number(pageRaw) || 1);
  const skip = Math.max(0, (page - 1) * PAGE_SIZE);
  await connection();
  await requireSession();
  await connectDB();
  const query = q ? { $or: [{ originalFilename: { $regex: q, $options: "i" } }, { tags: { $regex: q, $options: "i" } }] } : {};
  const [items, total] = await Promise.all([
    MediaModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(PAGE_SIZE).lean(),
    MediaModel.countDocuments(query),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = total === 0 ? 0 : skip + 1;
  const end = Math.min(skip + PAGE_SIZE, total);
  const hrefBase = (p: number) => `?${new URLSearchParams({ ...(q ? { q } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString()}`;
  return <div className="p-8 text-white">
    <div className="mb-8">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Asset Manager</p>
      <h1 className="mt-2 text-3xl font-black uppercase">Media Library</h1>
    </div>
    <MediaUploader />
    <div className="my-6 flex flex-wrap items-center gap-3">
      <form className="flex gap-3">
        {q && <input type="hidden" name="q" value={q} />}
        <input name="q" defaultValue={q} placeholder="Search filenames or tags" className="w-full max-w-md border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white outline-none" />
        <button className="border border-white/20 px-4 text-[10px] font-black uppercase tracking-[0.15em]">Search</button>
      </form>
      <div className="ml-auto text-xs text-white/40">Showing {start}–{end} of {total}</div>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => <div key={String(item._id)} className="overflow-hidden border border-white/10 bg-[#111]">
        <img src={item.thumbnailUrl || item.url} alt={item.originalFilename} className="aspect-[4/3] w-full object-cover" loading="lazy" />
        <div className="space-y-2 p-4">
          <p className="truncate text-xs font-bold text-white">{item.originalFilename}</p>
          <p className="text-[10px] text-white/40">{new Date(item.createdAt).toLocaleDateString()} · {item.format?.toUpperCase?.() ?? ""}
            {Array.isArray(item.tags) && item.tags.length > 0 && <> · {item.tags.slice(0, 3).join(", ")}</>}
          </p>
          <form action={deleteMediaAction.bind(null, String(item._id))}>
            <button className="text-[10px] font-black uppercase tracking-[0.15em] text-[#b3241b]">Delete</button>
          </form>
        </div>
      </div>)}
    </div>
    {items.length === 0 && <p className="py-12 text-center text-sm text-white/30">No media uploaded yet.</p>}
    {(page > 1 || page < totalPages) && <div className="mt-8 flex items-center justify-between text-xs">
      {page > 1 ? <a href={hrefBase(page - 1)} className="border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em]">← Previous</a> : <span />}
      <span className="text-white/40">Page {page} of {totalPages}</span>
      {page < totalPages ? <a href={hrefBase(page + 1)} className="border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em]">Next →</a> : <span />}
    </div>}
  </div>;
}
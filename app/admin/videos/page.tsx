import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { VideoModel } from "@/lib/models/Video";
import { deleteVideoAction } from "@/lib/actions/videos";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";
export default async function VideosAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; await connection(); await requireSession(); await connectDB(); const rows = await VideoModel.find(q ? { title: { $regex: q, $options: "i" } } : {}).sort({ createdAt: -1 }).lean(); return <CrudList title="Videos" eyebrow="Multimedia" createHref="/admin/videos/new" editBase="/admin/videos" search={q} rows={rows as unknown as Record<string, unknown>[]} columns={[{ key: "title", label: "Title" }, { key: "platform", label: "Platform" }, { key: "category", label: "Category" }, { key: "status", label: "Status" }]} deleteAction={deleteVideoAction} />; }
import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { PlaylistModel } from "@/lib/models/Playlist";
import { deletePlaylistAction } from "@/lib/actions/playlists";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";

export default async function PlaylistsAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; await connection(); await requireSession(); await connectDB(); const rows = await PlaylistModel.find(q ? { title: { $regex: q, $options: "i" } } : {}).sort({ createdAt: -1 }).lean(); return <CrudList title="Playlists" eyebrow="Programming" createHref="/admin/playlists/new" editBase="/admin/playlists" search={q} rows={rows as unknown as Record<string, unknown>[]} columns={[{ key: "title", label: "Title" }, { key: "platform", label: "Platform" }, { key: "cadence", label: "Cadence" }, { key: "status", label: "Status" }]} deleteAction={deletePlaylistAction} />; }
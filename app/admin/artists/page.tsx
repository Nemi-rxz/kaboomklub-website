import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { ArtistModel } from "@/lib/models/Artist";
import { deleteArtistAction } from "@/lib/actions/artists";
import { requireSession } from "@/lib/session";
import CrudList from "../shared/CrudList";

export default async function ArtistsAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams; await connection(); await requireSession(); await connectDB();
  const rows = await ArtistModel.find(q ? { name: { $regex: q, $options: "i" } } : {}).sort({ createdAt: -1 }).lean();
  return <CrudList title="Artists" eyebrow="Talent Directory" createHref="/admin/artists/new" editBase="/admin/artists" search={q} rows={rows as unknown as Record<string, unknown>[]} columns={[{ key: "name", label: "Name" }, { key: "genre", label: "Genre" }, { key: "location", label: "Location" }, { key: "status", label: "Status" }]} deleteAction={deleteArtistAction} />;
}
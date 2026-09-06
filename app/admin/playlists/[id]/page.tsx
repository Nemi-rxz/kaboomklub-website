import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { PlaylistModel } from "@/lib/models/Playlist";
import { savePlaylistAction } from "@/lib/actions/playlists";
import { requireSession } from "@/lib/session";
import CrudForm from "../../shared/CrudForm";

const fields = [{ name: "title", label: "Title", required: true }, { name: "slug", label: "Slug" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "platform", label: "Platform" }, { name: "href", label: "Playlist URL" }, { name: "image", label: "Cover Image URL" }, { name: "cadence", label: "Update Cadence" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }, { name: "featured", label: "Featured", type: "checkbox" as const }];

export default async function EditPlaylistPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const playlist = await PlaylistModel.findById(id).lean(); if (!playlist) notFound(); const values = { title: playlist.title, slug: playlist.slug, description: playlist.description, platform: playlist.platform, href: playlist.href, image: playlist.image, cadence: playlist.cadence, status: playlist.status, featured: playlist.featured }; return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">Edit Playlist</h1><Link href="/admin/playlists" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={id} action={savePlaylistAction} fields={fields} values={values} submitLabel="Save Playlist" /></div>; }
import Link from "next/link";
import CrudForm from "../../shared/CrudForm";
import { savePlaylistAction } from "@/lib/actions/playlists";

const fields = [{ name: "title", label: "Title", required: true }, { name: "slug", label: "Slug" }, { name: "description", label: "Description", type: "textarea" as const }, { name: "platform", label: "Platform" }, { name: "href", label: "Playlist URL" }, { name: "image", label: "Cover Image", type: "image" as const, allowNone: true }, { name: "cadence", label: "Update Cadence" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }, { name: "featured", label: "Featured", type: "checkbox" as const }];

export default function NewPlaylistPage() { return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">New Playlist</h1><Link href="/admin/playlists" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={null} action={savePlaylistAction} fields={fields} submitLabel="Save Playlist" /></div>; }
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ArtistModel } from "@/lib/models/Artist";
import { saveArtistAction } from "@/lib/actions/artists";
import { requireSession } from "@/lib/session";
import CrudForm from "../../shared/CrudForm";

const fields = [{ name: "name", label: "Name", required: true }, { name: "slug", label: "Slug" }, { name: "bio", label: "Bio", type: "textarea" as const }, { name: "genre", label: "Genre" }, { name: "location", label: "Location" }, { name: "image", label: "Artist Photo", type: "image" as const, allowNone: true }, { name: "latestRelease", label: "Latest Release" }, { name: "instagram", label: "Instagram" }, { name: "spotify", label: "Spotify" }, { name: "youtube", label: "YouTube" }, { name: "twitter", label: "Twitter" }, { name: "tiktok", label: "TikTok" }, { name: "tags", label: "Tags" }, { name: "status", label: "Status", type: "select" as const, options: ["DRAFT", "PUBLISHED", "ARCHIVED"] }, { name: "featured", label: "Featured", type: "checkbox" as const }];

export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; await connection(); await requireSession(); await connectDB(); const artist = await ArtistModel.findById(id).lean(); if (!artist) notFound(); const values = { name: artist.name, slug: artist.slug, bio: artist.bio, genre: artist.genre, location: artist.location, image: artist.image, latestRelease: artist.latestRelease, tags: artist.tags.join(", "), instagram: artist.socialLinks?.instagram, spotify: artist.socialLinks?.spotify, youtube: artist.socialLinks?.youtube, twitter: artist.socialLinks?.twitter, tiktok: artist.socialLinks?.tiktok, status: artist.status, featured: artist.featured }; return <div className="p-8 text-white"><div className="mb-8 flex justify-between"><h1 className="text-3xl font-black uppercase">Edit Artist</h1><Link href="/admin/artists" className="text-xs uppercase text-white/50">Back</Link></div><CrudForm id={id} action={saveArtistAction} fields={fields} values={values} submitLabel="Save Artist" /></div>; }
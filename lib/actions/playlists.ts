"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { PlaylistModel } from "@/lib/models/Playlist";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const Schema = z.object({
  title: z.string().min(1, "Title required"),
  slug: z.string().optional(),
  description: z.string().default(""),
  platform: z.string().default("Spotify"),
  href: z.string().default(""),
  image: z.string().default("/kaboom-logo.jpg"),
  cadence: z.string().default("Updated Regularly"),
  featured: z.string().optional(),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type PlaylistFormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function savePlaylistAction(id: string | null, _prev: PlaylistFormState, formData: FormData): Promise<PlaylistFormState> {
  await requireSession();
  const parsed = Schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  const d = parsed.data;
  const slug = d.slug?.trim() || slugify(d.title);
  await connectDB();
  const doc = { slug, title: d.title, description: d.description, platform: d.platform, href: d.href, image: d.image || "/kaboom-logo.jpg", cadence: d.cadence, featured: d.featured === "true" || d.featured === "on", status: d.status };
  if (id && id !== "new") await PlaylistModel.findByIdAndUpdate(id, doc);
  else await PlaylistModel.create(doc);
  revalidatePath("/playlists");
  redirect("/admin/playlists");
}

export async function deletePlaylistAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await PlaylistModel.findByIdAndDelete(id);
  revalidatePath("/playlists");
}

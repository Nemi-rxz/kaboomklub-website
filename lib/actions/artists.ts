"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ArtistModel } from "@/lib/models/Artist";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

const ArtistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  bio: z.string().default(""),
  genre: z.string().default(""),
  location: z.string().default(""),
  image: z.string().default(""),
  latestRelease: z.string().optional(),
  instagram: z.string().default(""),
  spotify: z.string().default(""),
  youtube: z.string().default(""),
  twitter: z.string().default(""),
  tiktok: z.string().default(""),
  tags: z.string().default(""),
  featured: z.string().optional(),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type ArtistFormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function saveArtistAction(
  id: string | null,
  _prev: ArtistFormState,
  formData: FormData
): Promise<ArtistFormState> {
  await requireSession();
  const raw = Object.fromEntries(formData.entries());
  const parsed = ArtistSchema.safeParse(raw);
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };

  const d = parsed.data;
  const slug = d.slug?.trim() || slugify(d.name);
  const tags = d.tags.split(",").map((t) => t.trim()).filter(Boolean);

  await connectDB();
  const doc = {
    slug, name: d.name, bio: d.bio, genre: d.genre, location: d.location,
    image: d.image,
    latestRelease: d.latestRelease || undefined,
    socialLinks: { instagram: d.instagram, spotify: d.spotify, youtube: d.youtube, twitter: d.twitter, tiktok: d.tiktok },
    tags, featured: d.featured === "true" || d.featured === "on", status: d.status,
  };

  if (id && id !== "new") await ArtistModel.findByIdAndUpdate(id, doc);
  else await ArtistModel.create(doc);

  revalidatePath("/artists");
  redirect("/admin/artists");
}

export async function deleteArtistAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await ArtistModel.findByIdAndDelete(id);
  revalidatePath("/artists");
}

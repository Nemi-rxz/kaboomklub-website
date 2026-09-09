"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { VideoModel } from "@/lib/models/Video";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const Schema = z.object({
  title: z.string().min(1, "Title required"),
  slug: z.string().optional(),
  description: z.string().default(""),
  thumbnail: z.string().default(""),
  platform: z.enum(["YouTube", "Instagram", "TikTok", "Other"]).default("YouTube"),
  videoUrl: z.string().default(""),
  embedUrl: z.string().default(""),
  category: z.string().default("FEATURES"),
  relatedArtist: z.string().optional(),
  featured: z.string().optional(),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type VideoFormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function saveVideoAction(id: string | null, _prev: VideoFormState, formData: FormData): Promise<VideoFormState> {
  await requireSession();
  const parsed = Schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  const d = parsed.data;
  const slug = d.slug?.trim() || slugify(d.title);
  await connectDB();
  const doc = { slug, title: d.title, description: d.description, thumbnail: d.thumbnail, platform: d.platform, videoUrl: d.videoUrl, embedUrl: d.embedUrl, category: d.category, relatedArtist: d.relatedArtist || undefined, featured: d.featured === "true" || d.featured === "on", status: d.status };
  if (id && id !== "new") await VideoModel.findByIdAndUpdate(id, doc);
  else await VideoModel.create(doc);
  revalidatePath("/videos");
  redirect("/admin/videos");
}

export async function deleteVideoAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await VideoModel.findByIdAndDelete(id);
  revalidatePath("/videos");
}

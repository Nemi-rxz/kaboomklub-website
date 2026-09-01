"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { PostModel } from "@/lib/models/Post";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().default(""),
  body: z.string().default(""),   // newline-separated paragraphs
  category: z.enum(["MUSIC", "ENTERTAINMENT", "CULTURE", "BUSINESS", "FEATURES"]),
  subcategory: z.string().default(""),
  contentFormat: z.string().optional(),
  author: z.string().default("KABOOMKLUB TEAM"),
  authorRole: z.string().default("Editorial Desk"),
  readTime: z.string().default("3 MIN READ"),
  image: z.string().default("/kaboom-logo.jpg"),
  imageCaption: z.string().default(""),
  priority: z.enum(["MAJOR", "SECONDARY", "SIDEBAR"]).default("SECONDARY"),
  featured: z.string().optional(),
  tags: z.string().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seoTitle: z.string().default(""),
  seoDescription: z.string().default(""),
  socialImage: z.string().default(""),
});

export type PostFormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

export async function savePostAction(
  id: string | null,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireSession();

  const raw = Object.fromEntries(formData.entries());
  const parsed = PostSchema.safeParse(raw);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  const now = new Date();
  const slug = data.slug?.trim() || slugify(data.title);
  const bodyParagraphs = data.body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const tags = data.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await connectDB();

  const doc = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    body: bodyParagraphs,
    category: data.category,
    subcategory: data.subcategory,
    contentFormat: data.contentFormat || undefined,
    categoryColor: categoryColor(data.category),
    author: data.author,
    authorRole: data.authorRole,
    date: formatDate(now),
    updatedDate: formatDate(now),
    readTime: data.readTime,
    image: data.image || "/kaboom-logo.jpg",
    imageCaption: data.imageCaption,
    priority: data.priority,
    featured: data.featured === "true" || data.featured === "on",
    tags,
    status: data.status,
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.excerpt,
    socialImage: data.socialImage || data.image || "/kaboom-logo.jpg",
    publishedAt: data.status === "PUBLISHED" ? now : undefined,
  };

  if (id && id !== "new") {
    await PostModel.findByIdAndUpdate(id, doc);
  } else {
    await PostModel.create(doc);
  }

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath(`/story/${slug}`);
  revalidatePath(`/category/${data.category.toLowerCase()}`);

  redirect("/admin/content");
}

export async function deletePostAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await PostModel.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/stories");
}

export async function togglePostStatusAction(
  id: string,
  newStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED"
): Promise<void> {
  await requireSession();
  await connectDB();
  await PostModel.findByIdAndUpdate(id, {
    status: newStatus,
    ...(newStatus === "PUBLISHED" ? { publishedAt: new Date() } : {}),
  });
  revalidatePath("/");
  revalidatePath("/stories");
}

function categoryColor(cat: string): string {
  const m: Record<string, string> = {
    MUSIC: "#b3241b",
    ENTERTAINMENT: "#7c3aed",
    CULTURE: "#f2c14e",
    BUSINESS: "#1a8f6e",
    FEATURES: "#e85d04",
  };
  return m[cat] ?? "#b3241b";
}

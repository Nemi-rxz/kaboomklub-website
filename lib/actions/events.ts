"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { EventModel } from "@/lib/models/Event";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const Schema = z.object({
  name: z.string().min(1, "Event name required"),
  slug: z.string().optional(),
  date: z.string().default(""),
  location: z.string().default(""),
  description: z.string().default(""),
  artists: z.string().default(""),
  organizer: z.string().default("KaboomKlub"),
  href: z.string().default(""),
  image: z.string().default(""),
  featured: z.string().optional(),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type EventFormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function saveEventAction(id: string | null, _prev: EventFormState, formData: FormData): Promise<EventFormState> {
  await requireSession();
  const parsed = Schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  const d = parsed.data;
  const slug = d.slug?.trim() || slugify(d.name);
  const artists = d.artists.split(",").map((a) => a.trim()).filter(Boolean);
  await connectDB();
  const doc = { slug, name: d.name, date: d.date, location: d.location, description: d.description, artists, organizer: d.organizer, href: d.href, image: d.image, featured: d.featured === "true" || d.featured === "on", status: d.status };
  if (id && id !== "new") await EventModel.findByIdAndUpdate(id, doc);
  else await EventModel.create(doc);
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEventAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await EventModel.findByIdAndDelete(id);
  revalidatePath("/events");
}

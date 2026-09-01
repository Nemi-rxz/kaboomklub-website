"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models/Service";
import { requireSession } from "@/lib/session";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const Schema = z.object({
  title: z.string().min(1, "Title required"),
  slug: z.string().optional(),
  description: z.string().default(""),
  audience: z.string().default(""),
  deliverables: z.string().default(""),
  ctaLabel: z.string().default("Get A Quote"),
  ctaHref: z.string().default("/contact"),
  order: z.coerce.number().default(0),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type ServiceFormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function saveServiceAction(id: string | null, _prev: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  await requireSession();
  const parsed = Schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  const d = parsed.data;
  const slug = d.slug?.trim() || slugify(d.title);
  const deliverables = d.deliverables.split("\n").map((l) => l.trim()).filter(Boolean);
  await connectDB();
  const doc = { slug, title: d.title, description: d.description, audience: d.audience, deliverables, ctaLabel: d.ctaLabel, ctaHref: d.ctaHref, order: d.order, status: d.status };
  if (id && id !== "new") await ServiceModel.findByIdAndUpdate(id, doc);
  else await ServiceModel.create(doc);
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string): Promise<void> {
  await requireSession();
  await connectDB();
  await ServiceModel.findByIdAndDelete(id);
  revalidatePath("/services");
}

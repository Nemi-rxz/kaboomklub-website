"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SiteSettingsModel } from "@/lib/models/SiteSettings";
import { requireSession } from "@/lib/session";

export type SettingsFormState = { success?: boolean; error?: string } | null;

export async function saveSettingsAction(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireSession();
  await connectDB();

  const fields = [
    "siteName", "tagline", "shortDescription", "logoUrl", "faviconUrl",
    "primaryEmail", "contactEmail", "phone", "whatsapp",
    "instagram", "tiktok", "twitter", "youtube", "spotify", "facebook",
    "siteUrl", "defaultSeoTitle", "defaultSeoDescription", "defaultSocialImage",
    "newsletterName", "newsletterDescription",
  ];

  const update: Record<string, string> = {};
  for (const f of fields) {
    const v = formData.get(f);
    if (v !== null) update[f] = v.toString();
  }

  await SiteSettingsModel.findOneAndUpdate(
    { key: "main" },
    { $set: update },
    { upsert: true, new: true }
  );

  revalidatePath("/");
  return { success: true };
}

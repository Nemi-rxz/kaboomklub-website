"use server";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { requireSession } from "@/lib/session";

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function deleteMediaAction(id: string): Promise<void> {
  const session = await requireSession();
  await connectDB();
  const media = await MediaModel.findById(id);
  if (!media) return;

  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    configureCloudinary();
    await cloudinary.uploader.destroy(media.publicId, { resource_type: "image" });
  }

  if (media.uploadedBy && media.uploadedBy !== session.email) return;
  await MediaModel.findByIdAndDelete(id);
  revalidatePath("/admin/media");
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { getSession } from "@/lib/session";
import {
  CLOUDINARY_FOLDER,
  hasCloudinaryConfig,
  thumbnailFromUrl,
  uploadStreamToCloudinary,
} from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fd = await request.formData();
    const file = fd.get("file");
    const tagsRaw = fd.get("tags");
    const tags =
      typeof tagsRaw === "string" && tagsRaw.trim()
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

    if (!(file instanceof File)) return NextResponse.json({ error: "A file is required" }, { status: 400 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Only JPG, PNG, WEBP, and GIF files are supported" }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Files must be 10 MB or smaller" }, { status: 400 });

    if (!hasCloudinaryConfig()) return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 503 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadStreamToCloudinary(buffer, CLOUDINARY_FOLDER);

    await connectDB();
    const media = await MediaModel.create({
      publicId: result.public_id,
      url: result.secure_url,
      thumbnailUrl: thumbnailFromUrl(result.secure_url),
      originalFilename: file.name,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      folder: CLOUDINARY_FOLDER,
      uploadedBy: session.email,
      tags,
    });

    return NextResponse.json({
      id: String(media._id),
      url: media.url,
      thumbnailUrl: media.thumbnailUrl,
      filename: media.originalFilename,
      tags: media.tags ?? [],
      width: media.width,
      height: media.height,
      bytes: media.bytes,
      format: media.format,
      uploadedBy: media.uploadedBy,
    });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
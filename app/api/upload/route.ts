import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { requireSession } from "@/lib/session";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const file = (await request.formData()).get("file");

    if (!(file instanceof File)) return NextResponse.json({ error: "A file is required" }, { status: 400 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Only JPG, PNG, WEBP, and GIF files are supported" }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Files must be 10 MB or smaller" }, { status: 400 });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 503 });

    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "kaboomklub" }, (error, uploaded) => {
        if (error || !uploaded) reject(error ?? new Error("Upload failed"));
        else resolve(uploaded);
      });
      stream.end(buffer);
    });

    await connectDB();
    const media = await MediaModel.create({
      publicId: result.public_id,
      url: result.secure_url,
      thumbnailUrl: result.secure_url.replace("/upload/", "/upload/c_fill,w_480,h_320/"),
      originalFilename: file.name,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      folder: "kaboomklub",
      uploadedBy: session.email,
    });

    return NextResponse.json({ id: String(media._id), url: media.url, thumbnailUrl: media.thumbnailUrl, filename: media.originalFilename });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
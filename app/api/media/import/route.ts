import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { requireSession } from "@/lib/session";
import {
  CLOUDINARY_FOLDER,
  hasCloudinaryConfig,
  thumbnailFromUrl,
  uploadUrlToCloudinary,
} from "@/lib/cloudinary";

const MAX_DOWNLOAD_BYTES = 20 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

function isPrivateHost(host: string): boolean {
  const h = host.toLowerCase().trim();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h.endsWith(".local")) return true;
  if (h.endsWith(".internal")) return true;
  if (h === "0.0.0.0" || h === "[::1]" || h === "::1") return true;
  if (/^127\./.test(h)) return true;
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  if (/^100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\./.test(h)) return true;
  if (/^fd[0-9a-f]{0,2}:/i.test(h)) return true;
  if (/^fe80:/i.test(h)) return true;
  if (h.startsWith("[")) {
    const body = h.slice(1, -1);
    if (/^::$/.test(body) || /^::1$/.test(body)) return true;
    if (/^fe80:/i.test(body)) return true;
    if (/^fd/i.test(body)) return true;
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const body = (await request.json().catch(() => null)) as {
      url?: string;
      tags?: string;
    } | null;

    const url = typeof body?.url === "string" ? body.url.trim() : "";
    const tagsRaw = typeof body?.tags === "string" ? body.tags : "";
    const tags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are allowed" },
        { status: 400 }
      );
    }

    if (isPrivateHost(parsed.hostname)) {
      return NextResponse.json(
        { error: "Private or local network URLs are not allowed" },
        { status: 400 }
      );
    }

    const pathExt = parsed.pathname.split(".").pop()?.toLowerCase() ?? "";
    if (pathExt && !ALLOWED_EXT.has(pathExt)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, and GIF URLs are supported" },
        { status: 400 }
      );
    }

    if (!hasCloudinaryConfig()) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 503 }
      );
    }

    let contentLength: number | null = null;
    let mimeOk = true;
    try {
      const head = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        signal: AbortSignal.timeout(10000),
        redirect: "follow",
      });
      const cl = head.headers.get("content-length");
      if (cl) contentLength = Number(cl);
      const ct = head.headers.get("content-type");
      if (ct && !ALLOWED_MIME.has(ct.split(";")[0]!.trim().toLowerCase())) {
        mimeOk = false;
      }
    } catch {
      // HEAD/Range probe not supported; let Cloudinary attempt validation
    }

    if (contentLength !== null && contentLength > MAX_DOWNLOAD_BYTES) {
      return NextResponse.json(
        { error: "Remote image exceeds the 20 MB size limit" },
        { status: 413 }
      );
    }
    if (!mimeOk) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, and GIF URLs are supported" },
        { status: 400 }
      );
    }

    const uploadResult = await uploadUrlToCloudinary(url, CLOUDINARY_FOLDER);
    if (uploadResult.bytes && uploadResult.bytes > MAX_DOWNLOAD_BYTES) {
      try {
        const { destroyCloudinaryAsset } = await import("@/lib/cloudinary");
        await destroyCloudinaryAsset(uploadResult.public_id, "image");
      } catch {
        // ignore cleanup errors
      }
      return NextResponse.json(
        { error: "Imported image exceeds the 20 MB size limit" },
        { status: 413 }
      );
    }

    await connectDB();
    const media = await MediaModel.create({
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      thumbnailUrl: thumbnailFromUrl(uploadResult.secure_url),
      originalFilename:
        decodeURIComponent(parsed.pathname.split("/").pop() || uploadResult.public_id),
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
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
    console.error("Media import failed", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}

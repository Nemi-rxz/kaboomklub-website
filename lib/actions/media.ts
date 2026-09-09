"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { requireSession } from "@/lib/session";
import {
  CLOUDINARY_FOLDER,
  destroyCloudinaryAsset,
  hasCloudinaryConfig,
  thumbnailFromUrl,
  uploadUrlToCloudinary,
} from "@/lib/cloudinary";

const MAX_IMPORT_BYTES = 20 * 1024 * 1024;
const ALLOWED_IMPORT_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const ALLOWED_IMPORT_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const DEFAULT_PAGE_SIZE = 24;
const MAX_PAGE_SIZE = 100;

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

export async function deleteMediaAction(id: string): Promise<void> {
  const session = await requireSession();
  await connectDB();
  const media = await MediaModel.findById(id);
  if (!media) return;

  if (session.role !== "superadmin" && media.uploadedBy !== session.email) {
    return;
  }

  if (hasCloudinaryConfig() && media.publicId) {
    try {
      await destroyCloudinaryAsset(media.publicId, "image");
    } catch (error) {
      console.error("Cloudinary destroy failed", error);
    }
  }

  await MediaModel.findByIdAndDelete(id);
  revalidatePath("/admin/media");
}

export type MediaListResult = {
  items: Array<{
    id: string;
    url: string;
    thumbnailUrl: string;
    originalFilename: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    tags?: string[];
    uploadedBy?: string;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function listMediaAction(
  query?: { q?: string; page?: number; limit?: number } | null
): Promise<MediaListResult> {
  await requireSession();
  const q = query?.q?.trim() ?? "";
  const page = Math.max(1, query?.page ?? 1);
  const limitRaw = query?.limit ?? DEFAULT_PAGE_SIZE;
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, limitRaw));
  const skip = Math.max(0, (page - 1) * limit);

  const filter = q
    ? {
        $or: [
          { originalFilename: { $regex: q, $options: "i" } },
          { tags: { $regex: q, $options: "i" } },
          { format: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  await connectDB();
  const [rows, total] = await Promise.all([
    MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "_id url thumbnailUrl originalFilename format width height bytes tags uploadedBy"
      )
      .lean(),
    MediaModel.countDocuments(filter),
  ]);

  const items = rows.map((row) => ({
    id: String(row._id),
    url: row.url,
    thumbnailUrl: row.thumbnailUrl,
    originalFilename: row.originalFilename,
    format: row.format,
    width: row.width,
    height: row.height,
    bytes: row.bytes,
    tags: (row as unknown as { tags?: string[] }).tags ?? [],
    uploadedBy: (row as unknown as { uploadedBy?: string }).uploadedBy,
  }));

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function importFromUrlAction(input: {
  url: string;
  tags?: string;
}): Promise<{ error?: string; id?: string; url?: string; thumbnailUrl?: string }> {
  const session = await requireSession();
  const rawUrl = typeof input?.url === "string" ? input.url.trim() : "";
  if (!rawUrl) return { error: "URL is required" };

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { error: "Invalid URL" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { error: "Only HTTP and HTTPS URLs are allowed" };
  }

  if (isPrivateHost(parsed.hostname)) {
    return { error: "Private or local network URLs are not allowed" };
  }

  const pathExt = parsed.pathname.split(".").pop()?.toLowerCase() ?? "";
  if (pathExt && !ALLOWED_IMPORT_EXT.has(pathExt)) {
    return { error: "Only JPG, PNG, WEBP, and GIF URLs are supported" };
  }

  if (!hasCloudinaryConfig()) {
    return { error: "Cloudinary is not configured" };
  }

  let contentLength: number | null = null;
  try {
    const probe = await fetch(rawUrl, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    const cl = probe.headers.get("content-length");
    if (cl) contentLength = Number(cl);
    const ct = probe.headers.get("content-type");
    if (ct && !ALLOWED_IMPORT_MIME.has(ct.split(";")[0]!.trim().toLowerCase())) {
      return { error: "Only JPG, PNG, WEBP, and GIF URLs are supported" };
    }
  } catch {
    // Probe not supported; let Cloudinary validate
  }

  if (contentLength !== null && contentLength > MAX_IMPORT_BYTES) {
    return { error: "Remote image exceeds the 20 MB size limit" };
  }

  const uploadResult = await uploadUrlToCloudinary(rawUrl, CLOUDINARY_FOLDER);
  if (uploadResult.bytes && uploadResult.bytes > MAX_IMPORT_BYTES) {
    try {
      await destroyCloudinaryAsset(uploadResult.public_id, "image");
    } catch {
      // ignore cleanup errors
    }
    return { error: "Imported image exceeds the 20 MB size limit" };
  }

  const tags =
    typeof input.tags === "string" && input.tags.trim()
      ? input.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  await connectDB();
  const media = await MediaModel.create({
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url,
    thumbnailUrl: thumbnailFromUrl(uploadResult.secure_url),
    originalFilename: decodeURIComponent(
      parsed.pathname.split("/").pop() || uploadResult.public_id
    ),
    format: uploadResult.format,
    width: uploadResult.width,
    height: uploadResult.height,
    bytes: uploadResult.bytes,
    folder: CLOUDINARY_FOLDER,
    uploadedBy: session.email,
    tags,
  });

  revalidatePath("/admin/media");

  return {
    id: String(media._id),
    url: media.url,
    thumbnailUrl: media.thumbnailUrl,
  };
}
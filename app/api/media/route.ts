import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models/Media";
import { requireSession } from "@/lib/session";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 100;

type MediaItem = {
  _id: unknown;
  publicId: string;
  url: string;
  thumbnailUrl: string;
  originalFilename: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  uploadedBy?: string;
  tags?: string[];
  createdAt?: Date | string;
};

export async function GET(request: Request) {
  try {
    await requireSession();
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") ?? "").trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limitRaw = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
    const limit = Math.min(MAX_LIMIT, Math.max(1, limitRaw));
    const skip = Math.max(0, (page - 1) * limit);

    const query = q
      ? {
          $or: [
            { originalFilename: { $regex: q, $options: "i" } },
            { tags: { $regex: q, $options: "i" } },
            { format: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    await connectDB();
    const [items, total] = await Promise.all([
      MediaModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "_id publicId url thumbnailUrl originalFilename format width height bytes folder uploadedBy tags createdAt"
        )
        .lean() as Promise<MediaItem[]>,
      MediaModel.countDocuments(query),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      items: items.map((item) => ({
        id: String(item._id),
        publicId: item.publicId,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        originalFilename: item.originalFilename,
        format: item.format,
        width: item.width,
        height: item.height,
        bytes: item.bytes,
        folder: item.folder,
        uploadedBy: item.uploadedBy,
        tags: item.tags ?? [],
        createdAt: item.createdAt,
      })),
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Media list failed", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

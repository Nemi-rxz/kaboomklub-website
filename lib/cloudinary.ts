import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export const CLOUDINARY_FOLDER = "kaboomklub";
export const THUMBNAIL_TRANSFORM = "c_fill,w_480,h_320";

let configured = false;

export function hasCloudinaryConfig(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export function getCloudinaryEnv(): { cloudName: string; apiKey: string; apiSecret: string } {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
  const apiKey = process.env.CLOUDINARY_API_KEY ?? "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not configured");
  }
  return { cloudName, apiKey, apiSecret };
}

export function ensureCloudinaryConfig(): typeof cloudinary {
  if (!configured) {
    const { cloudName, apiKey, apiSecret } = getCloudinaryEnv();
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    configured = true;
  }
  return cloudinary;
}

export function thumbnailFromUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", `/upload/${THUMBNAIL_TRANSFORM}/`);
}

export async function uploadStreamToCloudinary(
  buffer: Buffer,
  folder: string = CLOUDINARY_FOLDER
): Promise<UploadApiResponse> {
  const cdn = ensureCloudinaryConfig();
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cdn.uploader.upload_stream({ folder }, (error, uploaded) => {
      if (error || !uploaded) reject(error ?? new Error("Cloudinary upload failed"));
      else resolve(uploaded);
    });
    stream.end(buffer);
  });
}

export async function uploadUrlToCloudinary(
  imageUrl: string,
  folder: string = CLOUDINARY_FOLDER
): Promise<UploadApiResponse> {
  const cdn = ensureCloudinaryConfig();
  return cdn.uploader.upload(imageUrl, { folder });
}

export async function destroyCloudinaryAsset(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<void> {
  const cdn = ensureCloudinaryConfig();
  await cdn.uploader.destroy(publicId, { resource_type: resourceType });
}

export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return /^https?:\/\/res\.cloudinary\.com\//i.test(url.trim());
}

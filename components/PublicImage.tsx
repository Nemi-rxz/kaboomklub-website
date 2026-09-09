import Image, { type ImageProps } from "next/image";
import { isCloudinaryUrl } from "@/lib/cloudinary";

const FALLBACK_IMAGE = "/kaboom-logo.jpg";

type PublicImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  hideFallback?: boolean;
};

export default function PublicImage({
  src,
  alt,
  hideFallback = false,
  ...props
}: PublicImageProps) {
  const { sizes = "100vw", unoptimized: rawUnoptimized, ...imageProps } = props;
  const trimmed = src?.trim();
  const useCloudinaryOptimizer = isCloudinaryUrl(trimmed);
  const effectiveSrc = trimmed || (hideFallback ? "" : FALLBACK_IMAGE);
  if (!effectiveSrc) return null;
  const unoptimized = rawUnoptimized ?? !useCloudinaryOptimizer;
  return (
    <Image
      src={effectiveSrc}
      alt={alt ?? ""}
      sizes={sizes}
      unoptimized={unoptimized}
      loading={imageProps.priority ? undefined : "lazy"}
      {...imageProps}
    />
  );
}

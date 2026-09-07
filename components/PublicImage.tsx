import Image, { type ImageProps } from "next/image";

const FALLBACK_IMAGE = "/kaboom-logo.jpg";

type PublicImageProps = Omit<ImageProps, "src"> & { src?: string | null };

export default function PublicImage({ src, alt, ...props }: PublicImageProps) {
  const { sizes = "100vw", ...imageProps } = props;
  return <Image src={src?.trim() || FALLBACK_IMAGE} alt={alt} sizes={sizes} {...imageProps} />;
}

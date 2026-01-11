// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// constants
import { MOBILE_BREAKPOINT } from "@/common/constants/breakPoints";

// components
import Image from "next/image";

export default function NextImage({
  src,
  alt,
  width,
  height,
  mobileWidth,
  desktopWidth,
  draggable,
  unoptimized,
  quality,
  eager,
  async,
  className
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  mobileWidth?: number;
  desktopWidth?: number;
  draggable?: boolean;
  unoptimized?: boolean;
  quality?: number;
  eager?: boolean;
  async?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={draggable || false}
      unoptimized={unoptimized || !OPTIMIZE_IMAGE}
      quality={quality || 75}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : async ? "async" : "auto"}
      priority={eager ? true : false}
      sizes={
        mobileWidth && desktopWidth
          ? `(max-width: ${MOBILE_BREAKPOINT}px) ${mobileWidth}px, ${desktopWidth}px`
          : undefined
      }
      className={className}
    />
  );
}

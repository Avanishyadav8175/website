// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { memo } from "react";

// components
import Image from "next/image";

function CategoryContentImage({
  index,
  alt,
  url
}: {
  index: number;
  alt: string;
  url: string;
}) {
  return (
    <Image
      src={url}
      alt={alt}
      height={300}
      width={300}
      unoptimized={!OPTIMIZE_IMAGE}
      priority={index < 4}
      draggable={false}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQklEQVR42mP8z8AARIQM4WJgYGAAAGkAAWQv7aEAAAD//wPkDEAwMDAwMDAAiYGBgYGBgYGBgYGBgYGBgYGBgQEAB0QCAAjY0uAAAAAASUVORK5CYII="
      className={`max-sm:rounded-t-xl w-full h-full object-cover object-center`}
    />
  );
}

export default memo(CategoryContentImage);

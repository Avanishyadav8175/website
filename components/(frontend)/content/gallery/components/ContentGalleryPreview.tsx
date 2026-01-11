// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { memo } from "react";

// components
import Image from "next/image";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentGalleryPreview({
  isActive,
  image: { alt, defaultAlt, url },
  onClick
}: {
  isActive: boolean;
  image: ImageDocument;
  onClick: () => void;
}) {
  return (
    <article
      className="group grid *:row-start-1 *:col-start-1 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <Image
        src={url}
        alt={alt || defaultAlt || "Content Image"}
        width={80}
        height={80}
        quality={50}
        unoptimized={!OPTIMIZE_IMAGE}
        priority
        draggable={false}
        className={`w-full h-full object-cover object-center cursor-pointer border-2 ring-2 ring-offset-2 ${isActive ? "border-sienna ring-sienna" : "border-transparent ring-transparent"} transition-all duration-300 rounded-lg`}
      />
    </article>
  );
}

export default memo(ContentGalleryPreview);

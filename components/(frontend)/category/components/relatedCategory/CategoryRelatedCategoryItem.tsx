// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { memo } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import ShineAnimation from "@/components/(frontend)/global/_Templates/ShineAnimation/ShineAnimation";

function CategoryRelatedCategoryItem({
  index,
  category: {
    _id,
    name,
    slug,
    media: { icon }
  }
}: {
  index: number;
  category: ContentCategoryDocument;
}) {
  const { alt, defaultAlt, url } = icon as ImageDocument;

  return (
    <Link
      key={_id as string}
      href={`/${slug}`}
      prefetch={false}
      className={`group flex items-center justify-center flex-col gap-2.5 sm:gap-4 min-w-[calc(calc(100dvw_-_70px)_/_2.2)] max-sm:py-1.5 sm:min-w-[240px] sm:max-w-[240px] max-w-[300px] transition-all duration-300`}
    >
      <div
        className={`relative overflow-hidden bg-charcoal-3/20 w-full rounded-lg aspect-[4/3] sm:aspect-video grid place-items-center`}
      >
        <Image
          src={url}
          alt={alt || name || "Category Image"}
          width={300}
          height={300}
          quality={50}
          unoptimized={!OPTIMIZE_IMAGE}
          priority={index < 3}
          draggable={false}
          className={`w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-all duration-300`}
        />
        <ShineAnimation />
      </div>
      <p
        className={`text-center text-sm sm:text-base truncate w-full text-charcoal-3 font-medium whitespace-nowrap`}
      >
        {name}
      </p>
    </Link>
  );
}

export default memo(CategoryRelatedCategoryItem);

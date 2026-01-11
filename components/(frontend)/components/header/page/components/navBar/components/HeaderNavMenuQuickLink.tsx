// utils
import { memo } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import ShineAnimation from "@/components/(frontend)/global/_Templates/ShineAnimation/ShineAnimation";

function HeaderNavMenuQuickLink({
  quickLink: { label, path, image }
}: {
  quickLink: ClickableImageDocument;
}) {
  return (
    <Link
      href={path}
      prefetch={false}
      className="group aspect-square h-full relative overflow-hidden bg-charcoal-3/40 rounded-xl cursor-pointer min-w-[130px] max-w-[150px]"
    >
      <Image
        src={image ? (image as ImageDocument)?.url || "" : ""}
        alt={
          image
            ? (image as ImageDocument)?.alt ||
            (image as ImageDocument)?.defaultAlt ||
            "Quick Link Image"
            : "Quick Link Image"
        }
        width={500}
        height={500}
        decoding="async"
        unoptimized
        draggable={false}
        className="w-full h-full object-cover object-center group-hover:scale-100 scale-105 transition-all duration-300"
      />
      {label && (
        <div className="flex capitalize truncate line-clamp-1 items-end justify-center pb-2 text-white font-medium text-sm tracking-wide absolute w-full bg-gradient-to-b from-transparent from-50% to-charcoal-3 h-full top-0 left-0">
          {label}
        </div>
      )}
      <ShineAnimation />
    </Link>
  );
}

export default memo(HeaderNavMenuQuickLink);

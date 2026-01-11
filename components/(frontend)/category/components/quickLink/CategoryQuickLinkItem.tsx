// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// constants
import { DOMAIN } from "@/common/constants/environmentVariables";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import ShineAnimation from "@/components/(frontend)/global/_Templates/ShineAnimation/ShineAnimation";

export default function CategoryQuickLinkItem({
  index,
  noImage,
  quickLink: { _id, label, path, image }
}: {
  index: number;
  noImage: boolean;
  quickLink: ClickableImageDocument;
}) {
  return (
    <Link
      key={_id as string}
      href={`${DOMAIN}${path}` || "#"}
      prefetch={false}
      className={`group flex items-center justify-center flex-col gap-1.5 sm:gap-2 ${noImage ? "w-fit px-5 py-3 rounded-lg border border-charcoal-3/20" : "max-sm:py-1.5 sm:min-w-[150px] sm:max-w-[150px]"} max-w-[300px] ${noImage ? "hover:bg-sienna-3/10 hover:border-sienna *:hover:text-sienna" : ""} transition-all duration-300`}
    >
      {!noImage && (
        <div
          className={`relative overflow-hidden bg-charcoal-3/20 w-full rounded-xl aspect-square grid place-items-center`}
        >
          <Image
            src={(image as ImageDocument).url}
            alt={(image as ImageDocument).alt || label || "Link Image"}
            width={150}
            height={150}
            quality={50}
            unoptimized={!OPTIMIZE_IMAGE}
            priority={index < 3}
            draggable={false}
            className={`w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-all duration-300 border border-transparent group-hover:border-sienna rounded-xl`}
          />
          <ShineAnimation />
        </div>
      )}
      {label && (
        <p
          className={`flex line-clamp-1 items-center justify-center text-center text-sm sm:text-base truncate w-full max-w-full text-charcoal-3 font-medium flex-wrap gap-x-1 whitespace-nowrap transition-all duration-300`}
        >
          {label}
        </p>
      )}
    </Link>
  );
}

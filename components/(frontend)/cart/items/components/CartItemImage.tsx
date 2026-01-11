// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

export default function CartItemImage({
  contentName,
  contentPath,
  imageUrl,
  contentEdible
}: {
  contentName: string;
  contentPath: string;
  imageUrl: string;
  contentEdible?: EdibleDocument;
}) {
  return (
    <Link
      href={contentPath}
      className="ml-2.5 sm:ml-3.5 mb-3.5 relative aspect-square rounded-2xl overflow-hidden w-[75px] sm:w-[110px] row-span-3 sm:row-span-7"
    >
      <Image
        src={imageUrl}
        alt={contentName}
        width={300}
        height={300}
        unoptimized={!OPTIMIZE_IMAGE}
        className="w-full h-full object-cover object-center"
        draggable={false}
      />
      {/* {(contentEdible?.type === "veg" || contentEdible?.type === "non-veg") && (
        <span className="absolute top-1 sm:-top-1 max-sm:left-1 sm:-left-1">
          {contentEdible.type === "veg" ? (
            <VegSymbol className="w-[16px] sm:scale-[0.55]" />
          ) : (
            <NonVegSymbol className="w-[16px] sm:scale-[0.55]" />
          )}
        </span>
      )} */}
    </Link>
  );
}

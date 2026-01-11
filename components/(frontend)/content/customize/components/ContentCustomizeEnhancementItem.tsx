// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Square, SquareCheckBig } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { memo } from "react";

// components
import Image from "next/image";

// types
import { type ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentCustomizeEnhancementItem({
  enhancementItem: { enhancement, price },
  isSelected,
  onClick
}: {
  enhancementItem: ContentEnhancementItemDocument;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 sm:gap-3.5 cursor-pointer transition-all duration-300 pr-3.5 py-4 sm:py-3 rounded-lg ${isSelected ? "bg-gradient-to-r from-transparent to-sienna-1/15 from-30%" : "hover:bg-gradient-to-r hover:from-transparent hover:to-ash/20"}`}
      onClick={onClick}
    >
      <span
        className={`text-[17px] ${isSelected ? "text-sienna" : ""} flex items-center justify-start gap-3`}
      >
        <div className="aspect-square rounded-lg bg-charcoal-3/20 overflow-hidden relative w-9">
          <Image
            src={
              ((enhancement as EnhancementDocument).image as ImageDocument).url
            }
            alt={
              ((enhancement as EnhancementDocument).image as ImageDocument)
                .alt || "Enhancement Image"
            }
            height={130}
            width={130}
            draggable={false}
            decoding="async"
            unoptimized={!OPTIMIZE_IMAGE}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <span>{`${(enhancement as EnhancementDocument).label}`}</span>
      </span>
      <div
        className={`flex items-center justify-end gap-3.5 ${isSelected ? "text-sienna" : ""}`}
      >
        <span className="whitespace-nowrap">
          {INRSymbol} {price}
        </span>
        {isSelected ? (
          <SquareCheckBig
            stroke="#b76e79"
            className="transition-all duration-300"
          />
        ) : (
          <Square />
        )}
      </div>
    </div>
  );
}

export default memo(ContentCustomizeEnhancementItem);

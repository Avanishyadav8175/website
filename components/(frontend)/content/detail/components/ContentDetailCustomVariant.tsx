// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Check } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { memo } from "react";
import { getContentPrice } from "../../utils/getContentPrice";

// hooks
import { useMemo } from "react";

// components
import Image from "next/image";

// types
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";

function ContentDetailCustomVariant({
  options,
  unit,
  variant,
  isSelected,
  onClick
}: {
  options: ContentCustomVariantCategoryOptionDocument;
  unit: UnitDocument | undefined;
  variant: ContentCustomVariantDocument;
  isSelected: boolean;
  onClick: () => void;
}) {
  const label = useMemo(
    () =>
      options.unit
        ? `${variant.value as number} ${(unit as UnitDocument).abbr}`
        : (variant.label as string),
    [options, unit, variant]
  );

  const image = useMemo(
    () => (options.image ? (variant.image as ImageDocument) : undefined),
    [options, variant]
  );

  const { price } = useMemo(
    () =>
      getContentPrice({
        price: variant.price,
        city: null
      }),
    [variant]
  );

  return (
    <div
      className={`group relative flex flex-col justify-start w-[92px] sm:w-[90px] cursor-pointer border rounded-lg p-1 ${isSelected ? "border-sienna/50 bg-transparent" : "border-charcoal-3/10 hover:border-charcoal-3/20"} transition-all duration-300`}
      onClick={onClick}
    >
      {image && (
        <div
          className={`relative grid *:row-start-1 *:col-start-1 overflow-hidden`}
        >
          <Image
            src={image.url}
            alt={image.alt || image.defaultAlt || "Variant Image"}
            width={80}
            height={80}
            quality={25}
            unoptimized={!OPTIMIZE_IMAGE}
            draggable={false}
            className={`border-[2px] ${isSelected ? "border-sienna" : "border-transparent"} rounded-lg`}
          />
          <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
          {isSelected && (
            <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg text-white bg-green-500 flex items-center justify-center p-1">
              <Check
                width={14}
                height={14}
              />
            </span>
          )}
        </div>
      )}
      <span
        className={`${isSelected ? "text-charcoal-1" : "text-charcoal-3/90"} ${
          unit ? "" : "text-center mb-1"
        } px-1 text-sm whitespace-nowrap truncate mt-1`}
      >
        {label}
      </span>
      <span
        className={`${isSelected ? "text-sienna" : "text-charcoal-3 group-hover:text-sienna"} px-1 font-medium transition-all duration-300 brightness-75`}
      >
        {`${INRSymbol}${price}`}
      </span>
    </div>
  );
}

export default memo(ContentDetailCustomVariant);

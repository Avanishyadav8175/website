// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { memo, useMemo } from "react";

// components
import Image from "next/image";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentAddonItem({
  contentAddon,
  isSelected,
  count,
  onAdd,
  onRemove
}: {
  contentAddon: ContentAddonDocument;
  isSelected: boolean;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const addon = useMemo(
    () => contentAddon.addon as AddonDocument,
    [contentAddon]
  );
  const { alt, defaultAlt, url } = useMemo(
    () => addon.image as ImageDocument,
    [addon]
  );
  const label = useMemo(() => addon.name, [addon]);
  const price = useMemo(() => addon.price, [addon]);

  return (
    <div
      className={`flex flex-col justify-start bg-ivory-1 shadow-light rounded-xl max-sm:p-1 max-sm:pb-2 p-2.5 border-[1.5px] ${isSelected ? "border-sienna" : "border-transparent"}`}
    >
      <div className="aspect-square w-full rounded-lg overflow-hidden bg-ash-3/45 relative">
        <Image
          src={url}
          alt={alt || defaultAlt || "Addon Image"}
          width={250}
          height={250}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
        />
        {isSelected && (
          <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/65 opacity-60 rotate-12 blur-sm z-30 top-0 animate-shine-infinite-slow" />
        )}
      </div>
      <span className="text-charcoal-3 pt-2 truncate max-sm:px-1.5">
        {label}
      </span>
      <span
        className={`text-lg max-sm:px-1.5 ${isSelected ? "text-sienna font-medium" : ""}`}
      >
        {INRSymbol} {price}
      </span>
      <div className="grid max-sm:px-1.5 *:row-start-1 *:col-start-1">
        <div
          onClick={onAdd}
          className={`${isSelected ? "hidden" : ""} relative text-white bg-sienna text-center py-1.5 rounded-md mt-1.5 sm:py-1 cursor-pointer`}
        >
          ADD
          <span className="absolute top-0 right-2 text-white sm;text-sm">
            +
          </span>
        </div>
        <div
          className={`${isSelected ? "" : "hidden"} w-full mt-1.5 flex items-center justify-between`}
        >
          <div
            className="aspect-[1.2/1] sm:aspect-square cursor-pointer max-sm:text-xl rounded-md bg-sienna h-full flex items-center justify-center text-white py-1 sm:py-1"
            onClick={onRemove}
          >
            -
          </div>
          <span className="py-1.5 sm:py-1">{count || 0}</span>
          <div
            className="aspect-[1.2/1] sm:aspect-square cursor-pointer max-sm:text-xl rounded-md bg-sienna h-full flex items-center justify-center text-white py-1 sm:py-1"
            onClick={onAdd}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ContentAddonItem);

// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// components
import Image from "next/image";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type ImageDocument } from "@/common/types/documentation/media/image";

export default function CartItemAddonSuggestion({
  addon: { name, image, price },
  onAdd
}: {
  addon: AddonDocument;
  onAdd: () => void;
}) {
  // variables
  const { alt, defaultAlt, url } = image as ImageDocument;

  return (
    <div className="flex flex-col gap-0 sm:gap-0 p-1.5 sm:p-2 justify-start min-w-[90px] sm:w-[90px] relative border border-ash/40 hover:border-ash hover:bg-ash/10 rounded-xl transition-all duration-300">
      <div className="bg-ash rounded-xl aspect-square overflow-hidden relative mb-2">
        <Image
          src={url}
          alt={alt || defaultAlt || name}
          width={200}
          height={200}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="text-xs text-charcoal-3/70 line-clamp-2 leading-tight">
        {name}
      </div>
      <div className="text-sm font-medium sm:pt-0.5">
        {`${INRSymbol} ${price}`}
      </div>

      <div
        onClick={onAdd}
        className="cursor-pointer aspect-square w-[19px] h-[19px] absolute top-0 right-0 translate-x-[40%] -translate-y-[40%] flex items-center justify-center text-[15px] rounded-sm bg-green-600 text-white"
      >
        +
      </div>
    </div>
  );
}

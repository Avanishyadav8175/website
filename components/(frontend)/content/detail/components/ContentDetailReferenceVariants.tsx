// utils
import { memo } from "react";

// hooks
import { useMemo } from "react";

// components
import ContentDetailReferenceVariant from "./ContentDetailReferenceVariant";

// type
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentDetailReferenceVariants({
  variantCategory,
  activeVariantId,
  onChange
}: {
  variantCategory: ContentVariantCategoryDocument;
  activeVariantId: string | null;
  onChange: (referenceVariant: ContentDocument | null) => void;
}) {
  const label = useMemo(
    () => (variantCategory.label as LabelDocument).label,
    [variantCategory]
  );

  const variants = useMemo(() => variantCategory.reference!, [variantCategory]);

  return (
    <div className="bg-ivory-1 border border-ash-1 overflow-hidden shadow-sm relative sm:rounded-2xl pt-10 sm:pt-9 pb-5 px-4 sm:px-6 sm:max-w-[calc(470px_+_24px)]">
      <div className="absolute top-0 left-0 bg-ash-1/50 text-sienna-1 pt-2 pb-1.5 font-medium px-5 sm:px-6 rounded-br-xl">{label}</div>
      <div className="flex flex-col gap-1.5 mt-4 items-stretch justify-start">
        <div className="flex items-start justify-start gap-4 overflow-x-scroll scrollbar-hide">
          {variants.map((variant, i) => (
            <ContentDetailReferenceVariant
              key={variant._id as string}
              variant={variant}
              isSelf={!i}
              isSelected={
                activeVariantId
                  ? (variant.reference as ContentDocument)._id ===
                  activeVariantId
                  : !i
              }
              onClick={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ContentDetailReferenceVariants);

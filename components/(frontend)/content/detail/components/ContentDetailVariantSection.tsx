// utils
import { memo } from "react";

// components
import ContentDetailReferenceVariants from "./ContentDetailReferenceVariants";
import ContentDetailCustomVariants from "./ContentDetailCustomVariants";

// types
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { type ContentDocument } from "@/common/types/documentation/contents/content";

function ContentDetailVariantSections({
  variants,
  activeReferenceVariantId,
  activeCustomVariantId,
  onChangeReferenceVariant,
  onChangeCustomVariant
}: {
  variants: ContentVariantCategoryDocument[];
  activeReferenceVariantId: string | null;
  activeCustomVariantId: string | null;
  onChangeReferenceVariant: (referenceVariant: ContentDocument | null) => void;
  onChangeCustomVariant: (customVariantId: string | null) => void;
}) {
  return (
    <>
      {variants.map((variant) =>
        variant.type === "reference" ? (
          activeCustomVariantId ? (
            <></>
          ) : (
            <ContentDetailReferenceVariants
              key={variant._id as string}
              variantCategory={variant}
              activeVariantId={activeReferenceVariantId}
              onChange={onChangeReferenceVariant}
            />
          )
        ) : activeReferenceVariantId ? (
          <></>
        ) : (
          <ContentDetailCustomVariants
            key={variant._id as string}
            variantCategory={variant}
            activeVariantId={activeCustomVariantId}
            onChange={onChangeCustomVariant}
          />
        )
      )}
    </>
  );
}

export default memo(ContentDetailVariantSections);

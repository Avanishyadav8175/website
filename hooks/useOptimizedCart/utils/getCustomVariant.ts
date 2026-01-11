// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";

export const getCustomVariant = ({
  content,
  variantId
}: {
  content: ContentDocument;
  variantId: string;
}): { name: string; price: ContentPriceDocument; image?: ImageDocument } => {
  const category = content
    .variants!.filter(({ type }) => type === "custom")!
    .find(({ custom }) =>
      (custom as ContentCustomVariantCategoryDocument).variants.find(
        ({ _id }) => _id === variantId
      )
    )!.custom!;

  const options = category.options;

  const unit = options.unit ? (category.unit as UnitDocument) : null;

  const variant = category.variants.find(({ _id }) => _id === variantId)!;

  return {
    name: `${content.name} (${unit ? `${variant.value!} ${unit.abbr}` : variant.label!})`,
    price: variant.price,
    ...(options.image ? { image: variant.image as ImageDocument } : {})
  };
};

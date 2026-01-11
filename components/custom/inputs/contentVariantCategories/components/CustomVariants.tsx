// icons
import { Plus } from "lucide-react";

// utils
import { getInitialCustomVariantValue } from "../utils/getInitialCustomVariantValue";
import { getInitialCustomVariantsValue } from "../utils/getInitialCustomVariantsValue";

// components
import CustomVariant from "./CustomVariant";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";

export default function CustomVariants({
  content,
  customOptions,
  customVariants,
  onChangeCustomVariants
}: {
  content: ContentDocument;
  customOptions: ContentCustomVariantCategoryOptionDocument;
  customVariants: ContentCustomVariantDocument[];
  onChangeCustomVariants: (
    newCustomVariants: ContentCustomVariantDocument[]
  ) => void;
}) {
  // handlers
  const handleAddCustomVariant = () => {
    onChangeCustomVariants([
      ...customVariants,
      getInitialCustomVariantValue({ image: content.media.primary })
    ]);
  };

  const handleDeleteReferenceVariant = (customVariantId: string) => {
    if (customVariants.length === 2) {
      onChangeCustomVariants(getInitialCustomVariantsValue({ content }));
    } else {
      onChangeCustomVariants(
        [...customVariants].filter(({ _id }) => _id !== customVariantId)
      );
    }
  };

  return (
    <section className="flex flex-col gap-2 p-2">
      <section className="grid grid-cols-7 gap-2 ">
        {customVariants.map((customVariant, i) => (
          <CustomVariant
            key={i}
            disabled={i === 0}
            customOptions={customOptions}
            customVariant={customVariant}
            onChangeCustomVariant={(newCustomVariant) => {
              onChangeCustomVariants(
                [...customVariants].map((variant) =>
                  variant._id === newCustomVariant._id
                    ? newCustomVariant
                    : variant
                )
              );
            }}
            onDeleteCustomVariant={() => {
              handleDeleteReferenceVariant(customVariant._id as string);
            }}
          />
        ))}
      </section>
      <div className="flex items-center justify-end w-full">
        <div
          onClick={handleAddCustomVariant}
          className="rounded-lg p-2 text-teal-600 flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
        </div>
      </div>
    </section>
  );
}

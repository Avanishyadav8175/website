// icons
import { Plus } from "lucide-react";

// utils
import { getInitialReferenceVariantValue } from "../utils/getInitialReferenceVariantValue";
import { getInitialReferenceVariantsValue } from "../utils/getInitialReferenceVariantsValue";

// components
import ReferenceVariant from "./ReferenceVariant";

// types
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";

export default function ReferenceVariants({
  contentId,
  referenceVariants,
  onChangeReferenceVariants
}: {
  contentId: string;
  referenceVariants: ContentReferenceVariantDocument[];
  onChangeReferenceVariants: (
    newReferenceVariants: ContentReferenceVariantDocument[]
  ) => void;
}) {
  // variables
  const excludes = referenceVariants.map(
    ({ reference }) => reference as string
  );

  // handlers
  const handleAddReferenceVariant = () => {
    onChangeReferenceVariants([
      ...referenceVariants,
      getInitialReferenceVariantValue()
    ]);
  };

  const handleDeleteReferenceVariant = (referenceVariantId: string) => {
    if (referenceVariants.length === 2) {
      onChangeReferenceVariants(getInitialReferenceVariantsValue(contentId));
    } else {
      onChangeReferenceVariants(
        [...referenceVariants].filter(({ _id }) => _id !== referenceVariantId)
      );
    }
  };

  return (
    <section className="flex flex-col gap-2 p-2">
      <section className="grid grid-cols-7 gap-2 ">
        {referenceVariants.map((referenceVariant, i) => (
          <ReferenceVariant
            key={i}
            excludes={excludes.filter(
              (exclude) => exclude !== referenceVariant.reference
            )}
            disabled={referenceVariant.reference === contentId}
            referenceVariant={referenceVariant}
            onChangeReferenceVariant={(newReferenceVariant) => {
              onChangeReferenceVariants(
                [...referenceVariants].map((variant) =>
                  variant._id === newReferenceVariant._id
                    ? newReferenceVariant
                    : variant
                )
              );
            }}
            onDeleteVariantCategory={() => {
              handleDeleteReferenceVariant(referenceVariant._id as string);
            }}
          />
        ))}
      </section>
      <div className="flex items-center justify-end w-full">
        <div
          onClick={handleAddReferenceVariant}
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

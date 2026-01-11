import { ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import CustomVariant from "./CustomVariant";
import ReferenceVariant from "./ReferenceVariant";
import { CityDocument } from "@/common/types/documentation/presets/city";

export default function ContentVariants({
  data,
  selectedId,
  onSelect,
  isReferenceActive,
  referenceDocument,
  selectedCity
}: {
  data: ContentVariantCategoryDocument;
  selectedId?: string;
  onSelect: (
    selectedId: string | undefined,
    type: ContentVariantCategoryDocument["type"]
  ) => void;
  isReferenceActive: boolean;
  referenceDocument: ContentVariantCategoryDocument | undefined;
  selectedCity: CityDocument | null;
}) {
  return data.type === "custom" ? (
    isReferenceActive ? (
      <></>
    ) : (
      <CustomVariant
        data={data}
        onSelect={(id: string | undefined) => onSelect(id, "custom")}
        selectedCity={selectedCity}
        selectedId={
          data.custom && data.custom.variants && data.custom.variants.length > 0
            ? data.custom.variants
                .map(({ _id }) => (_id as string) === selectedId)
                .find((x) => x)
              ? selectedId
              : (data.custom.variants[0]._id as string)
            : selectedId
        }
      />
    )
  ) : referenceDocument ? (
    <ReferenceVariant
      data={referenceDocument}
      onSelect={(id: string | undefined) => onSelect(id, "reference")}
      selectedId={selectedId}
    />
  ) : (
    <></>
  );
}

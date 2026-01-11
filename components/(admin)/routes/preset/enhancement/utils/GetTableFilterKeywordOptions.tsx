// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectEnhancement } from "@/store/features/presets/enhancementSlice";

// types
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<EnhancementDocument>) => void;
}) {
  const { documents } = useSelector(selectEnhancement.documentList);

  useEffect(() => {
    onReturnOptions({
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, onReturnOptions]);

  return null;
}

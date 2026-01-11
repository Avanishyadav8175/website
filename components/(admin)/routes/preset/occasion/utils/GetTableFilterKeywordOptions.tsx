// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectOccasion } from "@/store/features/presets/occasionSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<OccasionDocument>) => void;
}) {
  const { documents } = useSelector(selectOccasion.documentList);

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

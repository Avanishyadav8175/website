// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectLabel } from "@/store/features/presets/labelSlice";

// types
import { type LabelDocument } from "@/common/types/documentation/presets/label";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<LabelDocument>) => void;
}) {
  const { documents } = useSelector(selectLabel.documentList);

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

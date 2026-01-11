// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectFoundUsSource } from "@/store/features/presets/foundUsSourceSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<FoundUsSourceDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectFoundUsSource.documentList);

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

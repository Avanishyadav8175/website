// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectSearchTag } from "@/store/features/presets/searchTagSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type SearchTagDocument } from "@/common/types/documentation/presets/searchTag";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<SearchTagDocument>) => void;
}) {
  const { documents } = useSelector(selectSearchTag.documentList);

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

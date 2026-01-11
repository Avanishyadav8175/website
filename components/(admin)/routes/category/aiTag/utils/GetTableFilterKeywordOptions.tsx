// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAITagCategory } from "@/store/features/categories/aiTagCategorySlice";

// types
import { type AITagCategoryDocument } from "@/common/types/documentation/categories/aiTagCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<AITagCategoryDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectAITagCategory.documentList);

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

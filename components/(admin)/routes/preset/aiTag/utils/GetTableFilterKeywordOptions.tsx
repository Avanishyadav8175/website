// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAITag } from "@/store/features/presets/aiTagSlice";
import { selectAITagCategory } from "@/store/features/categories/aiTagCategorySlice";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<AITagDocument>) => void;
}) {
  // redux states
  const { documents } = useSelector(selectAITag.documentList);

  const { options: aiTagCategoryOptions } = useSelector((state) =>
    selectAITagCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  useEffect(() => {
    onReturnOptions({
      category: aiTagCategoryOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, aiTagCategoryOptions, onReturnOptions]);

  return null;
}

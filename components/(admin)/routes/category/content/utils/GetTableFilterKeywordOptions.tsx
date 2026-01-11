// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<ContentCategoryDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectContentCategory.documentList);

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

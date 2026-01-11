// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { selectDynamicPageLayout } from "@/store/features/pages/dynamicSlice";
import { DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<DynamicPageDocument>) => void;
}) {
  // redux
  const { documents } = useSelector(selectDynamicPageLayout.documentList);

  // effects
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

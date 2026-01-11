// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAddonCategory } from "@/store/features/categories/addonCategorySlice";

// types
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<AddonCategoryDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectAddonCategory.documentList);

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

// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCatalogue } from "@/store/features/presets/catalogueSlice";
import { selectCatalogueCategory } from "@/store/features/categories/catalogueCategorySlice";

// types
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CatalogueDocument>) => void;
}) {
  // redux
  const { documents } = useSelector(selectCatalogue.documentList);

  const { options: catalogueCategoryOptions } = useSelector((state) =>
    selectCatalogueCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  useEffect(() => {
    onReturnOptions({
      category: catalogueCategoryOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, catalogueCategoryOptions, onReturnOptions]);

  return null;
}

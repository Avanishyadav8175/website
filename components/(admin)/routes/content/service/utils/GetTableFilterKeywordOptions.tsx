// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectContent } from "@/store/features/contents/contentSlice";
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<ContentDocument>) => void;
}) {
  const { documents } = useSelector((state) =>
    selectContent.documentList(state, {
      defaultFilterBy: "type",
      defaultFilterKeyword: "service"
    })
  );

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  useEffect(() => {
    onReturnOptions({
      // @ts-ignore
      "category.primary": contentCategoryOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, contentCategoryOptions, onReturnOptions]);

  return null;
}

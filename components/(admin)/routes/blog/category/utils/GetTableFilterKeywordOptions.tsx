// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectBlogCategory } from "@/store/features/blogs/blogCategorySlice";

// types
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<BlogCategoryDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectBlogCategory.documentList);

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

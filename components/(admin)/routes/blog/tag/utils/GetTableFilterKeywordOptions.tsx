// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectBlogTag } from "@/store/features/blogs/blogTagSlice";

// types
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<BlogTagDocument>) => void;
}) {
  const { documents } = useSelector(selectBlogTag.documentList);

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

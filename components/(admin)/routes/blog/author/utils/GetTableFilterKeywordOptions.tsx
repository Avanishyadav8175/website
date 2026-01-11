// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectBlogAuthor } from "@/store/features/blogs/blogAuthorSlice";

// types
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<BlogAuthorDocument>) => void;
}) {
  const { documents } = useSelector(selectBlogAuthor.documentList);

  useEffect(() => {
    onReturnOptions({
      bio: [
        {
          label: "Has Bio",
          value: "true"
        },
        {
          label: "Don't has Bio",
          value: "false"
        }
      ],
      photo: [
        {
          label: "Has Photo",
          value: "true"
        },
        {
          label: "Don't has Photo",
          value: "false"
        }
      ],
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

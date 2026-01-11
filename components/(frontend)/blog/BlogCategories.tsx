// icons
import { PaintBucket } from "lucide-react";

// components
import BlogPillButtons from "./BlogPillButtons";

// types
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { toSlug } from "@/common/utils/slugOperations";

export default function BlogCategories({
  categories
}: {
  categories: BlogCategoryDocument[];
}) {
  const pills = categories.map(({ _id, name }) => ({
    label: name,
    path: `/blog/category/${toSlug(name)}?id=${_id}`
  }));

  return (
    <>
      {/* <span className="flex items-start justify-start gap-1.5">
        <PaintBucket
          strokeWidth={1.5}
          width={18}
        />
        <span className="mr-3.5">Categories:</span>
      </span> */}
      <BlogPillButtons pills={pills} />
    </>
  );
}

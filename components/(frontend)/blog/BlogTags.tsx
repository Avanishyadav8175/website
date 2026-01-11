// icons
import { Tag } from "lucide-react";

// components
import BlogPillButtons from "./BlogPillButtons";

// types
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";

export default function BlogTags({ tags }: { tags: BlogTagDocument[] }) {
  const pills = tags.map(({ _id, name }) => ({
    label: name,
    path: `/blog/tag/${_id}`
  }));

  return (
    <>
      <span className="flex items-start justify-start gap-1.5 max-sm:mt-3">
        <Tag
          strokeWidth={1.5}
          width={18}
        />
        <span className="mr-3.5">Tags:</span>
      </span>
      <BlogPillButtons pills={pills} />
    </>
  );
}

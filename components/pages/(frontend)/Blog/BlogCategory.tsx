// components
import BlogCards from "@/components/(blog)/content/BlogPage/components/BlogCards";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";

export default async function BlogCategory({
  category,
  blogs
}: {
  category: BlogCategoryDocument;
  blogs: BlogArticleDocument[];
}) {
  return (
    <div className="flex flex-col justify-start gap-y-8">
      <BlogCards
        title={`${category.name} Blogs`}
        blogs={blogs}
      />
    </div>
  );
}

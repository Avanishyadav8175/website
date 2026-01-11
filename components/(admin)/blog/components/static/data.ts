import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

export const DEFAULT_ADMIN_BLOG_ARTICLE_DATA: BlogArticleDocument = {
  author: "",
  categories: [] as string[],
  name: "",
  slug: "",
  heading: "",
  tags: [] as string[],
  meta: {
    title: "",
    tags: [] as string[],
    description: ""
  } as SEOMetaDocument,
  layouts: [] as BlogLayoutItemDocument[],
  layoutCounter: 0
} as BlogArticleDocument;

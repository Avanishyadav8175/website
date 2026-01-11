// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBlogArticle,
  handleUpdateBlogArticle,
  handleDeleteBlogArticle
} from "@/app/api/admin/blog/blog-article/handler";

// methods
export const GET = handleGetBlogArticle;

export const PATCH = handleUpdateBlogArticle;

export const DELETE = handleDeleteBlogArticle;

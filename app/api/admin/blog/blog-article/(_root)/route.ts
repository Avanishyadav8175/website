// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBlogArticles,
  handleDeleteBlogArticles,
  handleGetBlogArticles,
  handleUpdateBlogArticles
} from "@/app/api/admin/blog/blog-article/handler";

// methods
export const GET = handleGetBlogArticles;

export const POST = handleAddBlogArticles;

export const PATCH = handleUpdateBlogArticles;

export const DELETE = handleDeleteBlogArticles;

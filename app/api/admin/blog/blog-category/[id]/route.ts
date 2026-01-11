// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBlogCategory,
  handleUpdateBlogCategory,
  handleDeleteBlogCategory
} from "@/app/api/admin/blog/blog-category/handler";

// methods
export const GET = handleGetBlogCategory;

export const PATCH = handleUpdateBlogCategory;

export const DELETE = handleDeleteBlogCategory;

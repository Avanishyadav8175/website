// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBlogCategories,
  handleDeleteBlogCategories,
  handleGetBlogCategories,
  handleUpdateBlogCategories
} from "@/app/api/admin/blog/blog-category/handler";

// methods
export const GET = handleGetBlogCategories;

export const POST = handleAddBlogCategories;

export const PATCH = handleUpdateBlogCategories;

export const DELETE = handleDeleteBlogCategories;

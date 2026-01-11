// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBlogAuthor,
  handleUpdateBlogAuthor,
  handleDeleteBlogAuthor
} from "@/app/api/admin/blog/blog-author/handler";

// methods
export const GET = handleGetBlogAuthor;

export const PATCH = handleUpdateBlogAuthor;

export const DELETE = handleDeleteBlogAuthor;

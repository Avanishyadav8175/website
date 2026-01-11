// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBlogTag,
  handleUpdateBlogTag,
  handleDeleteBlogTag
} from "@/app/api/admin/blog/blog-tag/handler";

// methods
export const GET = handleGetBlogTag;

export const PATCH = handleUpdateBlogTag;

export const DELETE = handleDeleteBlogTag;

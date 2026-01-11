// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBlogTags,
  handleDeleteBlogTags,
  handleGetBlogTags,
  handleUpdateBlogTags
} from "@/app/api/admin/blog/blog-tag/handler";

// methods
export const GET = handleGetBlogTags;

export const POST = handleAddBlogTags;

export const PATCH = handleUpdateBlogTags;

export const DELETE = handleDeleteBlogTags;

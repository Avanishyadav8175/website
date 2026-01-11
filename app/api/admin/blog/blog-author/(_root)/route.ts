// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBlogAuthors,
  handleDeleteBlogAuthors,
  handleGetBlogAuthors,
  handleUpdateBlogAuthors
} from "@/app/api/admin/blog/blog-author/handler";

// methods
export const GET = handleGetBlogAuthors;

export const POST = handleAddBlogAuthors;

export const PATCH = handleUpdateBlogAuthors;

export const DELETE = handleDeleteBlogAuthors;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetContentCategory,
  handleUpdateContentCategory,
  handleDeleteContentCategory
} from "@/app/api/admin/category/content-category/handler";

// methods
export const GET = handleGetContentCategory;

export const PATCH = handleUpdateContentCategory;

export const DELETE = handleDeleteContentCategory;

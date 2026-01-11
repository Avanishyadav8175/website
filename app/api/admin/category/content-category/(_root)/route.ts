// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddContentCategories,
  handleDeleteContentCategories,
  handleGetContentCategories,
  handleUpdateContentCategories
} from "@/app/api/admin/category/content-category/handler";

// methods
export const GET = handleGetContentCategories;

export const POST = handleAddContentCategories;

export const PATCH = handleUpdateContentCategories;

export const DELETE = handleDeleteContentCategories;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAddonCategories,
  handleDeleteAddonCategories,
  handleGetAddonCategories,
  handleUpdateAddonCategories
} from "@/app/api/admin/category/addon-category/handler";

// methods
export const GET = handleGetAddonCategories;

export const POST = handleAddAddonCategories;

export const PATCH = handleUpdateAddonCategories;

export const DELETE = handleDeleteAddonCategories;

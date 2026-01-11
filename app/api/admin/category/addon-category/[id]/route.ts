// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAddonCategory,
  handleUpdateAddonCategory,
  handleDeleteAddonCategory
} from "@/app/api/admin/category/addon-category/handler";

// methods
export const GET = handleGetAddonCategory;

export const PATCH = handleUpdateAddonCategory;

export const DELETE = handleDeleteAddonCategory;

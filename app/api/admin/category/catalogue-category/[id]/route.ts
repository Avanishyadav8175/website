// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCatalogueCategory,
  handleUpdateCatalogueCategory,
  handleDeleteCatalogueCategory
} from "@/app/api/admin/category/catalogue-category/handler";

// methods
export const GET = handleGetCatalogueCategory;

export const PATCH = handleUpdateCatalogueCategory;

export const DELETE = handleDeleteCatalogueCategory;

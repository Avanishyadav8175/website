// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCatalogueCategories,
  handleDeleteCatalogueCategories,
  handleGetCatalogueCategories,
  handleUpdateCatalogueCategories
} from "@/app/api/admin/category/catalogue-category/handler";

// methods
export const GET = handleGetCatalogueCategories;

export const POST = handleAddCatalogueCategories;

export const PATCH = handleUpdateCatalogueCategories;

export const DELETE = handleDeleteCatalogueCategories;

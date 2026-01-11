// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBrand,
  handleUpdateBrand,
  handleDeleteBrand
} from "@/app/api/admin/preset/brand/handler";

// methods
export const GET = handleGetBrand;

export const PATCH = handleUpdateBrand;

export const DELETE = handleDeleteBrand;

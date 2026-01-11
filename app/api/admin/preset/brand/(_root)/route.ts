// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBrands,
  handleDeleteBrands,
  handleGetBrands,
  handleUpdateBrands
} from "@/app/api/admin/preset/brand/handler";

// methods
export const GET = handleGetBrands;

export const POST = handleAddBrands;

export const PATCH = handleUpdateBrands;

export const DELETE = handleDeleteBrands;

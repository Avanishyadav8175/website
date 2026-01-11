// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetVendor,
  handleUpdateVendor,
  handleDeleteVendor
} from "@/app/api/admin/user/vendor/handler";

// methods
export const GET = handleGetVendor;

export const PATCH = handleUpdateVendor;

export const DELETE = handleDeleteVendor;

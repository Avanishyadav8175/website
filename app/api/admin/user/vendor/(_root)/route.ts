// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddVendors,
  handleGetVendors
} from "@/app/api/admin/user/vendor/handler";

// methods
export const GET = handleGetVendors;

export const POST = handleAddVendors;

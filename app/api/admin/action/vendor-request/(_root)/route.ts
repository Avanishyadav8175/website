// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddVendorRequests,
  handleGetVendorRequests
} from "@/app/api/admin/action/vendor-request/handler";

// methods
export const GET = handleGetVendorRequests;

export const POST = handleAddVendorRequests;

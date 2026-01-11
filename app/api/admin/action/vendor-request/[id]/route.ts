// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetVendorRequest,
  handleUpdateVendorRequest,
  handleDeleteVendorRequest
} from "@/app/api/admin/action/vendor-request/handler";

// methods
export const GET = handleGetVendorRequest;

export const PATCH = handleUpdateVendorRequest;

export const DELETE = handleDeleteVendorRequest;

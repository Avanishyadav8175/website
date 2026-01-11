// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetGST,
  handleUpdateGST,
  handleDeleteGST
} from "@/app/api/admin/preset/gst/handler";

// methods
export const GET = handleGetGST;

export const PATCH = handleUpdateGST;

export const DELETE = handleDeleteGST;

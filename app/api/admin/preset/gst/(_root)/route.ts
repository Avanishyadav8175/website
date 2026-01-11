// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddGSTs,
  handleDeleteGSTs,
  handleGetGSTs,
  handleUpdateGSTs
} from "@/app/api/admin/preset/gst/handler";

// methods
export const GET = handleGetGSTs;

export const POST = handleAddGSTs;

export const PATCH = handleUpdateGSTs;

export const DELETE = handleDeleteGSTs;

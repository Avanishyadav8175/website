// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCareInfo,
  handleUpdateCareInfo,
  handleDeleteCareInfo
} from "@/app/api/admin/preset/care-info/handler";

// methods
export const GET = handleGetCareInfo;

export const PATCH = handleUpdateCareInfo;

export const DELETE = handleDeleteCareInfo;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCareInfos,
  handleDeleteCareInfos,
  handleGetCareInfos,
  handleUpdateCareInfos
} from "@/app/api/admin/preset/care-info/handler";

// methods
export const GET = handleGetCareInfos;

export const POST = handleAddCareInfos;

export const PATCH = handleUpdateCareInfos;

export const DELETE = handleDeleteCareInfos;

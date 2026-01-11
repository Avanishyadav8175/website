// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCommission,
  handleUpdateCommission,
  handleDeleteCommission
} from "@/app/api/admin/preset/commission/handler";

// methods
export const GET = handleGetCommission;

export const PATCH = handleUpdateCommission;

export const DELETE = handleDeleteCommission;

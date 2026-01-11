// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCommissions,
  handleDeleteCommissions,
  handleGetCommissions,
  handleUpdateCommissions
} from "@/app/api/admin/preset/commission/handler";

// methods
export const GET = handleGetCommissions;

export const POST = handleAddCommissions;

export const PATCH = handleUpdateCommissions;

export const DELETE = handleDeleteCommissions;

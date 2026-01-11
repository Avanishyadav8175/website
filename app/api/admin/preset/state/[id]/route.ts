// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetState,
  handleUpdateState,
  handleDeleteState
} from "@/app/api/admin/preset/state/handler";

// methods
export const GET = handleGetState;

export const PATCH = handleUpdateState;

export const DELETE = handleDeleteState;

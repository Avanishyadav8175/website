// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddStates,
  handleDeleteStates,
  handleGetStates,
  handleUpdateStates
} from "@/app/api/admin/preset/state/handler";

// methods
export const GET = handleGetStates;

export const POST = handleAddStates;

export const PATCH = handleUpdateStates;

export const DELETE = handleDeleteStates;

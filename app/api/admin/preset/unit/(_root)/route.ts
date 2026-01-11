// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddUnits,
  handleDeleteUnits,
  handleGetUnits,
  handleUpdateUnits
} from "@/app/api/admin/preset/unit/handler";

// methods
export const GET = handleGetUnits;

export const POST = handleAddUnits;

export const PATCH = handleUpdateUnits;

export const DELETE = handleDeleteUnits;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetUnit,
  handleUpdateUnit,
  handleDeleteUnit
} from "@/app/api/admin/preset/unit/handler";

// methods
export const GET = handleGetUnit;

export const PATCH = handleUpdateUnit;

export const DELETE = handleDeleteUnit;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddColors,
  handleDeleteColors,
  handleGetColors,
  handleUpdateColors
} from "@/app/api/admin/preset/color/handler";

// methods
export const GET = handleGetColors;

export const POST = handleAddColors;

export const PATCH = handleUpdateColors;

export const DELETE = handleDeleteColors;

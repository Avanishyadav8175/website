// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetColor,
  handleUpdateColor,
  handleDeleteColor
} from "@/app/api/admin/preset/color/handler";

// methods
export const GET = handleGetColor;

export const PATCH = handleUpdateColor;

export const DELETE = handleDeleteColor;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddEnhancements,
  handleDeleteEnhancements,
  handleGetEnhancements,
  handleUpdateEnhancements
} from "@/app/api/admin/preset/enhancement/handler";

// methods
export const GET = handleGetEnhancements;

export const POST = handleAddEnhancements;

export const PATCH = handleUpdateEnhancements;

export const DELETE = handleDeleteEnhancements;

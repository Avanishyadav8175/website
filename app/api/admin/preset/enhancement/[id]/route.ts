// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetEnhancement,
  handleUpdateEnhancement,
  handleDeleteEnhancement
} from "@/app/api/admin/preset/enhancement/handler";

// methods
export const GET = handleGetEnhancement;

export const PATCH = handleUpdateEnhancement;

export const DELETE = handleDeleteEnhancement;

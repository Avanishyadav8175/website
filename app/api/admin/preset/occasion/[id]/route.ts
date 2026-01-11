// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetOccasion,
  handleUpdateOccasion,
  handleDeleteOccasion
} from "@/app/api/admin/preset/occasion/handler";

// methods
export const GET = handleGetOccasion;

export const PATCH = handleUpdateOccasion;

export const DELETE = handleDeleteOccasion;

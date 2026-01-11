// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddOccasions,
  handleDeleteOccasions,
  handleGetOccasions,
  handleUpdateOccasions
} from "@/app/api/admin/preset/occasion/handler";

// methods
export const GET = handleGetOccasions;

export const POST = handleAddOccasions;

export const PATCH = handleUpdateOccasions;

export const DELETE = handleDeleteOccasions;

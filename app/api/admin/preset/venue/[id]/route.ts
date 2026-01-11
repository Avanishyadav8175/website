// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetVenue,
  handleUpdateVenue,
  handleDeleteVenue
} from "@/app/api/admin/preset/venue/handler";

// methods
export const GET = handleGetVenue;

export const PATCH = handleUpdateVenue;

export const DELETE = handleDeleteVenue;

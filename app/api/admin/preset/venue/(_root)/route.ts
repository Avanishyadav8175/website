// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddVenues,
  handleDeleteVenues,
  handleGetVenues,
  handleUpdateVenues
} from "@/app/api/admin/preset/venue/handler";

// methods
export const GET = handleGetVenues;

export const POST = handleAddVenues;

export const PATCH = handleUpdateVenues;

export const DELETE = handleDeleteVenues;

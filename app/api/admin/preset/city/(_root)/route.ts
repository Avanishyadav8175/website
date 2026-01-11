// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCities,
  handleDeleteCities,
  handleGetCities,
  handleUpdateCities
} from "@/app/api/admin/preset/city/handler";

// methods
export const GET = handleGetCities;

export const POST = handleAddCities;

export const PATCH = handleUpdateCities;

export const DELETE = handleDeleteCities;

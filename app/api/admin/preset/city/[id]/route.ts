// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCity,
  handleUpdateCity,
  handleDeleteCity
} from "@/app/api/admin/preset/city/handler";

// methods
export const GET = handleGetCity;

export const PATCH = handleUpdateCity;

export const DELETE = handleDeleteCity;

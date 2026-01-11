// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAddon,
  handleUpdateAddon,
  handleDeleteAddon
} from "@/app/api/admin/content/addon/handler";

// methods
export const GET = handleGetAddon;

export const PATCH = handleUpdateAddon;

export const DELETE = handleDeleteAddon;

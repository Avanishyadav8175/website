// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAddons,
  handleDeleteAddons,
  handleGetAddons,
  handleUpdateAddons
} from "@/app/api/admin/content/addon/handler";

// methods
export const GET = handleGetAddons;

export const POST = handleAddAddons;

export const PATCH = handleUpdateAddons;

export const DELETE = handleDeleteAddons;

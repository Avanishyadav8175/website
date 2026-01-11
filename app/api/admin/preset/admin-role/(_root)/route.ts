// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAdminRoles,
  handleDeleteAdminRoles,
  handleGetAdminRoles,
  handleUpdateAdminRoles
} from "@/app/api/admin/preset/admin-role/handler";

// methods
export const GET = handleGetAdminRoles;

export const POST = handleAddAdminRoles;

export const PATCH = handleUpdateAdminRoles;

export const DELETE = handleDeleteAdminRoles;

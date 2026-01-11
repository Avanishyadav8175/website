// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAdminRole,
  handleUpdateAdminRole,
  handleDeleteAdminRole
} from "@/app/api/admin/preset/admin-role/handler";

// methods
export const GET = handleGetAdminRole;

export const PATCH = handleUpdateAdminRole;

export const DELETE = handleDeleteAdminRole;

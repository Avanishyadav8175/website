// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAdmin,
  handleUpdateAdmin,
  handleDeleteAdmin
} from "@/app/api/admin/user/admin/handler";

// methods
export const GET = handleGetAdmin;

export const PATCH = handleUpdateAdmin;

export const DELETE = handleDeleteAdmin;

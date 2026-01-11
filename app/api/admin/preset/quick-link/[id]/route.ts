// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetQuickLink,
  handleUpdateQuickLink,
  handleDeleteQuickLink
} from "@/app/api/admin/preset/quick-link/handler";

// methods
export const GET = handleGetQuickLink;

export const PATCH = handleUpdateQuickLink;

export const DELETE = handleDeleteQuickLink;

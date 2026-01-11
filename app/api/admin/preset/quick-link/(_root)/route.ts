// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddQuickLinks,
  handleDeleteQuickLinks,
  handleGetQuickLinks,
  handleUpdateQuickLinks
} from "@/app/api/admin/preset/quick-link/handler";

// methods
export const GET = handleGetQuickLinks;

export const POST = handleAddQuickLinks;

export const PATCH = handleUpdateQuickLinks;

export const DELETE = handleDeleteQuickLinks;

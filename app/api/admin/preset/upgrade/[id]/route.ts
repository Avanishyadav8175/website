// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetUpgrade,
  handleUpdateUpgrade,
  handleDeleteUpgrade
} from "@/app/api/admin/preset/upgrade/handler";

// methods
export const GET = handleGetUpgrade;

export const PATCH = handleUpdateUpgrade;

export const DELETE = handleDeleteUpgrade;

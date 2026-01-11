// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddUpgrades,
  handleDeleteUpgrades,
  handleGetUpgrades,
  handleUpdateUpgrades
} from "@/app/api/admin/preset/upgrade/handler";

// methods
export const GET = handleGetUpgrades;

export const POST = handleAddUpgrades;

export const PATCH = handleUpdateUpgrades;

export const DELETE = handleDeleteUpgrades;

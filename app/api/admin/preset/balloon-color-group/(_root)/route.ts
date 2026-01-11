// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddBalloonColorGroups,
  handleDeleteBalloonColorGroups,
  handleGetBalloonColorGroups,
  handleUpdateBalloonColorGroups
} from "@/app/api/admin/preset/balloon-color-group/handler";

// methods
export const GET = handleGetBalloonColorGroups;

export const POST = handleAddBalloonColorGroups;

export const PATCH = handleUpdateBalloonColorGroups;

export const DELETE = handleDeleteBalloonColorGroups;

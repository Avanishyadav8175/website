// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetBalloonColorGroup,
  handleUpdateBalloonColorGroup,
  handleDeleteBalloonColorGroup
} from "@/app/api/admin/preset/balloon-color-group/handler";

// methods
export const GET = handleGetBalloonColorGroup;

export const PATCH = handleUpdateBalloonColorGroup;

export const DELETE = handleDeleteBalloonColorGroup;

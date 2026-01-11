// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetLabel,
  handleUpdateLabel,
  handleDeleteLabel
} from "@/app/api/admin/preset/label/handler";

// methods
export const GET = handleGetLabel;

export const PATCH = handleUpdateLabel;

export const DELETE = handleDeleteLabel;

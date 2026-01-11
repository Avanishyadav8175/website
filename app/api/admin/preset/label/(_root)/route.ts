// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddLabels,
  handleDeleteLabels,
  handleGetLabels,
  handleUpdateLabels
} from "@/app/api/admin/preset/label/handler";

// methods
export const GET = handleGetLabels;

export const POST = handleAddLabels;

export const PATCH = handleUpdateLabels;

export const DELETE = handleDeleteLabels;

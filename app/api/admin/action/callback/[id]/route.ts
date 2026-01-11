// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCallback,
  handleUpdateCallback,
  handleDeleteCallback
} from "@/app/api/admin/action/callback/handler";

// methods
export const GET = handleGetCallback;

export const PATCH = handleUpdateCallback;

export const DELETE = handleDeleteCallback;

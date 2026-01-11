// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCancellationPolicy,
  handleUpdateCancellationPolicy,
  handleDeleteCancellationPolicy
} from "@/app/api/admin/preset/cancellation-policy/handler";

// methods
export const GET = handleGetCancellationPolicy;

export const PATCH = handleUpdateCancellationPolicy;

export const DELETE = handleDeleteCancellationPolicy;

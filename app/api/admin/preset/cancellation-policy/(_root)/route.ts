// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCancellationPolicies,
  handleDeleteCancellationPolicies,
  handleGetCancellationPolicies,
  handleUpdateCancellationPolicies
} from "@/app/api/admin/preset/cancellation-policy/handler";

// methods
export const GET = handleGetCancellationPolicies;

export const POST = handleAddCancellationPolicies;

export const PATCH = handleUpdateCancellationPolicies;

export const DELETE = handleDeleteCancellationPolicies;

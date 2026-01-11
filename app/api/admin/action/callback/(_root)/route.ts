// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCallbacks,
  handleGetCallbacks
} from "@/app/api/admin/action/callback/handler";

// methods
export const GET = handleGetCallbacks;

export const POST = handleAddCallbacks;

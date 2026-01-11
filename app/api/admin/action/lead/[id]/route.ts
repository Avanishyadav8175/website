// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetLead,
  handleUpdateLead,
  handleDeleteLead
} from "@/app/api/admin/action/lead/handler";

// methods
export const GET = handleGetLead;

export const PATCH = handleUpdateLead;

export const DELETE = handleDeleteLead;

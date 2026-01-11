// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddLeads,
  handleGetLeads
} from "@/app/api/admin/action/lead/handler";

// methods
export const GET = handleGetLeads;

export const POST = handleAddLeads;

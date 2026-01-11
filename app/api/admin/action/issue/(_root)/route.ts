// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddIssues,
  handleGetIssues
} from "@/app/api/admin/action/issue/handler";

// methods
export const GET = handleGetIssues;

export const POST = handleAddIssues;

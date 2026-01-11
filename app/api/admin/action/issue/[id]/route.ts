// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetIssue,
  handleUpdateIssue,
  handleDeleteIssue
} from "@/app/api/admin/action/issue/handler";

// methods
export const GET = handleGetIssue;

export const PATCH = handleUpdateIssue;

export const DELETE = handleDeleteIssue;

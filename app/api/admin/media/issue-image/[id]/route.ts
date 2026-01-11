// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetIssueImage,
  handleUpdateIssueImage,
  handleDeleteIssueImage
} from "@/app/api/admin/media/issue-image/handler";

// methods
export const GET = handleGetIssueImage;

export const PATCH = handleUpdateIssueImage;

export const DELETE = handleDeleteIssueImage;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddIssueImages,
  handleDeleteIssueImages,
  handleGetIssueImages,
  handleUpdateIssueImages
} from "@/app/api/admin/media/issue-image/handler";

// methods
export const GET = handleGetIssueImages;

export const POST = handleAddIssueImages;

export const PATCH = handleUpdateIssueImages;

export const DELETE = handleDeleteIssueImages;

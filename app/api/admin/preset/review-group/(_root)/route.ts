// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddReviewGroups,
  handleDeleteReviewGroups,
  handleGetReviewGroups,
  handleUpdateReviewGroups
} from "@/app/api/admin/preset/review-group/handler";

// methods
export const GET = handleGetReviewGroups;

export const POST = handleAddReviewGroups;

export const PATCH = handleUpdateReviewGroups;

export const DELETE = handleDeleteReviewGroups;

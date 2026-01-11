// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetReviewGroup,
  handleUpdateReviewGroup,
  handleDeleteReviewGroup
} from "@/app/api/admin/preset/review-group/handler";

// methods
export const GET = handleGetReviewGroup;

export const PATCH = handleUpdateReviewGroup;

export const DELETE = handleDeleteReviewGroup;

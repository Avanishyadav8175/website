// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetReview,
  handleUpdateReview,
  handleDeleteReview
} from "@/app/api/admin/dynamic/review/handler";

// methods
export const GET = handleGetReview;

export const PATCH = handleUpdateReview;

export const DELETE = handleDeleteReview;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddReviewImages,
  handleDeleteReviewImages,
  handleGetReviewImages,
  handleUpdateReviewImages
} from "@/app/api/admin/media/review-image/handler";

// methods
export const GET = handleGetReviewImages;

export const POST = handleAddReviewImages;

export const PATCH = handleUpdateReviewImages;

export const DELETE = handleDeleteReviewImages;

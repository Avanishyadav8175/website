// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetReviewImage,
  handleUpdateReviewImage,
  handleDeleteReviewImage
} from "@/app/api/admin/media/review-image/handler";

// methods
export const GET = handleGetReviewImage;

export const PATCH = handleUpdateReviewImage;

export const DELETE = handleDeleteReviewImage;

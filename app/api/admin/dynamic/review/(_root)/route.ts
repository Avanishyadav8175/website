// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddReviews,
  handleGetReviews
} from "@/app/api/admin/dynamic/review/handler";

// methods
export const GET = handleGetReviews;

export const POST = handleAddReviews;

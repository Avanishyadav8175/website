// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetPromotionTag,
  handleUpdatePromotionTag,
  handleDeletePromotionTag
} from "@/app/api/admin/preset/promotion-tag/handler";

// methods
export const GET = handleGetPromotionTag;

export const PATCH = handleUpdatePromotionTag;

export const DELETE = handleDeletePromotionTag;

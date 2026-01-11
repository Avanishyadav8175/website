// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddPromotionTags,
  handleDeletePromotionTags,
  handleGetPromotionTags,
  handleUpdatePromotionTags
} from "@/app/api/admin/preset/promotion-tag/handler";

// methods
export const GET = handleGetPromotionTags;

export const POST = handleAddPromotionTags;

export const PATCH = handleUpdatePromotionTags;

export const DELETE = handleDeletePromotionTags;

// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCoupon,
  handleUpdateCoupon,
  handleDeleteCoupon
} from "@/app/api/admin/content/coupon/handler";

// methods
export const GET = handleGetCoupon;

export const PATCH = handleUpdateCoupon;

export const DELETE = handleDeleteCoupon;

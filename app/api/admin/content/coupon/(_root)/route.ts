// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCoupons,
  handleDeleteCoupons,
  handleGetCoupons,
  handleUpdateCoupons
} from "@/app/api/admin/content/coupon/handler";

// methods
export const GET = handleGetCoupons;

export const POST = handleAddCoupons;

export const PATCH = handleUpdateCoupons;

export const DELETE = handleDeleteCoupons;

// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CouponDocument,
  type CouponModel
} from "@/common/types/documentation/contents/coupon";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CouponDocument, CouponModel>(MODELS.Coupons);

export const handleGetCoupons = getDocuments();
export const handleGetCoupon = getDocument();
export const handleAddCoupons = addDocuments();
export const handleUpdateCoupon = updateDocument();
export const handleUpdateCoupons = updateDocuments();
export const handleDeleteCoupon = deleteDocument();
export const handleDeleteCoupons = deleteDocuments();

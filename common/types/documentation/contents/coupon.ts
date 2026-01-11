// libraries
import { Model } from "mongoose";

// types
import { type ContentDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";
import { type CouponValidityDocument } from "@/common/types/documentation/nestedDocuments/couponValidity";
import { type ObjectId } from "mongoose";

// document
export interface CouponDocument extends Document {
  type: "discount" | "free-delivery";
  code: string;
  description: string;
  minimumOrderAmount: number;
  limitPerCustomer: number;
  valid: CouponValidityDocument;
  discount?: CouponDiscountDocument;
  applicableCategories: string[] | ObjectId[] | ContentCategoryDocument[];
}

// model
export interface CouponModel extends Model<CouponDocument> {}

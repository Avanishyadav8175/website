// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface VendorOfferCategoryDocument extends Document {
  type: "product" | "service";
  name: string;
}

// model
export interface VendorOfferCategoryModel
  extends Model<VendorOfferCategoryDocument> {}

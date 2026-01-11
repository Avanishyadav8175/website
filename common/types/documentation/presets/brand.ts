// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type RatingDocument } from "@/common/types/documentation/nestedDocuments/rating";

// document
export interface BrandDocument extends Document {
  name: string;
  mail: string;
  contactNumber: string;
  address: string;
  banner?: BannerDocument;
  rating?: RatingDocument;
  reviews?: string[];
}

// model
export interface BrandModel extends Model<BrandDocument> {}

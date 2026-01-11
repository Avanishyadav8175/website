// libraries
import { Model } from "mongoose";

// types
import { type DynamicDocument as Document } from "@/common/types/documentation/_document";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ObjectId } from "mongoose";
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";

// document
export interface ReviewDocument extends Document {
  customer: string | ObjectId | CustomerDocument;
  content: string | ObjectId | ContentDocument;
  rating: number;
  review?: string;
  images?: string[] | ObjectId[] | ReviewImageDocument[];
  isActive: boolean;
  isDeleted: boolean;
}

// model
export interface ReviewModel extends Model<ReviewDocument> {}

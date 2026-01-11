// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";

// document
export interface ContentQualityDocument extends Document {
  rating?: ContentRatingDocument;
  review?: ContentReviewDocument;
}

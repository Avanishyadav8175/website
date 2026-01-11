// libraries
import { Model } from "mongoose";

// types
import { type CategoryDocument } from "@/common/types/documentation/_document";
import { type CategoryChargesDocument } from "@/common/types/documentation/nestedDocuments/categoryCharges";
import { type CategoryMediaDocument } from "@/common/types/documentation/nestedDocuments/categoryMedia";
import { type CategoryMetaDocument } from "@/common/types/documentation/nestedDocuments/categoryMeta";
import { type CategoryPageDocument } from "@/common/types/documentation/nestedDocuments/categoryPage";
import { type InfoDocument } from "@/common/types/documentation/nestedDocuments/info";
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";
import { type RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";
import { type SEODocument } from "@/common/types/documentation/nestedDocuments/seo";

// document
export interface ContentCategoryDocument extends CategoryDocument {
  name: string;
  slug: string;
  redirectFrom?: string[];
  relatedCategories: RelatedContentCategoriesDocument;
  info: InfoDocument;
  charges: CategoryChargesDocument;
  media: CategoryMediaDocument;
  seo: SEODocument;
  personalizedReviews?: PersonalizedReviewDocument[];
  _meta?: CategoryMetaDocument;
  _page?: CategoryPageDocument;
}

// model
export interface ContentCategoryModel extends Model<ContentCategoryDocument> {}

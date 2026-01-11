// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type CategoryPageDocument } from "@/common/types/documentation/nestedDocuments/categoryPage";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type InfoDocument } from "@/common/types/documentation/nestedDocuments/info";
import { type ObjectId } from "mongoose";
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";
import { type RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";
import { type SEODocument } from "@/common/types/documentation/nestedDocuments/seo";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type TopicMediaDocument } from "@/common/types/documentation/nestedDocuments/topicMedia";

// document
export interface SubTopicDocument extends Document {
  category: string | ObjectId | ContentCategoryDocument;
  topic: string | ObjectId | TopicDocument;
  name: string;
  slug: string;
  redirectFrom?: string[];
  city?: string | ObjectId | CityDocument;
  relatedCategories: RelatedContentCategoriesDocument;
  info: InfoDocument;
  media: TopicMediaDocument;
  seo: SEODocument;
  personalizedReviews?: PersonalizedReviewDocument[];
  contents: string[] | ObjectId[] | ContentDocument[];
  _page?: CategoryPageDocument;
}

// model
export interface SubTopicModel extends Model<SubTopicDocument> {}

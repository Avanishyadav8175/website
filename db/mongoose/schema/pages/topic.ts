// libraries
import { Schema } from "mongoose";

// schemas
import { categoryPageSchema } from "@/db/mongoose/schema/nestedDocuments/categoryPage";
import { infoSchema } from "@/db/mongoose/schema/nestedDocuments/info";
import { personalizedReviewSchema } from "../nestedDocuments/personalizedReview";
import { relatedContentCategoriesSchema } from "@/db/mongoose/schema/nestedDocuments/relatedContentCategories";
import { seoSchema } from "@/db/mongoose/schema/nestedDocuments/seo";
import { topicMediaSchema } from "@/db/mongoose/schema/nestedDocuments/topicMedia";

// types
import {
  TopicDocument,
  TopicModel
} from "@/common/types/documentation/pages/topic";

// schema
export const topicSchema = new Schema<TopicDocument, TopicModel>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "ContentCategory",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    redirectFrom: [
      {
        type: String,
        required: false
      }
    ],
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: false
    },
    relatedCategories: {
      type: relatedContentCategoriesSchema,
      required: false
    },
    info: {
      type: infoSchema,
      required: false
    },
    media: {
      type: topicMediaSchema,
      required: false
    },
    seo: {
      type: seoSchema,
      required: false
    },
    personalizedReviews: [
      {
        type: personalizedReviewSchema,
        required: false,
        default: []
      }
    ],
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    _page: {
      type: categoryPageSchema,
      required: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
topicSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

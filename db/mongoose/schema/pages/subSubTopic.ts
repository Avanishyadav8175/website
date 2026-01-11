// libraries
import { Schema } from "mongoose";

// schemas
import { categoryPageSchema } from "@/db/mongoose/schema/nestedDocuments/categoryPage";
import { infoSchema } from "@/db/mongoose/schema/nestedDocuments/info";
import { seoSchema } from "@/db/mongoose/schema/nestedDocuments/seo";
import { personalizedReviewSchema } from "../nestedDocuments/personalizedReview";
import { relatedContentCategoriesSchema } from "@/db/mongoose/schema/nestedDocuments/relatedContentCategories";
import { topicMediaSchema } from "@/db/mongoose/schema/nestedDocuments/topicMedia";

// types
import {
  SubSubTopicDocument,
  SubSubTopicModel
} from "@/common/types/documentation/pages/subSubTopic";

// schema
export const subSubTopicSchema = new Schema<SubSubTopicDocument, SubSubTopicModel>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "ContentCategory",
      required: true
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    subTopic: {
      type: Schema.Types.ObjectId,
      ref: "SubTopic",
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
subSubTopicSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

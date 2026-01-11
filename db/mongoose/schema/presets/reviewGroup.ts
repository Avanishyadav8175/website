// libraries
import { Schema } from "mongoose";

// types
import {
  type ReviewGroupDocument,
  type ReviewGroupModel
} from "@/common/types/documentation/presets/reviewGroup";

// schema
export const reviewGroupSchema = new Schema<
  ReviewGroupDocument,
  ReviewGroupModel
>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "ContentCategory",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    reviews: [
      {
        type: String,
        required: true
      }
    ],
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
reviewGroupSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

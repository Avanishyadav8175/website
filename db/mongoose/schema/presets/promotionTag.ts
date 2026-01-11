// libraries
import { Schema } from "mongoose";

// types
import {
  type PromotionTagDocument,
  type PromotionTagModel
} from "@/common/types/documentation/presets/promotionTag";

// schema
export const promotionTagSchema = new Schema<
  PromotionTagDocument,
  PromotionTagModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true
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
promotionTagSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

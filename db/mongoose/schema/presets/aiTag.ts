// libraries
import { Schema } from "mongoose";

// types
import {
  type AITagDocument,
  type AITagModel
} from "@/common/types/documentation/presets/aiTag";

// schema
export const aiTagSchema = new Schema<AITagDocument, AITagModel>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "AITagCategory",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
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
aiTagSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

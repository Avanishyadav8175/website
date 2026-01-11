// libraries
import { Schema } from "mongoose";

// schemas
import { qaSchema } from "@/db/mongoose/schema/nestedDocuments/qa";

// types
import {
  type FAQGroupDocument,
  type FAQGroupModel
} from "@/common/types/documentation/presets/faqGroup";

// schema
export const faqGroupSchema = new Schema<FAQGroupDocument, FAQGroupModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    faqs: [
      {
        type: qaSchema,
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
faqGroupSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

// libraries
import { Schema } from "mongoose";

// types
import { EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

// schemas
export const edibleSchema = new Schema<EdibleDocument>(
  {
    isEdible: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      enum: ["unspecified", "veg", "non-veg"],
      required: false
    }
  },
  { timestamps: true }
);

// libraries
import { Schema } from "mongoose";

// types
import { LayoutCategoryDocument } from "@/common/types/documentation/nestedDocuments/layoutCategory";
import { clickableImageSchema } from "./clickableImage";

// schema
export const layoutCategorySchema = new Schema<LayoutCategoryDocument>(
  {
    shape: {
      type: String,
      enum: ["circle", "square"],
      required: false,
      default: "square"
    },
    columns: {
      type: Number,
      enum: [2, 3, 4, 5, 6],
      required: false,
      default: 4
    },
    images: [
      {
        type: clickableImageSchema,
        required: true
      }
    ],
    scrollable: {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
);

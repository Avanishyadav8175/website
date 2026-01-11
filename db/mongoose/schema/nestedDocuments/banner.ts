// libraries
import { Schema } from "mongoose";

// schemas
import { bannerImageSchema } from "@/db/mongoose/schema/nestedDocuments/bannerImage";

// types
import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";

// schemas
export const bannerSchema = new Schema<BannerDocument>(
  {
    type: {
      type: String,
      enum: ["default", "mini", "micro", "large", "square"],
      required: false
    },
    autoScroll: {
      type: Boolean,
      required: false,
      default: true
    },
    scrollInterval: {
      type: Number,
      required: false,
      default: 7
    },
    loopInfinitely: {
      type: Boolean,
      required: false,
      default: true
    },
    showIndicators: {
      type: Boolean,
      required: false,
      default: true
    },
    images: [
      {
        type: bannerImageSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);

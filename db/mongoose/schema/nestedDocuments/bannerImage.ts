// libraries
import { Schema } from "mongoose";

// types
import { BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";

// schemas
export const bannerImageSchema = new Schema<BannerImageDocument>(
  {
    desktop: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    mobile: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    path: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

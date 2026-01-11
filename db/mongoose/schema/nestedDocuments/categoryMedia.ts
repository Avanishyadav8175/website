// libraries
import { Schema } from "mongoose";

// schemas
import { bannerSchema } from "@/db/mongoose/schema/nestedDocuments/banner";
import { clickableImageSchema } from "@/db/mongoose/schema/nestedDocuments/clickableImage";

// types
import { type CategoryMediaDocument } from "@/common/types/documentation/nestedDocuments/categoryMedia";

// schemas
export const categoryMediaSchema = new Schema<CategoryMediaDocument>(
  {
    icon: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    banner: {
      type: bannerSchema,
      required: false
    },
    quickLinks: [
      {
        type: clickableImageSchema,
        required: false
      }
    ]
  },
  { timestamps: true }
);

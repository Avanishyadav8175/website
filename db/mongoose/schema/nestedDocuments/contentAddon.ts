// libraries
import { Schema } from "mongoose";

// types
import { ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

// schemas
export const contentAddonSchema = new Schema<ContentAddonDocument>(
  {
    addon: {
      type: Schema.Types.ObjectId,
      ref: "Addon",
      required: true
    },
    isPopular: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);

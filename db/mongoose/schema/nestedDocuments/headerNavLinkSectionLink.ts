// libraries
import { Schema } from "mongoose";

// types
import { HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

// schema
export const headerNavLinkSectionLinkSchema =
  new Schema<HeaderNavLinkSectionLinkDocument>(
    {
      label: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      tag: {
        type: Schema.Types.ObjectId,
        ref: "PromotionTag",
        required: false
      }
    },
    { timestamps: true }
  );

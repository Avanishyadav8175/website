// libraries
import { Schema } from "mongoose";

// types
import { FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

// schema
export const footerSectionLinkSchema = new Schema<FooterSectionLinkDocument>(
  {
    label: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// libraries
import { Schema } from "mongoose";

// schemas
import { linkSchema } from "@/db/mongoose/schema/nestedDocuments/link";

// types
import { LayoutQuickLinkDocument } from "@/common/types/documentation/nestedDocuments/layoutQuickLink";

// schema
export const layoutQuickLinkSchema = new Schema<LayoutQuickLinkDocument>(
  {
    heading: {
      type: String,
      required: true
    },
    links: [
      {
        type: linkSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);

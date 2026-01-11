// libraries
import { Schema } from "mongoose";

// schemas
import { headerNavLinkSectionLinkSchema } from "@/db/mongoose/schema/nestedDocuments/headerNavLinkSectionLink";

// types
import { HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

// schema
export const headerNavLinkSectionSchema =
  new Schema<HeaderNavLinkSectionDocument>(
    {
      heading: {
        type: String,
        required: true
      },
      links: [
        {
          type: headerNavLinkSectionLinkSchema,
          required: true
        }
      ]
    },
    { timestamps: true }
  );

// libraries
import { Schema } from "mongoose";

// schemas
import { bannerSchema } from "@/db/mongoose/schema/nestedDocuments/banner";
import { layoutCategorySchema } from "@/db/mongoose/schema/nestedDocuments/layoutCategory";
import { layoutCollageSchema } from "@/db/mongoose/schema/nestedDocuments/layoutCollage";
import { layoutQuickLinkSchema } from "@/db/mongoose/schema/nestedDocuments/layoutQuickLink";
import { qaSchema } from "@/db/mongoose/schema/nestedDocuments/qa";

// types
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";

// schema
export const pageLayoutSchema = new Schema<PageLayoutDocument>(
  {
    banner: {
      type: bannerSchema,
      required: false
    },
    category: {
      type: layoutCategorySchema,
      required: false
    },
    collage: {
      type: layoutCollageSchema,
      required: false
    },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    text: {
      type: String,
      required: false
    },
    faq: [
      {
        type: qaSchema,
        required: false
      }
    ],
    quickLink: [
      {
        type: layoutQuickLinkSchema,
        required: false
      }
    ]
  },
  { timestamps: true }
);

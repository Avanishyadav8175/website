// libraries
import { Schema } from "mongoose";

// schemas
import { qaSchema } from "@/db/mongoose/schema/nestedDocuments/qa";
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";
// import { seoSchemaSchema } from "@/db/mongoose/schema/nestedDocuments/seoSchema";

// types
import { SEODocument } from "@/common/types/documentation/nestedDocuments/seo";

// schemas
export const seoSchema = new Schema<SEODocument>(
  {
    // seoSchema: {
    //   type: seoSchemaSchema,
    //   required: true
    // },
    meta: {
      type: seoMetaSchema,
      required: true
    },
    faqs: [
      {
        type: qaSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);

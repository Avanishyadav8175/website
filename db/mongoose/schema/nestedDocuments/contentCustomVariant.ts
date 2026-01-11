// libraries
import { Schema } from "mongoose";

// schemas
import { contentPriceSchema } from "@/db/mongoose/schema/nestedDocuments/contentPrice";

// types
import { ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";

// schemas
export const contentCustomVariantSchema =
  new Schema<ContentCustomVariantDocument>(
    {
      label: {
        type: String,
        required: false
      },
      price: {
        type: contentPriceSchema,
        required: true
      },
      image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      },
      value: {
        type: Number,
        required: false
      }
    },
    { timestamps: true }
  );

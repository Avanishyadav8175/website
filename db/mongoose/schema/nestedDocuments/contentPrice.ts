// libraries
import { Schema } from "mongoose";

// schemas
import { contentBasePriceSchema } from "./contentBasePrice";
import { contentCityPriceSchema } from "./contentCityPrice";

// types
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

// schemas
export const contentPriceSchema = new Schema<ContentPriceDocument>(
  {
    base: {
      type: contentBasePriceSchema,
      required: true
    },
    cities: [
      {
        type: contentCityPriceSchema,
        required: false
      }
    ]
  },
  { timestamps: true }
);

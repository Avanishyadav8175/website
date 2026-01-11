// libraries
import { Schema } from "mongoose";

// types
import { ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

// schemas
export const contentCityPriceSchema = new Schema<ContentCityPriceDocument>(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

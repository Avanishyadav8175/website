// libraries
import { Schema } from "mongoose";

// types
import { ContentBasePriceDocument } from "@/common/types/documentation/nestedDocuments/contentBasePrice";

// schemas
export const contentBasePriceSchema = new Schema<ContentBasePriceDocument>(
  {
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

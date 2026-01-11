// libraries
import { Schema } from "mongoose";

// types
import { ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";

// schemas
export const contentFlavourItemSchema = new Schema<ContentFlavourItemDocument>(
  {
    flavour: {
      type: Schema.Types.ObjectId,
      ref: "Flavour",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

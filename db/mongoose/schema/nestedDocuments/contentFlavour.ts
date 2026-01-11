// libraries
import { Schema } from "mongoose";

// schemas
import { contentFlavourItemSchema } from "@/db/mongoose/schema/nestedDocuments/contentFlavourItem";

// types
import { ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";

// schemas
export const contentFlavourSchema = new Schema<ContentFlavourDocument>(
  {
    label: {
      type: Schema.Types.ObjectId,
      ref: "Label",
      required: true
    },
    default: {
      type: Schema.Types.ObjectId,
      ref: "Flavour",
      required: true
    },
    options: [
      {
        type: contentFlavourItemSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);

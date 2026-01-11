// libraries
import { Schema } from "mongoose";

// types
import { InfoDocument } from "@/common/types/documentation/nestedDocuments/info";

// schemas
export const infoSchema = new Schema<InfoDocument>(
  {
    openIn: {
      type: String,
      enum: ["_blank", "_self"],
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    topContent: {
      type: String,
      required: false
    },
    bottomContent: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

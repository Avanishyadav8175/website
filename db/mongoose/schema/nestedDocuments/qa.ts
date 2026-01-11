// libraries
import { Schema } from "mongoose";

// types
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";

// schemas
export const qaSchema = new Schema<QADocument>(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

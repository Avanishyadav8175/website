// libraries
import { Schema } from "mongoose";

// schemas
import { issueMessageSchema } from "@/db/mongoose/schema/nestedDocuments/issueMessage";

// types
import {
  IssueDocument,
  IssueModel
} from "@/common/types/documentation/actions/issue";

// schema
export const issueSchema = new Schema<IssueDocument, IssueModel>(
  {
    status: {
      type: String,
      enum: ["open", "close"],
      required: false,
      default: "open"
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    messages: [
      {
        type: issueMessageSchema,
        required: false
      }
    ],
    createdBy: {
      type: String,
      required: false
    },
    updatedBy: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// search index
issueSchema.index({
  createdBy: "text",
  updatedBy: "text"
});

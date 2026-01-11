// libraries
import { Schema } from "mongoose";

// types
import { IssueMessageDocument } from "@/common/types/documentation/nestedDocuments/issueMessage";

// schemas
export const issueMessageSchema = new Schema<IssueMessageDocument>(
  {
    from: {
      type: String,
      enum: ["admin", "customer"],
      required: true
    },
    text: {
      type: String,
      required: false
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "IssueImage",
        required: false
      }
    ]
  },
  { timestamps: true }
);

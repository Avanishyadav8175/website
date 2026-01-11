// libraries
import { Schema } from "mongoose";

// types
import {
  CallbackDocument,
  CallbackModel
} from "@/common/types/documentation/actions/callback";

// schema
export const callbackSchema = new Schema<CallbackDocument, CallbackModel>(
  {
    status: {
      type: String,
      enum: ["new", "in-progress", "interested", "not-interested"],
      required: false,
      default: "new"
    },
    contact: {
      type: String,
      required: true,
      unique: true
    },
    times: {
      type: Number,
      required: false,
      default: 1
    },
    submittedAt: {
      type: Date,
      required: true
    },
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
callbackSchema.index({
  contact: "text",
  createdBy: "text",
  updatedBy: "text"
});

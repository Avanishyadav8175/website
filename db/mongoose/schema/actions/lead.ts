// libraries
import { Schema } from "mongoose";

// schemas
import { cartItemSchema } from "@/db/mongoose/schema/nestedDocuments/cartItem";

// types
import {
  LeadDocument,
  LeadModel
} from "@/common/types/documentation/actions/lead";

// schema
export const leadSchema = new Schema<LeadDocument, LeadModel>(
  {
    status: {
      type: String,
      enum: ["new", "in-progress", "interested", "not-interested"],
      required: false,
      default: "new"
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: false
    },
    contact: {
      type: String,
      required: true,
      unique: true
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: false
    },
    cartItems: [
      {
        type: cartItemSchema,
        required: false
      }
    ],
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
leadSchema.index({
  contact: "text",
  createdBy: "text",
  updatedBy: "text"
});

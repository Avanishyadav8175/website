// libraries
import { Schema } from "mongoose";

// types
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";

// schemas
export const customerReminderSchema = new Schema<CustomerReminderDocument>(
  {
    recipientName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    occasion: {
      type: Schema.Types.ObjectId,
      ref: "Occasion",
      required: true
    },
    relation: {
      type: Schema.Types.ObjectId,
      ref: "Occasion",
      required: true
    },
    note: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

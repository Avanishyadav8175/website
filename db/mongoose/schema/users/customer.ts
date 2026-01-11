// libraries
import { Schema } from "mongoose";

// schemas
import { customerAddressSchema } from "@/db/mongoose/schema/nestedDocuments/customerAddress";
import { customerAvailedCouponSchema } from "@/db/mongoose/schema/nestedDocuments/customerAvailedCoupon";
import { customerPointsSchema } from "@/db/mongoose/schema/nestedDocuments/customerPoints";
import { customerReminderSchema } from "@/db/mongoose/schema/nestedDocuments/customerReminder";

// types
import {
  CustomerDocument,
  CustomerModel
} from "@/common/types/documentation/users/customer";

// schema
export const customerSchema = new Schema<CustomerDocument, CustomerModel>(
  {
    status: {
      type: String,
      enum: ["active", "blocked"],
      required: false,
      default: "active"
    },
    conversionStatus: {
      type: String,
      enum: ["new", "interested", "not-interested", "website", "whatsapp"],
      required: false,
      default: "new"
    },
    mobileNumber: {
      type: String,
      required: false
    },
    mail: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: false
    },
    dateOfBirth: {
      type: Date,
      required: false
    },
    addresses: [
      {
        type: customerAddressSchema,
        required: false,
        default: []
      }
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: false
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: false
      }
    ],
    availedCoupons: [
      {
        type: customerAvailedCouponSchema,
        required: true
      }
    ],
    lastVisitedContents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: true
      }
    ],
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
      }
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true
      }
    ],
    reminders: [
      {
        type: customerReminderSchema,
        required: false
      }
    ],
    points: {
      type: customerPointsSchema,
      required: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
customerSchema.index({
  name: "text",
  mobileNumber: "text",
  mail: "text",
  createdBy: "text",
  updatedBy: "text"
});

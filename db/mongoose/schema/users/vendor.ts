// libraries
import { Schema } from "mongoose";

// schemas
import { vendorBalanceSchema } from "@/db/mongoose/schema/nestedDocuments/vendorBalance";
import { vendorBusinessSchema } from "@/db/mongoose/schema/nestedDocuments/vendorBusiness";
import { vendorContactSchema } from "@/db/mongoose/schema/nestedDocuments/vendorContact";
import { vendorIdentificationSchema } from "@/db/mongoose/schema/nestedDocuments/vendorIdentification";
import { vendorLocationSchema } from "@/db/mongoose/schema/nestedDocuments/vendorLocation";
import { vendorPaymentSchema } from "@/db/mongoose/schema/nestedDocuments/vendorPayment";

// types
import {
  VendorDocument,
  VendorModel
} from "@/common/types/documentation/users/vendor";

// schema
export const vendorSchema = new Schema<VendorDocument, VendorModel>(
  {
    status: {
      type: String,
      enum: ["new", "active", "inactive", "blocked", "deleted"],
      required: false,
      default: "new"
    },
    businessName: {
      type: String,
      required: true,
      unique: true
    },
    ownerName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: vendorLocationSchema,
      required: true
    },
    contact: {
      type: vendorContactSchema,
      required: true
    },
    identification: {
      type: vendorIdentificationSchema,
      required: true
    },
    payment: {
      type: vendorPaymentSchema,
      required: false
    },
    business: {
      type: vendorBusinessSchema,
      required: false
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: false
      }
    ],
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    deliveries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Delivery",
        required: false
      }
    ],
    balance: {
      type: vendorBalanceSchema,
      required: false
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false
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
vendorSchema.index({
  businessName: "text",
  ownerName: "text",
  userName: "text",
  createdBy: "text",
  updatedBy: "text"
});

// libraries
import { Schema } from "mongoose";

// schemas
import { vendorRequestSocialMediaSchema } from "@/db/mongoose/schema/nestedDocuments/vendorRequestSocialMedia";

// types
import {
  VendorRequestDocument,
  VendorRequestModel
} from "@/common/types/documentation/actions/vendorRequest";

// schema
export const vendorRequestSchema = new Schema<
  VendorRequestDocument,
  VendorRequestModel
>(
  {
    status: {
      type: String,
      enum: ["new", "processing", "registered", "rejected"],
      required: true,
      default: "new"
    },
    businessName: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    whatsapp: {
      type: String,
      required: false
    },
    mail: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    socialMedia: [
      {
        type: vendorRequestSocialMediaSchema,
        required: false
      }
    ],
    website: {
      type: String,
      required: false
    },
    gstNumber: {
      type: String,
      required: false
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "VendorOfferCategory",
        required: true
      }
    ],
    foundUs: {
      type: Schema.Types.ObjectId,
      ref: "FoundUsSource",
      required: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
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
vendorRequestSchema.index({
  businessName: "text",
  createdBy: "text",
  updatedBy: "text"
});

// libraries
import { Schema } from "mongoose";

// schemas
import { vendorContactSocialSchema } from "@/db/mongoose/schema/nestedDocuments/vendorContactSocial";

// types
import { VendorContactDocument } from "@/common/types/documentation/nestedDocuments/vendorContact";

// schema
export const vendorContactSchema = new Schema<VendorContactDocument>(
  {
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    alternativeMobile: {
      type: String,
      required: false
    },
    whatsapp: {
      type: String,
      required: true,
      unique: true
    },
    mail: {
      type: String,
      required: true,
      unique: true
    },
    website: {
      type: String,
      required: false
    },
    social: {
      type: vendorContactSocialSchema,
      required: false
    }
  },
  { timestamps: true }
);

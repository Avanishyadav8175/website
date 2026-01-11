// libraries
import { Schema } from "mongoose";

// types
import { VendorContactSocialDocument } from "@/common/types/documentation/nestedDocuments/vendorContactSocial";

// schema
export const vendorContactSocialSchema =
  new Schema<VendorContactSocialDocument>(
    {
      facebook: {
        type: String,
        required: false
      },
      instagram: {
        type: String,
        required: false
      },
      youtube: {
        type: String,
        required: false
      }
    },
    { timestamps: true }
  );

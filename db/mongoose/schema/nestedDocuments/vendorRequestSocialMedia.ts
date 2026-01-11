// libraries
import { Schema } from "mongoose";

// types
import { VendorRequestSocialMediaDocument } from "@/common/types/documentation/nestedDocuments/vendorRequestSocialMedia";

// schemas
export const vendorRequestSocialMediaSchema =
  new Schema<VendorRequestSocialMediaDocument>(
    {
      name: {
        type: String,
        enum: ["facebook", "instagram", "youtube"],
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );

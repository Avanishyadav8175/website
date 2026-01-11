// libraries
import { Schema } from "mongoose";

// types
import { VendorBusinessCommissionDocument } from "@/common/types/documentation/nestedDocuments/vendorBusinessCommission";

// schema
export const vendorBusinessCommissionSchema =
  new Schema<VendorBusinessCommissionDocument>(
    {
      type: {
        type: String,
        enum: ["fixed", "percentage"],
        required: true
      },
      percentage: {
        type: Schema.Types.ObjectId,
        ref: "Commission",
        required: false
      }
    },
    { timestamps: true }
  );

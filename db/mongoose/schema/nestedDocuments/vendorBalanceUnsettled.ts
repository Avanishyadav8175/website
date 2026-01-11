// libraries
import { Schema } from "mongoose";

// types
import { VendorBalanceUnsettledDocument } from "@/common/types/documentation/nestedDocuments/vendorBalanceUnsettled";

// schema
export const vendorBalanceUnsettledSchema =
  new Schema<VendorBalanceUnsettledDocument>(
    {
      total: {
        type: Number,
        required: false,
        default: 0
      },
      collected: {
        type: Number,
        required: false,
        default: 0
      },
      pending: {
        type: Number,
        required: false,
        default: 0
      }
    },
    { timestamps: true }
  );

// libraries
import { Schema } from "mongoose";

// schemas
import { vendorBusinessCommissionSchema } from "@/db/mongoose/schema/nestedDocuments/vendorBusinessCommission";

// types
import { VendorBusinessDocument } from "@/common/types/documentation/nestedDocuments/vendorBusiness";

// schema
export const vendorBusinessSchema = new Schema<VendorBusinessDocument>(
  {
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "VendorOfferCategory",
        required: true
      }
    ],
    commission: {
      type: vendorBusinessCommissionSchema,
      required: true
    },
    paymentCycle: {
      type: Schema.Types.ObjectId,
      ref: "PaymentCycle",
      required: true
    },
    provideDelivery: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

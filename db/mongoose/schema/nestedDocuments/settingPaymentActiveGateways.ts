// libraries
import { Schema } from "mongoose";

// types
import { type SettingPaymentActiveGatewaysDocument } from "@/common/types/documentation/nestedDocuments/settingPaymentActiveGateways";

// schemas
export const settingPaymentActiveGatewaysSchema =
  new Schema<SettingPaymentActiveGatewaysDocument>(
    {
      razorpay: {
        type: Boolean,
        required: true
      },
      payu: {
        type: Boolean,
        required: true
      }
    },
    { timestamps: true }
  );

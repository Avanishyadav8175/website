// libraries
import { Schema } from "mongoose";

// schemas
import { settingPaymentActiveGatewaysSchema } from "@/db/mongoose/schema/nestedDocuments/settingPaymentActiveGateways";

// types
import { type SettingPaymentDocument } from "@/common/types/documentation/nestedDocuments/settingPayment";

// schemas
export const settingPaymentSchema = new Schema<SettingPaymentDocument>(
  {
    default: {
      type: String,
      enum: ["razorpay", "payu"],
      required: true
    },
    active: {
      type: settingPaymentActiveGatewaysSchema,
      required: true
    }
  },
  { timestamps: true }
);

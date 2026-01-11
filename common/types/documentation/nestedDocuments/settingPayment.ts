// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type SettingPaymentActiveGatewaysDocument } from "@/common/types/documentation/nestedDocuments/settingPaymentActiveGateways";

// document
export interface SettingPaymentDocument extends Document {
  default: "razorpay" | "payu";
  active: SettingPaymentActiveGatewaysDocument;
}

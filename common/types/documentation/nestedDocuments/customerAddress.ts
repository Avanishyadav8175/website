// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CustomerAddressDocument extends Document {
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  type: string;
  isDefault: boolean;
}

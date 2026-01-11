// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CartCheckoutLocationDocument extends Document {
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
}

// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CartCheckoutContactDocument extends Document {
  mobileNumber: string;
  alternateMobileNumber?: string;
  mail: string;
}

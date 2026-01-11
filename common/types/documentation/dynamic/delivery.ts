// libraries
import { Model } from "mongoose";

// types
import { type DynamicDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type DeliveryPaymentDocument } from "@/common/types/documentation/nestedDocuments/deliveryPayment";
import { type ObjectId } from "mongoose";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";

// document
export interface DeliveryDocument extends Document {
  status: "pending" | "completed" | "cancelled";
  order: string | ObjectId | OrderDocument;
  item: string | ObjectId | CartItemDocument;
  vendor: string | ObjectId | VendorDocument;
  payment: DeliveryPaymentDocument;
  isRequestedCancellation: boolean;
}

// model
export interface DeliveryModel extends Model<DeliveryDocument> {}

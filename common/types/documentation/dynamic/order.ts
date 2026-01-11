// libraries
import { Model } from "mongoose";

// types
import { type DynamicDocument as Document } from "@/common/types/documentation/_document";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type DeliveryDocument } from "@/common/types/documentation/dynamic/delivery";
import { type ObjectId } from "mongoose";
import { type OrderPaymentDocument } from "@/common/types/documentation/nestedDocuments/orderPayment";

// document
export interface OrderDocument extends Document {
  id: string;
  payment: OrderPaymentDocument;
  cart: string | ObjectId | CartDocument;
  deliveries?: string[] | ObjectId[] | DeliveryDocument[];
}

// model
export interface OrderModel extends Model<OrderDocument> {}

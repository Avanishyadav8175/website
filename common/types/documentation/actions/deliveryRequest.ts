// libraries
import { Model } from "mongoose";

// types
import { type ActionDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type ObjectId } from "mongoose";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";

// document
export interface DeliveryRequestDocument extends Document {
  status: "requested" | "accepted" | "denied";
  order: string | ObjectId | OrderDocument;
  item: string | ObjectId | CartItemDocument;
  vendor: string | ObjectId | VendorDocument;
  commission: number;
}

// model
export interface DeliveryRequestModel extends Model<DeliveryRequestDocument> {}

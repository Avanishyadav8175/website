// libraries
import { Model } from "mongoose";

// types
import { type DynamicDocument as Document } from "@/common/types/documentation/_document";
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ObjectId } from "mongoose";

// document
export interface CartDocument extends Document {
  isOrdered: boolean;
  customer: string | ObjectId | CustomerDocument;
  items: CartItemDocument[];
  price: CartPriceDocument;
  checkout?: CartCheckoutDocument;
  coupon?: string | ObjectId | CouponDocument;
}

// model
export interface CartModel extends Model<CartDocument> {}

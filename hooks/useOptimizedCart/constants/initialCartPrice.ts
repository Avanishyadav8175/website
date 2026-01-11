// libraries
import mongoose from "mongoose";

// types
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";

export const initialCartPrice = {
  _id: new mongoose.Types.ObjectId(),
  content: 0,
  addon: 0,
  customization: 0,
  deliveryCharge: 0,
  paymentPercentage: 100,
  couponDiscount: 0,
  total: 0,
  payable: 0,
  due: 0
} as CartPriceDocument;

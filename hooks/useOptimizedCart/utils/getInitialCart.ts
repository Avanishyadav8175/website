// libraries
import mongoose from "mongoose";

// constants
import { initialCartCheckout } from "../constants/initialCartCheckout";
import { initialCartPrice } from "../constants/initialCartPrice";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";

export const getInitialCart = (customerId?: string) =>
  ({
    _id: new mongoose.Types.ObjectId(),
    isOrdered: false,
    customer: customerId || "",
    items: [] as CartItemDocument[],
    price: {
      ...initialCartPrice
    },
    checkout: {
      ...initialCartCheckout
    },
    coupon: ""
  }) as CartDocument;

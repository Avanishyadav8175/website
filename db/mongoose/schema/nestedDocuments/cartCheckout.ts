// libraries
import { Schema } from "mongoose";

// schemas
import { cartCheckoutContactSchema } from "@/db/mongoose/schema/nestedDocuments/cartCheckoutContact";
import { cartCheckoutLocationSchema } from "@/db/mongoose/schema/nestedDocuments/cartCheckoutLocation";

// types
import { CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";

// schema
export const cartCheckoutSchema = new Schema<CartCheckoutDocument>(
  {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: cartCheckoutContactSchema,
      required: true
    },
    location: {
      type: cartCheckoutLocationSchema,
      required: true
    },
    note: {
      type: String,
      required: false
    },
    occasion: {
      type: Schema.Types.ObjectId,
      ref: "Occasion",
      required: false
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: false
    },
    deliverToSomeoneElse: {
      type: String,
      required: false
    },
    receiverName: {
      type: String,
      required: false
    },
    receiverMobileNumber: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

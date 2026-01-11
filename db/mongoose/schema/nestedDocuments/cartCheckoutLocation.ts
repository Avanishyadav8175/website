// libraries
import { Schema } from "mongoose";

// types
import { CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";

// schemas
export const cartCheckoutLocationSchema =
  new Schema<CartCheckoutLocationDocument>(
    {
      address: {
        type: String,
        required: true
      },
      landmark: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );

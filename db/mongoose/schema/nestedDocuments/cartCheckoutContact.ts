// libraries
import { Schema } from "mongoose";

// types
import { CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";

// schemas
export const cartCheckoutContactSchema =
  new Schema<CartCheckoutContactDocument>(
    {
      mobileNumber: {
        type: String,
        required: true
      },
      alternateMobileNumber: {
        type: String,
        required: false
      },
      mail: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );

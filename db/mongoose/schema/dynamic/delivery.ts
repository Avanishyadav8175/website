// libraries
import { Schema } from "mongoose";

// schemas
import { deliveryPaymentSchema } from "@/db/mongoose/schema/nestedDocuments/deliveryPayment";

// types
import {
  DeliveryDocument,
  DeliveryModel
} from "@/common/types/documentation/dynamic/delivery";

// schema
export const deliverySchema = new Schema<DeliveryDocument, DeliveryModel>(
  {
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: false,
      default: "pending"
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    item: {
      type: Schema.Types.ObjectId,
      required: true
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },
    payment: {
      type: deliveryPaymentSchema,
      required: true
    },
    isRequestedCancellation: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: false
    },
    updatedBy: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// search index
deliverySchema.index({
  createdBy: "text",
  updatedBy: "text"
});

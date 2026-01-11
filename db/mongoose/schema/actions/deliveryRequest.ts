// libraries
import { Schema } from "mongoose";

// types
import {
  DeliveryRequestDocument,
  DeliveryRequestModel
} from "@/common/types/documentation/actions/deliveryRequest";

// schema
export const deliveryRequestSchema = new Schema<
  DeliveryRequestDocument,
  DeliveryRequestModel
>(
  {
    status: {
      type: String,
      enum: ["requested", "accepted", "denied"],
      required: false,
      default: "requested"
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
    commission: {
      type: Number,
      required: true
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
deliveryRequestSchema.index({
  createdBy: "text",
  updatedBy: "text"
});

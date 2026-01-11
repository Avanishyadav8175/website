// libraries
import { Schema } from "mongoose";

// types
import {
  type DeliveryDetailDocument,
  type DeliveryDetailModel
} from "@/common/types/documentation/presets/deliveryDetail";

// schema
export const deliveryDetailSchema = new Schema<
  DeliveryDetailDocument,
  DeliveryDetailModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    content: [
      {
        type: String,
        required: true
      }
    ],
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
deliveryDetailSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});

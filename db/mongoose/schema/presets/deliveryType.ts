// libraries
import { Schema } from "mongoose";

// schemas
import { timeSlotSchema } from "@/db/mongoose/schema/nestedDocuments/timeSlot";

// types
import {
  type DeliveryTypeDocument,
  type DeliveryTypeModel
} from "@/common/types/documentation/presets/deliveryType";

// schema
export const deliveryTypeSchema = new Schema<
  DeliveryTypeDocument,
  DeliveryTypeModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    timeSlots: [
      {
        type: timeSlotSchema,
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
deliveryTypeSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});

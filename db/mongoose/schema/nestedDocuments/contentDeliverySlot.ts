// libraries
import { Schema } from "mongoose";

// types
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";

// schemas
export const contentDeliverySlotSchema =
  new Schema<ContentDeliverySlotDocument>(
    {
      type: {
        type: Schema.Types.ObjectId,
        ref: "DeliveryType",
        required: true
      },
      timeSlots: [
        {
          type: Schema.Types.ObjectId,
          required: true
        }
      ],
      price: {
        type: Number,
        required: true
      }
    },
    { timestamps: true }
  );

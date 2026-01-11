// libraries
import { Schema } from "mongoose";

// schemas
import { contentDeliverySlotSchema } from "@/db/mongoose/schema/nestedDocuments/contentDeliverySlot";

// types
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";

// schemas
export const contentDeliverySchema = new Schema<ContentDeliveryDocument>(
  {
    processingTime: {
      type: Schema.Types.ObjectId,
      ref: "ProcessingTime",
      required: true
    },
    slots: [
      {
        type: contentDeliverySlotSchema,
        required: false
      }
    ],
    charge: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

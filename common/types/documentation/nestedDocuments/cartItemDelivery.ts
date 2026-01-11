// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { type ObjectId } from "mongoose";

// document
export interface CartItemDeliveryDocument extends Document {
  date: string | Date;
  type?: string | ObjectId | DeliveryTypeDocument;
  slot?: string | ObjectId | TimeSlotDocument;
}

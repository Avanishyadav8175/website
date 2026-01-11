// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ObjectId } from "mongoose";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

// document
export interface ContentDeliverySlotDocument extends Document {
  type: string | ObjectId | DeliveryTypeDocument;
  timeSlots: string[] | TimeSlotDocument[];
  price: Number;
}

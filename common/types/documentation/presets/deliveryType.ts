// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

// document
export interface DeliveryTypeDocument extends Document {
  name: string;
  price: number;
  timeSlots: TimeSlotDocument[];
}

// model
export interface DeliveryTypeModel extends Model<DeliveryTypeDocument> {}

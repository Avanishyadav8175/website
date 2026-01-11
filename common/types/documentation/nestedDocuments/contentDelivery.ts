// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type ObjectId } from "mongoose";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

// document
export interface ContentDeliveryDocument extends Document {
  processingTime: string | ObjectId | ProcessingTimeDocument;
  slots?: ContentDeliverySlotDocument[];
  charge?: number;
}

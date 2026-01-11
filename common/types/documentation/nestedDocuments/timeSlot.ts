// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface TimeSlotDocument extends Document {
  label: string;
  startTime: string;
  endTime: string;
}

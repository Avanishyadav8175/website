// libraries
import { Schema } from "mongoose";

// types
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

// schemas
export const timeSlotSchema = new Schema<TimeSlotDocument>(
  {
    label: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

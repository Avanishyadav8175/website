// utils
import { convertTo12HourFormat } from "@/common/utils/time";

// types
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export const getLabelPlaceholder = (timeSlot: TimeSlotDocument) =>
  timeSlot.startTime && timeSlot.endTime
    ? `${convertTo12HourFormat(timeSlot.startTime)} - ${convertTo12HourFormat(timeSlot.endTime)}`
    : "";

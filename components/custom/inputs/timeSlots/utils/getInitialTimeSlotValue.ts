// libraries
import { v4 as uuid } from "uuid";

// types
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export const getInitialTimeSlotValue = () =>
  ({
    _id: uuid(),
    label: "",
    startTime: "",
    endTime: ""
  }) as TimeSlotDocument;

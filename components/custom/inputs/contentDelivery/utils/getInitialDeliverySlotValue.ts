// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export const getInitialDeliverySlotValue = () =>
  ({
    _id: uuid(),
    type: "",
    timeSlots: [] as TimeSlotDocument[],
    price: 0
  }) as unknown as ContentDeliverySlotDocument;

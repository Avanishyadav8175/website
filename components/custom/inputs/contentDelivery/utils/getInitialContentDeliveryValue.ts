// utils
import { getInitialDeliverySlotValue } from "./getInitialDeliverySlotValue";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";

export const getInitialContentDeliveryValue = () =>
  ({
    processingTime: "",
    slots: [getInitialDeliverySlotValue()],
    charge: 0
  }) as ContentDeliveryDocument;

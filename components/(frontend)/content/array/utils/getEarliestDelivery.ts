// libraries
import moment from "moment";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

export const getEarliestDelivery = ({
  delivery
}: {
  delivery: ContentDeliveryDocument;
}) => {
  // Early return if delivery is not available
  if (!delivery) {
    return {
      earliestDeliveryBy: "Not Available",
      extraDays: 0
    };
  }

  const minProcessingTime =
    ((delivery.processingTime as ProcessingTimeDocument)?.hours || 0) +
    new Date().getHours() +
    1;

  let extraDays = Math.floor(minProcessingTime / 24);

  const offsetHrs = minProcessingTime % 24;

  const availableTimeSlots =
    delivery?.slots
      ?.map(({ type, timeSlots }) =>
        (type as DeliveryTypeDocument).timeSlots
          .filter(({ _id }) => (timeSlots as string[]).includes(_id as string))
          .map(({ startTime }) => startTime)
      )
      ?.reduce((slots, slot) => (slots = [...slots, ...slot]), []) || [];

  const hasAvailableSlot = availableTimeSlots
    .map((t) => parseInt(t.substring(0, 2)) > offsetHrs)
    .reduce((ans, val) => (ans ||= val), false);

  if (hasAvailableSlot === false) {
    extraDays += 1;
  }

  let earliestDeliveryBy = "";

  if (extraDays === 0) {
    earliestDeliveryBy = "Today";
  } else if (extraDays === 1) {
    earliestDeliveryBy = "Tomorrow";
  } else
    earliestDeliveryBy = `Get it by ${moment()
      .add(extraDays, "days")
      .format("Do MMM")}`;

  return earliestDeliveryBy;
};

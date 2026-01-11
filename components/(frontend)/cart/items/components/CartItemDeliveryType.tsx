// icons
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { getHoursGapFromDateAndTime } from "@/components/(frontend)/content/detail/utils/date";

// hooks
import { useId } from "react";

// components
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import CartItemDeliveryTimeSlot from "./CartItemDeliveryTimeSlot";

// types
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function CartItemDeliveryType({
  contentDeliverySlot,
  selectedDate,
  selectedDeliveryType,
  selectedTimeSlot,
  orderProcessingTime,
  onSelectTimeSlot
}: {
  contentDeliverySlot: ContentDeliverySlotDocument;
  selectedDate: Date;
  selectedDeliveryType: DeliveryTypeDocument;
  selectedTimeSlot: TimeSlotDocument;
  orderProcessingTime: number;
  onSelectTimeSlot: (
    deliveryType: DeliveryTypeDocument,
    timeSlotId: TimeSlotDocument
  ) => void;
}) {
  const id = useId();

  const deliveryType = contentDeliverySlot.type as DeliveryTypeDocument;

  const availableTimeSlots = [
    ...deliveryType.timeSlots
      .filter(({ _id }) =>
        (contentDeliverySlot.timeSlots as string[]).includes(_id as string)
      )
      .filter(({ startTime }) => {
        const slotDeliveryTime = getHoursGapFromDateAndTime(
          selectedDate,
          startTime
        );

        return slotDeliveryTime > orderProcessingTime;
      })
  ].sort(
    (a, b) =>
      Number(a.startTime.split(":")[0]) - Number(b.startTime.split(":")[0])
  );

  return Boolean(availableTimeSlots.length) ? (
    <AccordionItem
      key={id}
      value={id}
      className="border-b-charcoal-3/20"
    >
      <AccordionTrigger className="group text-base font-normal sm:py-2.5 text-charcoal-3 text-left hover:no-underline  transition-all duration-300 grid grid-cols-[1fr_50px_20px] items-center gap-2">
        <span
          className={`group-hover:text-sienna group-data-[state=open]:text-sienna ${deliveryType._id === selectedDeliveryType?._id ? "text-sienna" : ""} transition-all duration-300`}
        >
          {deliveryType.name}
        </span>
        <span className="text-sm bg-sienna/95 text-ivory-2 p-0.5 px-1.5 rounded-md text-center data-[state=open]:text-ivory-2 group-hover:text-ivory-2">
          {INRSymbol} {`${deliveryType.price}`}
        </span>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col items-stretch justify-start">
        {availableTimeSlots.map((timeSlot) => (
          <CartItemDeliveryTimeSlot
            key={timeSlot._id as string}
            timeSlot={timeSlot}
            isActive={timeSlot._id === selectedTimeSlot?._id}
            onSelect={() => {
              onSelectTimeSlot(deliveryType, timeSlot);
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  ) : (
    <></>
  );
}

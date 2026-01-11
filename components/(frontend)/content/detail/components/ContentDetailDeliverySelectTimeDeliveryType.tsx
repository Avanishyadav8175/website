// icons
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { getHoursGapFromDateAndTime } from "../utils/date";

// hooks
import { useId } from "react";

// components
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot from "./ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot";

// types
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function ContentDetailDeliverySelectTimeDeliveryType({
  contentDeliverySlot,
  selectedDate,
  selectedDeliveryType,
  selectedTimeSlot,
  earliestDeliveryTime,
  onSelectTimeSlot
}: {
  contentDeliverySlot: ContentDeliverySlotDocument;
  selectedDate: Date;
  selectedDeliveryType: DeliveryTypeDocument | undefined;
  selectedTimeSlot: TimeSlotDocument | undefined;
  earliestDeliveryTime: number;
  onSelectTimeSlot: (
    deliveryType?: DeliveryTypeDocument,
    timeSlotId?: TimeSlotDocument
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

        return slotDeliveryTime > earliestDeliveryTime;
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
        {availableTimeSlots.map((timeSlot, index) => (
          <ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot
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

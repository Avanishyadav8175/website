// icons
import { Clock } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import ContentDetailDeliverySelectTimeDeliveryType from "./ContentDetailDeliverySelectTimeDeliveryType";
import ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot from "./ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot";

import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { getHoursGapFromDateAndTime } from "../utils/date";
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function ContentDetailDeliverySelectTime({
  contentDelivery,
  selectedDate,
  selectedDeliveryType,
  selectedTimeSlot,
  orderProcessingTime,
  onSelectDate,
  onSelectTimeSlot
}: {
  contentDelivery: ContentDeliveryDocument;
  selectedDate: Date;
  selectedDeliveryType?: DeliveryTypeDocument | undefined;
  selectedTimeSlot: TimeSlotDocument | undefined;
  orderProcessingTime: number;
  onSelectDate: (date?: Date) => void;
  onSelectTimeSlot: (
    deliveryType?: DeliveryTypeDocument,
    timeSlot?: TimeSlotDocument
  ) => void;
}) {
  const availableDeliverySlots = (
    contentDelivery?.slots as ContentDeliverySlotDocument[] || []
  ).filter(({ type, timeSlots }) => {
    const deliveryType = type as DeliveryTypeDocument;

    const availableTimeSlots = deliveryType.timeSlots
      .filter(({ _id }) => (timeSlots as string[]).includes(_id as string))
      .filter(({ startTime }) => {
        const slotDeliveryTime = getHoursGapFromDateAndTime(
          selectedDate,
          startTime
        );

        return slotDeliveryTime > orderProcessingTime;
      });

    return Boolean(availableTimeSlots?.length);
  });

  return (
    <section className="flex flex-col justify-start gap-1 overflow-scroll scrollbar-hide">
      <span className="flex items-center justify-start gap-2 text-charcoal-2 text-xl">
        <Clock
          strokeWidth={1.5}
          width={19}
          height={19}
        />
        <span>{"Select Time Slot"}</span>
      </span>
      <div className="my-4 overflow-y-scroll scrollbar-hide sm:max-h-[340px]">
        <Accordion
          type="single"
          collapsible
        >
          {availableDeliverySlots.map((deliverySlot) =>
            availableDeliverySlots.length > 1 ? (
              <ContentDetailDeliverySelectTimeDeliveryType
                key={deliverySlot._id as string}
                contentDeliverySlot={deliverySlot}
                selectedDate={selectedDate}
                selectedDeliveryType={selectedDeliveryType}
                selectedTimeSlot={selectedTimeSlot}
                earliestDeliveryTime={orderProcessingTime}
                onSelectTimeSlot={onSelectTimeSlot}
              />
            ) : (
              <div
                key={deliverySlot._id as string}
                className="flex flex-col items-stretch justify-start"
              >
                {[
                  ...(deliverySlot.type as DeliveryTypeDocument).timeSlots
                    .filter(({ _id }) =>
                      (deliverySlot.timeSlots as string[]).includes(
                        _id as string
                      )
                    )
                    .filter(({ startTime }) => {
                      const slotDeliveryTime = getHoursGapFromDateAndTime(
                        selectedDate,
                        startTime
                      );

                      return slotDeliveryTime > orderProcessingTime;
                    })
                ]
                  .sort(
                    (a, b) =>
                      Number(a.startTime.split(":")[0]) -
                      Number(b.startTime.split(":")[0])
                  )
                  .map((timeSlot) => (
                    <ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot
                      key={timeSlot._id as string}
                      timeSlot={timeSlot}
                      isActive={timeSlot._id === selectedTimeSlot?._id}
                      onSelect={() => {
                        onSelectTimeSlot(
                          deliverySlot.type as DeliveryTypeDocument,
                          timeSlot
                        );
                      }}
                    />
                  ))}
              </div>
            )
          )}
        </Accordion>
      </div>
    </section>
  );
}

import { INRSymbol } from "@/common/constants/symbols";
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { SetStateType } from "@/common/types/reactTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ClockIcon } from "lucide-react";

export default function SelectDeliveryTime({
  slots,
  selectedTime,
  selectedDeliveryType,
  startTime,
  todayDelivery,
  selectedDate,
  setSelectedTime,
  setTimeString,
  setSelectedDeliveryType
}: {
  slots: ContentDeliverySlotDocument[];
  selectedTime: string | undefined;
  selectedDeliveryType: string | undefined;
  startTime: number;
  todayDelivery: boolean;
  selectedDate: { isToday: boolean; isTommorow: boolean };
  setSelectedTime: (selectedTime: string | undefined) => void;
  setTimeString: (selectedTimeString: string) => void;
  setSelectedDeliveryType: (selectedDeliveryType: string | undefined) => void;
}) {
  const slotCount = slots.map(
    ({ timeSlots, type }) =>
      (type as DeliveryTypeDocument).timeSlots
        .filter(({ _id: id }) => (timeSlots as string[]).includes(id as string))
        .filter(({ startTime: startHrs }) =>
          (todayDelivery && selectedDate.isToday) ||
          (!todayDelivery && selectedDate.isTommorow)
            ? parseInt(startHrs.substring(0, 2)) >= startTime
            : true
        ).length
  );

  let isSingleSlot = false;
  for (let i = 0; i < slotCount.length; i += 1)
    if (slotCount[i] > 0 && isSingleSlot) {
      isSingleSlot = false;
      break;
    } else if (slotCount[i] > 0) isSingleSlot = true;

  const singleTypeExists = slots.length <= 1 || isSingleSlot;

  return (
    <section className="flex flex-col justify-start gap-1 overflow-scroll scrollbar-hide">
      <span className="flex items-center justify-start gap-2 text-charcoal-2 text-xl">
        <ClockIcon
          strokeWidth={1.5}
          width={19}
          height={19}
        />{" "}
        <span>Select Time Slot</span>
      </span>
      <div className="my-4 overflow-y-scroll scrollbar-hide sm:max-h-[340px]">
        <Accordion
          type="single"
          collapsible
        >
          {slots.map(({ _id, timeSlots, price, type }, index) => {
            const availableSlots = (type as DeliveryTypeDocument).timeSlots
              .filter(({ _id: id }) =>
                (timeSlots as string[]).includes(id as string)
              )
              .filter(({ startTime: startHrs }) =>
                (todayDelivery && selectedDate.isToday) ||
                (!todayDelivery && selectedDate.isTommorow)
                  ? parseInt(startHrs.substring(0, 2)) >= startTime
                  : true
              );

            if (availableSlots.length === 0) return <></>;

            if (isSingleSlot) {
              return (
                <div
                  key={index}
                  className="flex flex-col items-stretch justify-start"
                >
                  {availableSlots.map((timeSlot, index) => (
                    <div
                      key={index}
                      className={`relative group py-1.5 text-[14px] flex items-center justify-start gap-2 rounded-md cursor-pointer border-[1px] border-l-0 border-transparent transition-all duration-300 ${selectedTime && selectedTime === ((timeSlot as TimeSlotDocument)._id as string) ? "bg-gradient-to-r from-transparent to-sienna/30 border-sienna/20 font-medium text-sienna" : "hover:bg-gradient-to-r hover:from-transparent hover:to-ash/60 hover:border-ash/30"}`}
                      onClick={() => {
                        setSelectedDeliveryType(_id as string);
                        setSelectedTime(
                          (timeSlot as TimeSlotDocument)._id as string
                        );
                        setTimeString((timeSlot as TimeSlotDocument).label);
                      }}
                    >
                      <span>
                        <ClockIcon
                          strokeWidth={1}
                          height={17}
                          width={17}
                          className={
                            selectedTime &&
                            selectedTime ===
                              ((timeSlot as TimeSlotDocument)._id as string)
                              ? `stroke-sienna brightness-75`
                              : ""
                          }
                        />
                      </span>
                      <span>{timeSlot.label}</span>

                      {selectedTime &&
                      selectedTime ===
                        ((timeSlot as TimeSlotDocument)._id as string) ? (
                        <span className="absolute right-2 text-sienna">
                          Selected
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <AccordionItem
                key={index}
                value={String(index)}
                className="border-b-charcoal-3/20"
              >
                <AccordionTrigger className="group text-base font-normal sm:py-2.5 text-charcoal-3 text-left hover:no-underline  transition-all duration-300 grid grid-cols-[1fr_50px_20px] items-center gap-2">
                  <span className="group-hover:text-sienna group-data-[state=open]:text-sienna transition-all duration-300">
                    {(type as DeliveryTypeDocument).name}
                  </span>
                  <span className="text-sm bg-sienna/95 text-ivory-2 p-0.5 px-1.5 rounded-md text-center data-[state=open]:text-ivory-2 group-hover:text-ivory-2">
                    {INRSymbol} {`${price}`}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col items-stretch justify-start">
                  {availableSlots.map((timeSlot, index) => (
                    <div
                      key={index}
                      className={`relative group py-1.5 text-[14px] flex items-center justify-start gap-2 rounded-md cursor-pointer border-[1px] border-l-0 border-transparent transition-all duration-300 ${selectedTime && selectedTime === ((timeSlot as TimeSlotDocument)._id as string) ? "bg-gradient-to-r from-transparent to-sienna/30 border-sienna/20 font-medium text-sienna" : "hover:bg-gradient-to-r hover:from-transparent hover:to-ash/60 hover:border-ash/30"}`}
                      onClick={() => {
                        setSelectedDeliveryType(_id as string);
                        setSelectedTime(
                          (timeSlot as TimeSlotDocument)._id as string
                        );
                        setTimeString((timeSlot as TimeSlotDocument).label);
                      }}
                    >
                      <span>
                        <ClockIcon
                          strokeWidth={1}
                          height={17}
                          width={17}
                          className={
                            selectedTime &&
                            selectedTime ===
                              ((timeSlot as TimeSlotDocument)._id as string)
                              ? `stroke-sienna brightness-75`
                              : ""
                          }
                        />
                      </span>
                      <span>{timeSlot.label}</span>

                      {selectedTime &&
                      selectedTime ===
                        ((timeSlot as TimeSlotDocument)._id as string) ? (
                        <span className="absolute right-2 text-sienna">
                          Selected
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

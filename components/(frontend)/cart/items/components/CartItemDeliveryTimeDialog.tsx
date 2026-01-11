// icons
import { Clock } from "lucide-react";

// utils
import { getHoursGapFromDateAndTime } from "@/components/(frontend)/content/detail/utils/date";

// hooks
import { useEffect, useState } from "react";

// components
import { Accordion } from "@/components/ui/accordion";
import CartItemDeliveryTimeSlot from "./CartItemDeliveryTimeSlot";
import CartItemDeliveryType from "./CartItemDeliveryType";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function CartItemDeliveryTimeDialog({
  showDialog,
  selectedDate,
  selectedDeliveryType,
  selectedTimeSlot,
  contentDelivery,
  onChangeShowDialog,
  onChangeTime
}: {
  showDialog: boolean;
  selectedDate: Date;
  selectedDeliveryType: DeliveryTypeDocument;
  selectedTimeSlot: TimeSlotDocument;
  contentDelivery: ContentDeliveryDocument;
  onChangeShowDialog: (showDialog: boolean) => void;
  onChangeTime: (
    deliveryType: DeliveryTypeDocument,
    timeSlot: TimeSlotDocument
  ) => void;
}) {
  // states
  const [newDeliveryType, setNewDeliveryType] =
    useState<DeliveryTypeDocument>(selectedDeliveryType);
  const [newTimeSlot, setNewTimeSlot] =
    useState<TimeSlotDocument>(selectedTimeSlot);

  // variables
  const orderProcessingTime = (
    contentDelivery?.processingTime as ProcessingTimeDocument
  )?.hours || 0;

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

  // event handlers
  const handleSelectTimeSlot = (
    deliveryType: DeliveryTypeDocument,
    timeSlot: TimeSlotDocument
  ) => {
    setNewDeliveryType(deliveryType);
    setNewTimeSlot(timeSlot);
  };

  const handleSave = () => {
    onChangeTime(newDeliveryType, newTimeSlot);
    onChangeShowDialog(false);
  };

  // side effects
  useEffect(() => {
    setNewDeliveryType(selectedDeliveryType);
    setNewTimeSlot(selectedTimeSlot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent
        aria-describedby="date-time-selector"
        className="p-0 outline-none border-none bg-transparent w-[calc(100dvw_-_28px)] sm:min-w-[360px] sm:max-w-[360px] sm:h-[480px] scrollbar-hide z-[996]"
      >
        <div className="relative bg-ivory-1 overflow-x-hidden flex items-stretch justify-stretch max-sm:px-3.5 p-5 rounded-2xl sm:py-6 max-sm:pb-16 text-base min-h-fit sm:min-w-[360px] sm:max-w-[360px]">
          <div
            className={`relative flex items-start justify-start *:w-[calc(100dvw_-_56px)] *:sm:w-[320px] space-x-5 transition-all duration-300`}
          >
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
                      <CartItemDeliveryType
                        key={deliverySlot._id as string}
                        contentDeliverySlot={deliverySlot}
                        selectedDate={selectedDate}
                        selectedDeliveryType={newDeliveryType}
                        selectedTimeSlot={newTimeSlot}
                        orderProcessingTime={orderProcessingTime}
                        onSelectTimeSlot={handleSelectTimeSlot}
                      />
                    ) : (
                      <div
                        key={deliverySlot._id as string}
                        className="flex flex-col items-stretch justify-start"
                      >
                        {[
                          ...(
                            deliverySlot.type as DeliveryTypeDocument
                          ).timeSlots
                            .filter(({ _id }) =>
                              (deliverySlot.timeSlots as string[]).includes(
                                _id as string
                              )
                            )
                            .filter(({ startTime }) => {
                              const slotDeliveryTime =
                                getHoursGapFromDateAndTime(
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
                            <CartItemDeliveryTimeSlot
                              key={timeSlot._id as string}
                              timeSlot={timeSlot}
                              isActive={timeSlot._id === newTimeSlot?._id}
                              onSelect={() => {
                                handleSelectTimeSlot(
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
          </div>
        </div>
        <div className="absolute bottom-0 grid grid-cols-2 gap-3 sm:gap-4 w-[calc(100dvw_-62px)] sm:w-[320px] ml-5 mb-5 ">
          <div
            className={`col-start-2 group flex items-center justify-center capitalize py-1.5 gap-0 border-[1px] cursor-pointer bg-charcoal text-ivory-1 border-transparent rounded-lg transition-all duration-200 hover:gap-1`}
            onClick={handleSave}
          >
            <span className="font-light">{"Update"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

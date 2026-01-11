"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SelectDate from "./components/SelectDate";
import SelectDeliveryTime from "./components/SelectDeliveryTime";
import { SetStateType } from "@/common/types/reactTypes";
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";

export default function SelectDateTimePopup({
  showDialog,
  setShowDialog,
  dateTimeSlideContainerId,
  selectedDate,
  setSelectedDate,
  todayDelivery,
  currSliderIndex,
  onClick,
  selectedTime,
  setSelectedTime,
  selectedDeliveryType,
  setSelectedDeliveryType,
  isTodayTommorow,
  startTime,
  setTimeString,
  details,
  asIndividualCards
}: {
  showDialog: boolean;
  setShowDialog: SetStateType<boolean>;
  dateTimeSlideContainerId: string;
  selectedDate: Date | undefined;
  setSelectedDate: (selectedDate: Date | undefined) => void;
  todayDelivery: boolean;
  currSliderIndex: 0 | 1;
  onClick: {
    next: () => void;
    prev: () => void;
  };
  selectedTime: string | undefined;
  setSelectedTime: (selectedTime: string | undefined) => void;
  selectedDeliveryType: string | undefined;
  setSelectedDeliveryType: (selectedDeliveryType: string | undefined) => void;
  isTodayTommorow: {
    isToday: boolean;
    isTommorow: boolean;
  };
  startTime: number;
  setTimeString: (selectedTimeString: string) => void;
  details: ContentDeliverySlotDocument[];
  asIndividualCards?: boolean;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={setShowDialog}
    >
      <DialogContent
        aria-describedby="date-time-selector"
        className="p-0 outline-none border-none bg-transparent w-[calc(100dvw_-_28px)] sm:min-w-[360px] sm:max-w-[360px] sm:h-[480px] scrollbar-hide z-[996]"
      >
        <div className="relative bg-ivory-1 overflow-x-hidden flex items-stretch justify-stretch max-sm:px-3.5 p-5 rounded-2xl sm:py-6 max-sm:pb-16 text-base min-h-fit sm:min-w-[360px] sm:max-w-[360px]">
          <div
            id={dateTimeSlideContainerId}
            className={`relative flex items-start justify-start *:w-[calc(100dvw_-_56px)] *:sm:w-[320px] space-x-5 transition-all duration-300`}
          >
            {(asIndividualCards && currSliderIndex === 0) ||
            !asIndividualCards ? (
              <SelectDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                todayDelivery={todayDelivery}
              />
            ) : (
              <></>
            )}
            {(asIndividualCards && currSliderIndex === 1) ||
            !asIndividualCards ? (
              <SelectDeliveryTime
                slots={details}
                selectedTime={selectedTime}
                selectedDeliveryType={selectedDeliveryType}
                startTime={startTime}
                todayDelivery={todayDelivery}
                selectedDate={isTodayTommorow}
                setSelectedTime={setSelectedTime}
                setTimeString={setTimeString}
                setSelectedDeliveryType={setSelectedDeliveryType}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* NAVIGATIONS -------------------------------- */}
        <div className="absolute bottom-0 grid grid-cols-2 gap-3 sm:gap-4 w-[calc(100dvw_-62px)] sm:w-[320px] ml-5 mb-5">
          {currSliderIndex === 0 || asIndividualCards ? (
            <span />
          ) : (
            <div
              className="w-fit flex items-center justify-center -translate-y-0.5 capitalize py-1.5 gap-2.5 cursor-pointer text-charcoal-3 rounded-lg transition-all duration-200 hover:underline hover:underline-offset-2 hover:gap-2 hover:text-charcoal"
              onClick={onClick.prev}
            >
              <ArrowLeft
                strokeWidth={1.5}
                height={17}
                width={17}
              />{" "}
              <span className="">Back</span>
            </div>
          )}
          <div
            // @ts-ignore
            className={`group flex items-center justify-center capitalize py-1.5 gap-0 border-[1px] ${
              (currSliderIndex === 0 && !selectedDate) ||
              (currSliderIndex === 1 &&
                (!selectedDeliveryType || !selectedTime))
                ? "bg-charcoal-3/60 text-ivory-3/60 border-transparent"
                : "cursor-pointer bg-charcoal text-ivory-1 border-transparent"
            } rounded-lg transition-all duration-200 hover:gap-1`}
            onClick={onClick.next}
          >
            <span className="font-light">
              {asIndividualCards
                ? "Save"
                : currSliderIndex === 1 &&
                    selectedDate &&
                    selectedDeliveryType &&
                    selectedDeliveryType.length &&
                    selectedTime
                  ? "Confirm"
                  : "Next"}
            </span>
            <ArrowRight
              strokeWidth={1.5}
              height={16}
              width={16}
              className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

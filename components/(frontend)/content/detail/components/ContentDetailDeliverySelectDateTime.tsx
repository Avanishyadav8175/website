// icons
import { ArrowLeft, ArrowRight } from "lucide-react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContentDetailDeliverySelectDate from "./ContentDetailDeliverySelectDate";
import ContentDetailDeliverySelectTime from "./ContentDetailDeliverySelectTime";
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function ContentDetailDeliverySelectDateTime({
  showDialog,
  activeIndex,
  contentDelivery,
  selectedDate,
  selectedDeliveryType,
  selectedTimeSlot,
  orderProcessingTime,
  lastDeliverySlotTime,
  onChangeShowDialog,
  onChangeActiveIndex,
  onSelectDate,
  onSelectDeliveryType,
  onSelectTimeSlot
}: {
  showDialog: boolean;
  activeIndex: number;
  contentDelivery: ContentDeliveryDocument;
  selectedDate: Date | undefined;
  selectedDeliveryType: DeliveryTypeDocument | undefined;
  selectedTimeSlot: TimeSlotDocument | undefined;
  orderProcessingTime: number;
  lastDeliverySlotTime: string;
  onChangeShowDialog: (showDialog: boolean) => void;
  onChangeActiveIndex: (index: number) => void;
  onSelectDate: (date?: Date) => void;
  onSelectDeliveryType: (deliveryType?: DeliveryTypeDocument) => void;
  onSelectTimeSlot: (
    deliveryType?: DeliveryTypeDocument,
    timeSlot?: TimeSlotDocument
  ) => void;
}) {
  // event handlers
  const handleBack = () => {
    onChangeActiveIndex(0);
    onSelectTimeSlot(undefined);
    onSelectDeliveryType(undefined);
  };

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
            {activeIndex === 0 && (
              <ContentDetailDeliverySelectDate
                selectedDate={selectedDate}
                lastDeliverySlotTime={lastDeliverySlotTime}
                orderProcessingTime={orderProcessingTime}
                onSelectDate={onSelectDate}
              />
            )}
            {activeIndex === 1 && (
              <ContentDetailDeliverySelectTime
                contentDelivery={contentDelivery}
                selectedDate={selectedDate!}
                selectedDeliveryType={selectedDeliveryType}
                selectedTimeSlot={selectedTimeSlot}
                orderProcessingTime={orderProcessingTime}
                onSelectDate={onSelectDate}
                onSelectTimeSlot={onSelectTimeSlot}
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-0 grid grid-cols-2 gap-3 sm:gap-4 w-[calc(100dvw_-62px)] sm:w-[320px] ml-5 mb-5">
          {activeIndex === 0 ? (
            <span />
          ) : (
            <div
              className="w-fit flex items-center justify-center -translate-y-0.5 capitalize py-1.5 gap-2.5 cursor-pointer text-charcoal-3 rounded-lg transition-all duration-200 hover:underline hover:underline-offset-2 hover:gap-2 hover:text-charcoal"
              onClick={handleBack}
            >
              <ArrowLeft
                strokeWidth={1.5}
                height={17}
                width={17}
              />
              <span>{" Back"}</span>
            </div>
          )}
          <div
            className={`group flex items-center justify-center capitalize py-1.5 gap-0 border-[1px] ${
              (activeIndex === 0 && !selectedDate) ||
              (activeIndex === 1 &&
                (!selectedDeliveryType || !selectedTimeSlot))
                ? "bg-charcoal-3/60 text-ivory-3/60 border-transparent"
                : "cursor-pointer bg-charcoal text-ivory-1 border-transparent"
            } rounded-lg transition-all duration-200 hover:gap-1`}
            onClick={() => {
              if (activeIndex === 0 && selectedDate) {
                onChangeActiveIndex(1);
              } else if (
                activeIndex === 1 &&
                selectedDeliveryType &&
                selectedTimeSlot
              ) {
                onChangeShowDialog(false);
              }
            }}
          >
            <span className="font-light">
              {activeIndex === 1 &&
              selectedDate &&
              selectedDeliveryType &&
              selectedTimeSlot
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

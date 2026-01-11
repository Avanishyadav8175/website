// icons
import { Calendar, Clock1, Clock4 } from "lucide-react";

// utils
import { formattedDate } from "../utils/date";
import { lazy } from "react";

// hooks
import { useEffect, useMemo, useState } from "react";

// components
import ContentDetailDeliverySelectDateStatus from "./ContentDetailDeliverySelectDateStatus";
// import ContentDetailDeliverySelectDateTime from "./ContentDetailDeliverySelectDateTime";
const LazyContentDetailDeliverySelectDateTime = lazy(
  () => import("./ContentDetailDeliverySelectDateTime")
);
import { Suspense } from "react";

// types
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
// import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { type SelectDateStatus } from "../types/delivery";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function ContentDetailDeliveryDate({
  status,
  contentDelivery,
  lastDeliverySlotTime,
  cartItemDelivery,
  onChangeCartItemDelivery
}: {
  status: SelectDateStatus;
  contentDelivery: ContentDeliveryDocument;
  lastDeliverySlotTime: string;
  cartItemDelivery: CartItemDeliveryDocument;
  onChangeCartItemDelivery: (delivery: CartItemDeliveryDocument) => void;
}) {
  // states
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // variables
  const deliverySlots = contentDelivery?.slots || [];

  const orderProcessingTime = (
    contentDelivery?.processingTime as ProcessingTimeDocument
  )?.hours || 0;

  // memoized
  const deliveryType = useMemo(
    () =>
      deliverySlots.find(
        ({ type }) =>
          (type as DeliveryTypeDocument)?._id ===
          (cartItemDelivery?.type as DeliveryTypeDocument)?._id
      )
        ? (deliverySlots.find(
            ({ type }) =>
              (type as DeliveryTypeDocument)?._id ===
              (cartItemDelivery?.type as DeliveryTypeDocument)?._id
          )?.type as DeliveryTypeDocument)
        : null,
    [deliverySlots, cartItemDelivery.type]
  );

  const deliveryTimeSlot = useMemo(
    () =>
      (deliveryType?.timeSlots as TimeSlotDocument[])?.find(
        ({ _id }) => _id === (cartItemDelivery?.slot as TimeSlotDocument)?._id
      ),
    [deliveryType, cartItemDelivery.slot]
  );

  const selectedDateTimeLabel = useMemo(
    () =>
      cartItemDelivery?.date && deliveryTimeSlot
        ? `${formattedDate((cartItemDelivery.date as Date) || new Date(), "MINI")}, ${deliveryTimeSlot.label}`
        : "",
    [deliveryTimeSlot, cartItemDelivery.date]
  );

  // side effects
  useEffect(() => {
    if (!showDialog) {
      setActiveIndex(0);
    }
  }, [showDialog]);

  return (
    <>
      <div className="grid grid-cols-[110px_1fr] gap-x-1.5 text-charcoal-3/95 sm:grid-cols-1 sm:grid-rows-[repeat(3,auto)]">
        <span className="flex items-center justify-start gap-1.5 text-sm sm:mb-1.5">
          <Clock4
            strokeWidth={1}
            width={18}
            height={18}
          />
          <span>Select Timing</span>
        </span>
        <input
          type="text"
          placeholder="Select Date & Time"
          readOnly
          value={selectedDateTimeLabel}
          onClick={() => {
            setShowDialog(true);
          }}
          className="bg-ivory-2 cursor-pointer border border-transparent w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none border-none transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:outline-2 focus:outline-offset-4"
        />
        <ContentDetailDeliverySelectDateStatus status={status} />
      </div>
      <Suspense>
        <LazyContentDetailDeliverySelectDateTime
          showDialog={showDialog}
          activeIndex={activeIndex}
          contentDelivery={contentDelivery}
          selectedDate={cartItemDelivery.date as Date}
          selectedDeliveryType={cartItemDelivery.type as DeliveryTypeDocument}
          selectedTimeSlot={cartItemDelivery.slot as TimeSlotDocument}
          orderProcessingTime={orderProcessingTime}
          lastDeliverySlotTime={lastDeliverySlotTime}
          onChangeShowDialog={setShowDialog}
          onChangeActiveIndex={setActiveIndex}
          onSelectDate={(date?: Date) => {
            onChangeCartItemDelivery({
              date: date?.toISOString() || date
            } as CartItemDeliveryDocument);
          }}
          onSelectDeliveryType={(type?: DeliveryTypeDocument) => {
            onChangeCartItemDelivery({
              ...cartItemDelivery,
              type
            } as CartItemDeliveryDocument);
          }}
          onSelectTimeSlot={(
            type?: DeliveryTypeDocument,
            slot?: TimeSlotDocument
          ) => {
            onChangeCartItemDelivery({
              ...cartItemDelivery,
              type,
              slot
            } as CartItemDeliveryDocument);
          }}
        />
      </Suspense>
    </>
  );
}

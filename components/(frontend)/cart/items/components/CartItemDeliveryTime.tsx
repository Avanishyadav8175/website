// icons
import { Clock3, Truck } from "lucide-react";

// hooks
import { useState } from "react";

// components
import CartItemDeliveryTimeDialog from "./CartItemDeliveryTimeDialog";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function CartItemDeliveryTime({
  date,
  deliveryType,
  timeSlot,
  contentDelivery,
  onChangeTime
}: {
  date: Date;
  deliveryType: DeliveryTypeDocument;
  timeSlot: TimeSlotDocument;
  contentDelivery: ContentDeliveryDocument;
  onChangeTime: (
    deliveryType: DeliveryTypeDocument,
    timeSlot: TimeSlotDocument
  ) => void;
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="max-sm:my-1 text-sm mt-0.5 text-charcoal-3/60 flex items-center justify-start gap-x-2 row-start-6 col-start-2 max-sm:row-start-5 max-sm:col-start-2 max-sm:col-span-2">
        <Clock3
          strokeWidth={2}
          height={14}
          width={14}
        />
        <span>{timeSlot.label}</span>
        <span className="flex text-xs text-ivory-2 italic items-center justify-start gap-1 py-[1px] sm:py-0.5 px-2 translate-y-[1px] rounded-md bg-sienna/80 max-sm:hidden">
          <Truck
            strokeWidth={1.5}
            width={13}
            height={13}
          />
          <span className="truncate">{` ${deliveryType.name.trim().split(" ")[0]}`}</span>
        </span>
      </div>
      <span
        onClick={() => {
          setShowDialog(true);
        }}
        className="pr-3 sm:pr-4 text-sm underline underline-offset-2 flex items-center justify-end gap-1 sm:row-start-6 sm:col-start-3 cursor-pointer text-charcoal-3/70 max-sm:row-start-5 max-sm:col-start-3"
      >
        <span>Edit</span>
      </span>
      <CartItemDeliveryTimeDialog
        showDialog={showDialog}
        selectedDate={date}
        selectedDeliveryType={deliveryType}
        selectedTimeSlot={timeSlot}
        contentDelivery={contentDelivery}
        onChangeShowDialog={setShowDialog}
        onChangeTime={onChangeTime}
      />
    </>
  );
}

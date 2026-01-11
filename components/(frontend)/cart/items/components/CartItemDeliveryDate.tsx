// icons
import { Calendar } from "lucide-react";

// utils
import { formattedDate } from "@/components/(frontend)/content/detail/utils/date";

// hooks
import { useState } from "react";

// components
import CartItemDeliveryDateDialog from "./CartItemDeliveryDateDialog";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";

export default function CartItemDeliveryDate({
  isAvailableInAllIndia,
  date,
  contentDelivery,
  onChangeDate
}: {
  isAvailableInAllIndia: boolean;
  date: Date;
  contentDelivery: ContentDeliveryDocument;
  onChangeDate: (date: Date) => void;
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="text-sm text-charcoal-3/60 flex items-center justify-start gap-x-2 row-start-5 col-start-2 max-sm:row-start-4 max-sm:col-start-2">
        <Calendar
          strokeWidth={2}
          height={14}
          width={14}
        />
        <span>{`${isAvailableInAllIndia ? "By " : ""}${formattedDate(date, "SHORT")}`}</span>
      </div>
      {!isAvailableInAllIndia && (
        <>
          <span
            onClick={() => {
              setShowDialog(true);
            }}
            className="pr-3 sm:pr-4 text-sm underline underline-offset-2 flex items-center justify-end gap-1 sm:row-start-5 sm:col-start-3 cursor-pointer text-charcoal-3/70 max-sm:row-start-4 max-sm:col-start-3"
          >
            <span>Edit</span>
          </span>
          <CartItemDeliveryDateDialog
            showDialog={showDialog}
            selectedDate={date}
            contentDelivery={contentDelivery}
            onChangeShowDialog={setShowDialog}
            onSelectDate={onChangeDate}
          />
        </>
      )}
    </>
  );
}

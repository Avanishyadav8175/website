// libraries
import moment from "moment";

// icons
import { Zap } from "lucide-react";

// hooks
import { useEffect, useMemo } from "react";

// hooks
import useTimeRemaining from "@/hooks/useTimeRemaining";

export default function ContentDetailDeliveryEarliest({
  isAvailableAtAllIndia,
  processingTime,
  lastDeliverySlotTime,
  onChangeDate
}: {
  isAvailableAtAllIndia?: boolean;
  processingTime: number;
  lastDeliverySlotTime?: string;
  onChangeDate: (date?: Date) => void;
}) {
  // hooks
  const { hours, minutes, seconds, date } = useTimeRemaining(
    processingTime,
    lastDeliverySlotTime
  );

  // memoizes
  const formattedDate = useMemo(() => {
    const targetTime = moment(date);

    return targetTime.isSame(moment(), "day")
      ? "Today"
      : targetTime.isSame(moment().add(1, "day"), "day")
        ? "Tomorrow"
        : targetTime.format("Do MMM");
  }, [date]);

  const remainingTime = useMemo(
    () =>
      `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`,
    [hours, minutes, seconds]
  );

  useEffect(() => {
    if (isAvailableAtAllIndia) {
      onChangeDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAvailableAtAllIndia, date]);

  return (
    <div
      className={`pt-3.5 ${isAvailableAtAllIndia ? "sm:max-w-[calc(470px_+_24px)]" : ""}`}
    >
      <div
        className={`bg-gradient-to-r from-sienna-3/20 to-transparent text-sienna text-sm  flex items-center justify-start py-3 px-3 rounded-xl gap-x-1`}
      >
        <div className="font-medium flex items-center justify-center gap-x-1.5 pr-1">
          <Zap
            width={16}
            height={16}
            className="fill-sienna"
          />
          <span>{`${isAvailableAtAllIndia ? "Estimated Delivery" : "Get"} By ${formattedDate}!`}</span>
        </div>
        {!isAvailableAtAllIndia && (
          <>
            <span className="text-charcoal-3/75">Order within</span>
            <span className="font-semibold text-charcoal-3/75">
              {remainingTime}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

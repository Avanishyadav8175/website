// libraries
import moment from "moment";

// icons
import { Zap } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useCallback, useMemo } from "react";

function CategoryContentEarliestDelivery({
  processingTime,
  lastDeliverySlot
}: {
  processingTime: number;
  lastDeliverySlot?: string;
}) {
  // event handlers
  const getEarliestDeliveryDate = useCallback(
    ({
      processingTime,
      lastDeliverySlot
    }: {
      processingTime: number;
      lastDeliverySlot?: string;
    }) => {
      const now = moment();
      const afterProcessing = now.clone().add(processingTime, "hours");

      let earliestDeliveryDate;

      if (lastDeliverySlot) {
        const [hour, minute] = lastDeliverySlot.split(":").map(Number);

        earliestDeliveryDate = afterProcessing
          .clone()
          .set({ hour, minute, second: 0 });

        if (earliestDeliveryDate.isBefore(afterProcessing)) {
          earliestDeliveryDate.add(1, "day");
        }
      } else {
        earliestDeliveryDate = afterProcessing.clone().endOf("day");
      }

      return earliestDeliveryDate;
    },
    []
  );

  // variables
  const date = useMemo(
    () =>
      getEarliestDeliveryDate({
        processingTime,
        lastDeliverySlot
      }),
    [processingTime, lastDeliverySlot, getEarliestDeliveryDate]
  );

  const formattedDate = useMemo(() => {
    const targetTime = moment(date);

    return targetTime.isSame(moment(), "day")
      ? "Today"
      : targetTime.isSame(moment().add(1, "day"), "day")
        ? "Tomorrow"
        : targetTime.format("Do MMM");
  }, [date]);

  return (
    <div
      className={`px-1 sm:px-3 pb-1.5 sm:pb-2 pt-0.5 relative flex items-center justify-start gap-1.5 w-full z-20`}
    >
      <div className="flex items-center justify-start gap-x-1.5 bg-gradient-to-r from-transparent to-green-200/95 text-green-800/95 w-fit pr-3 py-1 rounded-lg">
        <Zap
          strokeWidth={1.5}
          width={15}
          height={15}
        />
        <span className="max-sm:text-[12.5px] text-sm font-medium">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default memo(CategoryContentEarliestDelivery);

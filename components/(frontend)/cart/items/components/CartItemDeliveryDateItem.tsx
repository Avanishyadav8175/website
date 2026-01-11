// utils
import { COMPANY_NUMBER } from "@/common/constants/companyDetails";
import {
  formattedDate,
  formattedDateWithTodayTomorrow
} from "@/components/(frontend)/content/detail/utils/date";

// hooks
import { useToast } from "@/components/ui/use-toast";

export default function CartItemDeliveryDateItem({
  date,
  selectedDate,
  disabled,
  onSelect
}: {
  date: Date;
  selectedDate: Date;
  disabled?: boolean;
  onSelect: (selectedDate: Date) => void;
}) {
  const { toast } = useToast();

  const dateString = formattedDateWithTodayTomorrow(date, "MINI");
  const dateAndMonth_Short = formattedDate(date, "SHORT");
  const dateAndMonth_Mini = formattedDate(date, "MINI");
  const dateAndMonth_Full = formattedDate(date, "FULL");
  const isTodayTomorrow = ["today", "tomorrow"].includes(
    dateString.toLowerCase()
  );

  return (
    <div
      onClick={
        disabled
          ? () => {
              toast({
                title: `Unavailable for ${isTodayTomorrow ? dateString : dateAndMonth_Short}`,
                description: `Reach out here: ${COMPANY_NUMBER}`,
                variant: "warning"
              });
            }
          : () => {
              onSelect(date);
            }
      }
      className={`flex flex-col items-start justify-center ${isTodayTomorrow ? "p-5 px-3" : "p-2.5 px-3"}  rounded-xl cursor-pointer text-xs border ${disabled ? "opacity-60" : ""} ${selectedDate && date.getTime() === new Date(selectedDate).getTime() ? "shadow-crimson bg-gradient-to-br from-sienna-1/50 via-transparent to-sienna-1/50 border-sienna-1/40" : "border-ash-3/40 shadow-light hover:shadow-medium hover:border-ash-3/80"}  transition-all duration-300 `}
    >
      <span>
        {isTodayTomorrow ? dateAndMonth_Mini : dateAndMonth_Mini.split(" ")[0]}
      </span>
      <span className="text-lg">
        {isTodayTomorrow
          ? dateString
          : dateAndMonth_Short.split(" ")[1].split(",")[0]}
      </span>
      {isTodayTomorrow ? (
        <></>
      ) : (
        <span>{dateAndMonth_Full.substring(0, 3)}</span>
      )}
    </div>
  );
}

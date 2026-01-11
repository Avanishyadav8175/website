import { COMPANY_WHATSAPP } from "@/common/constants/companyDetails";
import { formattedDate, formattedDateWithTodayTomorrow } from "../utils/date";

import { useToast } from "@/components/ui/use-toast";

export default function ContentDetailDeliverySelectDateItem({
  date,
  selectedDate,
  disabled,
  onSelect
}: {
  date: Date;
  selectedDate: Date | undefined;
  disabled?: boolean;
  onSelect: (selectedDate: Date | undefined) => void;
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
                description: `Reach out here: ${COMPANY_WHATSAPP}`,
                variant: "warning"
              });
            }
          : () => {
              onSelect(date);
            }
      }
      className={`flex flex-col items-start justify-center ${isTodayTomorrow ? "p-5 px-3" : "p-2.5 px-3"}  rounded-xl cursor-pointer text-xs border ${disabled ? "opacity-60" : ""} ${selectedDate && date.getTime() === new Date(selectedDate).getTime() ? "bg-sienna-1/10 border-sienna-1/60" : "border-ash-3/40 shadow-light hover:shadow-medium hover:border-ash-3/80"}  transition-all duration-300 `}
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

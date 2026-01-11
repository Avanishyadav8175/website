import { COMPANY_WHATSAPP } from "@/common/constants/companyDetails";
import {
  formattedDate,
  formattedDateWithTodayTomorrow
} from "@/common/utils/formattedDate";
import { getNext7DaysInString } from "@/common/utils/getNext7Days";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Matcher } from "react-day-picker";

export default function SelectDate({
  selectedDate,
  todayDelivery,
  setSelectedDate
}: {
  selectedDate: Date | undefined;
  todayDelivery: boolean;
  setSelectedDate: (selectedDate: Date | undefined) => void;
}) {
  const dates = getNext7DaysInString();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const pastDates: Matcher = (day: Date): boolean =>
    day.getFullYear() < new Date().getFullYear()
      ? true
      : day.getFullYear() > new Date().getFullYear()
        ? false
        : day.getMonth() < new Date().getMonth()
          ? true
          : day.getMonth() > new Date().getMonth()
            ? false
            : day.getDate() < new Date().getDate()
              ? true
              : false;

  return (
    <section className="flex flex-col justify-start gap-1">
      <span className="flex items-center justify-start gap-1.5 text-charcoal-2 text-xl">
        <CalendarIcon
          strokeWidth={1.5}
          width={21}
          height={21}
        />{" "}
        <span>Select Date</span>
      </span>
      <div className="grid *:row-start-1 *:col-start-1">
        {/* NORMAL 7 DAYS SECTION ========================================================= */}
        <div
          className={`${showCalendar ? "hidden" : ""} grid grid-rows-[auto_auto] gap-2.5 my-4`}
        >
          <div className="grid grid-cols-2 gap-3">
            {dates
              .filter((_, index) => index < 2)
              .map((date, index) => (
                <DateBox
                  date={new Date(date)}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={index === 0 && !todayDelivery ? true : false}
                  key={index}
                />
              ))}
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-2.5">
            {dates
              .filter((_, index) => index >= 2 && index < 7)
              .map((date, index) => (
                <DateBox
                  date={new Date(date)}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  key={index}
                />
              ))}
            <div
              className="flex flex-col items-center justify-center gap-1.5 bg-charcoal-3/75 text-ivory-1 rounded-xl text-xs cursor-pointer transition-colors duration-300 hover:bg-charcoal-2/75"
              onClick={() => setShowCalendar((prev) => true)}
            >
              <CalendarIcon
                width={19}
                height={19}
              />
              <span>Custom Date</span>
            </div>
          </div>
        </div>

        {/* CUSTOM DATE CALENDAR SECTION ================================================== */}
        <div
          className={`${showCalendar ? "" : "hidden"} grid justify-stretch sm:justify-center`}
        >
          <Calendar
            mode="single"
            disabled={pastDates}
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="px-0 w-full"
          />
          <div
            className="translate-y-8 sm:translate-y-5 w-fit cursor-pointer z-[700] text-charcoal-3/80 text-sm transition-all duration-300 hover:underline-offset-2 hover:underline hover:text-charcoal-2/90"
            onClick={() => setShowCalendar((prev) => false)}
          >
            This Week
          </div>
        </div>
      </div>
    </section>
  );
}

const DateBox = ({
  date,
  selectedDate,
  disabled,
  onSelect
}: {
  date: Date;
  selectedDate: Date | undefined;
  disabled?: boolean;
  onSelect: (selectedDate: Date | undefined) => void;
}) => {
  const dateString = formattedDateWithTodayTomorrow(date, "MINI");
  const dateAndMonth_Short = formattedDate(date, "SHORT");
  const dateAndMonth_Mini = formattedDate(date, "MINI");
  const dateAndMonth_Full = formattedDate(date, "FULL");
  const isTodayTomorrow = ["today", "tomorrow"].includes(
    dateString.toLowerCase()
  );

  const { toast } = useToast();

  return (
    <div
      onClick={
        disabled
          ? () => {
              toast({
                title: "Unavailable Today",
                description: `Reach out here: ${COMPANY_WHATSAPP}`,
                variant: "warning"
              });
            }
          : () => onSelect(date)
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
};

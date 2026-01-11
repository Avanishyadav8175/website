// icons
import { CalendarIcon } from "lucide-react";

// utils
import {
  getHoursGapFromDateAndTime,
  getNextSevenDays,
  isSameDate
} from "../utils/date";

// hooks
import { useState } from "react";

// components
import { Calendar } from "@/components/ui/calendar";
import ContentDetailDeliverySelectDateItem from "./ContentDetailDeliverySelectDateItem";

// types
import { type Matcher } from "react-day-picker";

export default function ContentDetailDeliverySelectDate({
  selectedDate,
  lastDeliverySlotTime,
  orderProcessingTime,
  onSelectDate
}: {
  selectedDate: Date | undefined;
  lastDeliverySlotTime: string;
  orderProcessingTime: number;
  onSelectDate: (date?: Date) => void;
}) {
  // states
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // utils
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

  // variables
  const dates = getNextSevenDays();
  const inDates =
    Boolean(selectedDate) &&
    Boolean(dates.filter((date) => isSameDate(date, selectedDate)).length);

  return (
    <section className="flex flex-col justify-start gap-1">
      <span className="flex items-center justify-start gap-1.5 text-charcoal-2 text-xl">
        <CalendarIcon
          strokeWidth={1.5}
          width={21}
          height={21}
        />
        <span>{" Select Date"}</span>
      </span>
      <div className="grid *:row-start-1 *:col-start-1">
        <div
          className={`${showCalendar ? "hidden" : ""} grid grid-rows-[auto_auto] gap-2.5 my-4`}
        >
          <div className="grid grid-cols-2 gap-3">
            {dates
              .filter((_, index) => index < 2)
              .map((date, index) => (
                <ContentDetailDeliverySelectDateItem
                  key={index}
                  date={new Date(date)}
                  selectedDate={selectedDate}
                  disabled={
                    getHoursGapFromDateAndTime(
                      new Date(date),
                      lastDeliverySlotTime
                    ) < orderProcessingTime
                  }
                  onSelect={onSelectDate}
                />
              ))}
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-2.5">
            {dates
              .filter((_, index) => index >= 2 && index < 7)
              .map((date, index) => (
                <ContentDetailDeliverySelectDateItem
                  key={index}
                  date={new Date(date)}
                  selectedDate={selectedDate}
                  disabled={
                    getHoursGapFromDateAndTime(
                      new Date(date),
                      lastDeliverySlotTime
                    ) < orderProcessingTime
                  }
                  onSelect={onSelectDate}
                />
              ))}
            {inDates || !selectedDate ? (
              <div
                className="flex flex-col items-center justify-center gap-1.5 bg-charcoal-3/75 text-ivory-1 rounded-xl text-xs cursor-pointer transition-colors duration-300 hover:bg-charcoal-2/75"
                onClick={() => {
                  setShowCalendar(true);
                }}
              >
                <CalendarIcon
                  width={19}
                  height={19}
                />
                <span>Custom Date</span>
              </div>
            ) : (
              <ContentDetailDeliverySelectDateItem
                date={new Date(selectedDate!)}
                selectedDate={selectedDate}
                onSelect={() => {
                  setShowCalendar(true);
                }}
              />
            )}
          </div>
        </div>
        <div
          className={`${showCalendar ? "" : "hidden"} grid justify-stretch sm:justify-center`}
        >
          <Calendar
            className="px-0 w-full"
            mode="single"
            selected={selectedDate}
            disabled={pastDates}
            onSelect={(date?: Date) => {
              onSelectDate(date);
              setShowCalendar(false);
            }}
          />
          <div
            className="translate-y-8 sm:translate-y-5 w-fit cursor-pointer z-[700] text-charcoal-3/80 text-sm transition-all duration-300 hover:underline-offset-2 hover:underline hover:text-charcoal-2/90"
            onClick={() => {
              setShowCalendar(false);
            }}
          >
            This Week
          </div>
        </div>
      </div>
    </section>
  );
}

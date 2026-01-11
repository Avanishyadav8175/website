// utils
import { getDatesOfMonth } from "../utils/getDatesOfMonth";

// components
import CalendarDate from "./CalendarDate";

export default function CalendarDates({
  selectedDate,
  month,
  year,
  onSelectDate
}: {
  selectedDate: Date;
  month: number;
  year: number;
  onSelectDate: (selectedDate: Date) => void;
}) {
  // variables
  const dates = getDatesOfMonth({ month, year });

  return dates.map((date) => (
    <CalendarDate
      key={date.toISOString()}
      date={date}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
    />
  ));
}

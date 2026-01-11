"use client";

// hooks
import { useState } from "react";

// components
import CalendarHeader from "./CalendarHeader";
import CalendarDates from "./CalendarDates";
import CalendarDays from "./CalendarDays";

export default function Calendar({
  selectedDate,
  onSelectDate
}: {
  selectedDate: Date;
  onSelectDate: (selectedDate: Date) => void;
}) {
  // states
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full sm:w-auto">
      <CalendarHeader
        month={month}
        year={year}
        onChangeMonth={setMonth}
        onChangeYear={setYear}
        onSelectDate={onSelectDate}
      />
      <section className="grid grid-cols-7 items-center justify-center gap-2 w-full text-center">
        <CalendarDays />
        <CalendarDates
          selectedDate={selectedDate}
          month={month}
          year={year}
          onSelectDate={onSelectDate}
        />
      </section>
    </section>
  );
}

// icons
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// components
import CalendarColorLabel from "./CalendarColorLabel";
import CalendarSelectMonthYearDialog from "./CalendarSelectMonthYearDialog";

export default function CalendarHeader({
  month,
  year,
  onChangeMonth,
  onChangeYear,
  onSelectDate
}: {
  month: number;
  year: number;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  onSelectDate: (selectedDate: Date) => void;
}) {
  // event handlers
  const handlePrev = () => {
    if (!month) {
      onChangeMonth(11);
      onChangeYear(year - 1);
    } else {
      onChangeMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      onChangeMonth(0);
      onChangeYear(year + 1);
    } else {
      onChangeMonth(month + 1);
    }
  };

  const handleReset = () => {
    onChangeMonth(new Date().getMonth());
    onChangeYear(new Date().getFullYear());
    onSelectDate(new Date());
  };

  return (
    <section className="relative flex items-center justify-center gap-4 w-full bg-[#ebebeb] text-charcoal-3/80 py-1 rounded-lg sm:text-lg">
      <CalendarColorLabel onReset={handleReset} />
      <span
        className="cursor-pointer px-4"
        onClick={handlePrev}
      >
        <ChevronLeft
          strokeWidth={3}
          width={20}
          height={20}
        />
      </span>
      <CalendarSelectMonthYearDialog
        month={month}
        year={year}
        onChangeMonth={onChangeMonth}
        onChangeYear={onChangeYear}
      />
      <span
        className="cursor-pointer px-4"
        onClick={handleNext}
      >
        <ChevronRight
          strokeWidth={3}
          width={20}
          height={20}
        />
      </span>
      <span
        className="absolute right-0 cursor-pointer px-4"
        onClick={handleReset}
      >
        <RotateCcw
          strokeWidth={3}
          width={18}
          height={18}
        />
      </span>
    </section>
  );
}

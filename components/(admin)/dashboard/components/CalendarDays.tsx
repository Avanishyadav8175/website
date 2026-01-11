// utils
import { getDaysOfWeek } from "../utils/getDaysOfWeek";

export default function CalendarDays() {
  // variables
  const days = getDaysOfWeek({ format: "short" });

  return days.map((day, i) => (
    <div
      key={i}
      style={{
        gridColumn: i + 1,
        gridRow: 1
      }}
      className="py-1 bg-[#ebebeb] text-charcoal-3/80 rounded-lg text-sm sm:text-base"
    >
      {`${day}`}
    </div>
  ));
}

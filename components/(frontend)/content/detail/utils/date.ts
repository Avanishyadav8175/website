// libraries
import moment from "moment";

// types
import { DATE_FORMAT, DateFormatType } from "../types/delivery";

export const getNextSevenDays = (): string[] =>
  Array.from({ length: 7 }).map((_, index) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

export const formattedDate = (time: Date, format: DateFormatType): string =>
  moment(time).format(DATE_FORMAT[format]);

export const formattedDateWithTodayTomorrow = (
  time: Date,
  format: DateFormatType
): string => {
  const today = moment().startOf("day");
  const tomorrow = moment().add(1, "days").startOf("day");

  const inputDate = moment(time).startOf("day");

  if (inputDate.isSame(today, "day")) return "Today";

  if (inputDate.isSame(tomorrow, "day")) return "Tomorrow";

  return inputDate.format(DATE_FORMAT[format]);
};

export const isSameDate = (date1?: string | Date, date2?: string | Date) => {
  if (date1 && date2) {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    return (
      dateObj1.getDate() === dateObj2.getDate() &&
      dateObj1.getMonth() === dateObj2.getMonth() &&
      dateObj1.getFullYear() === dateObj2.getFullYear()
    );
  }

  return false;
};

export const getHoursGapFromDateAndTime = (
  date: Date,
  time: string
): number => {
  const [hours, minutes] = time.split(":").map(Number);

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);

  const now = moment();
  const targetTime = moment(newDate);

  const duration = moment.duration(targetTime.diff(now));

  return duration.asHours();
};

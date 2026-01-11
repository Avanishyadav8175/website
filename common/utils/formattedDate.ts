import moment from "moment";
import { DATE_FORMAT } from "../constants/dateFormat";
import { DateFormatType } from "../types/types";

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

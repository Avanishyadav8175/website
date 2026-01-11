export type SelectCityStatus =
  | ""
  | "not-selected"
  | "available"
  | "not-available";

export type SelectDateStatus = "" | "not-selected" | "selected";
export type DateFormatType = "MINI" | "SHORT" | "FULL";
export const DATE_FORMAT: Record<DateFormatType, string> = {
  MINI: "MMM D",
  SHORT: "MMM Do, YYYY",
  FULL: "dddd Do MMMM, YYYY"
};

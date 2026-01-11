import moment from "moment";

export const getMonthName = ({ month }: { month: number }): string =>
  month < 0 || month > 11 ? "" : moment().month(month).format("MMMM");

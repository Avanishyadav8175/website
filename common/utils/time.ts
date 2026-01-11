export const convertTo12HourFormat = (time24: string): string => {
  let [hours, minutes] = time24.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
};

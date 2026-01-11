export function getFutureDate(hoursAhead: number) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + hoursAhead);
  return currentDate;
}

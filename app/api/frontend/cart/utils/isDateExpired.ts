export const isDateExpired = (date: Date | string): boolean => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) {
    return true;
  }

  const normalizedTargetDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  const today = new Date();
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return normalizedTargetDate < normalizedToday;
};

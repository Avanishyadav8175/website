export function isToday(date: Date) {
  const today = new Date();

  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  );
}

export function isTomorrow(date: Date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    new Date(date).getDate() === tomorrow.getDate() &&
    new Date(date).getMonth() === tomorrow.getMonth() &&
    new Date(date).getFullYear() === tomorrow.getFullYear()
  );
}

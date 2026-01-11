export const getDatesOfMonth = ({
  month,
  year
}: {
  month: number;
  year: number;
}): Date[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates: Date[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }

  return dates;
};

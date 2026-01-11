export const checkIsSameDate = ({
  firstDate,
  secondDate
}: {
  firstDate: Date;
  secondDate: Date;
}): boolean =>
  firstDate.getDate() === secondDate.getDate() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getFullYear() === secondDate.getFullYear();

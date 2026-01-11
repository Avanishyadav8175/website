export const getDateGridPosition = ({
  date
}: {
  date: Date;
}): {
  gridColumn: number;
  gridRow: number;
} => {
  const dayOfWeek = date.getDay();
  const dateOfMonth = date.getDate();

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const colStart = dayOfWeek + 1;

  const rowStart = Math.ceil((dateOfMonth + firstDayOfWeek) / 7) + 1;

  // return `col-start-[${colStart}] row-start-[${rowStart}]`;
  return {
    gridColumn: colStart,
    gridRow: rowStart
  };
};

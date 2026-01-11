export const getNext7Days = (): Date[] =>
  Array.from({ length: 7 }).map((_, index) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });

export const getNext7DaysInString = (): string[] =>
  Array.from({ length: 7 }).map((_, index) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

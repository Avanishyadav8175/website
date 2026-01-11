export const alwaysDecimal = (num: number) => {
  if (String(num).includes(".")) return String(num);
  return `${String(num)}.0`;
};

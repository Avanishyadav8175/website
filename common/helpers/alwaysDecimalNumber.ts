export const alwaysDecimalNumber = (num: number) =>
  `${num}`.includes(".") ? `${num}` : `${num}.0`;

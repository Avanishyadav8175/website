export const onlyDigits = (str: string) =>
  str.replace(/[^\d.-]/g, "").replace(/(\..*)\./g, "$1");

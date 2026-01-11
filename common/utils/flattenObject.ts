export const flattenObject = (
  obj: Record<string, any>,
  prefix?: string
): Record<string, any> => {
  let result: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        Object.assign(result, flattenObject(value));
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
};

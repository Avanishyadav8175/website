export const setLocalStorage = <T>({
  key,
  value
}: {
  key: string;
  value: T;
}) => {
  const serializedValue = JSON.stringify(value);

  localStorage.setItem(key, serializedValue);
};

export const getLocalStorage = <T>({ key }: { key: string }): T | null => {
  const serializedValue = localStorage.getItem(key);

  if (serializedValue) {
    return JSON.parse(serializedValue) as T;
  }

  return null;
};

export const deleteLocalStorage = ({ key }: { key: string }): void => {
  localStorage.removeItem(key);
};

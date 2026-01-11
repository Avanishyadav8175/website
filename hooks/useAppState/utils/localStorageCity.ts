// constants
import { CITY_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import { getLocalStorage, setLocalStorage } from "@/common/utils/storage/local";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

export const setLocalStorageCity = (city: CityDocument): void => {
  setLocalStorage({
    key: CITY_LOCAL_KEY,
    value: city
  });
};

export const getLocalStorageCity = (): CityDocument | null => {
  return getLocalStorage({
    key: CITY_LOCAL_KEY
  });
};

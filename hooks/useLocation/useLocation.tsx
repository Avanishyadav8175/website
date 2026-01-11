/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

// requests
import { fetchLocationData } from "@/request/location/locationData";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

type Location = {
  onSearch: (keyword: string) => CityDocument[];
};

const Location = createContext<Location | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  // states
  const [status, setStatus] = useState<"initial" | "idle" | "pending">(
    "initial"
  );
  const [cities, setCities] = useState<CityDocument[]>([]);

  const getCitySearchSet = () => {
    const set: Map<string, CityDocument[]> = new Map();

    const addToSet = (key: string, city: CityDocument) => {
      if (
        set.has(key) &&
        !(set.get(key) as CityDocument[]).find(({ _id }) => _id === city._id)
      ) {
        set.set(key, [...(set.get(key) as CityDocument[]), city]);
      } else {
        set.set(key, [city]);
      }
    };

    for (let city of cities) {
      const cityName = city.name.toLowerCase();

      for (let i = 2; i <= cityName.length; i++) {
        addToSet(cityName.slice(0, i), city);
      }

      if (city?.aliases && city?.aliases?.length) {
        for (let alias of city.aliases) {
          const aliasLowerCase = alias.toLowerCase();

          for (let i = 2; i <= aliasLowerCase.length; i++) {
            addToSet(aliasLowerCase.slice(0, i), city);
          }
        }
      }
    }

    return set;
  };

  // memoizes
  const citySearchSet: Map<string, CityDocument[]> = useMemo(
    () => getCitySearchSet(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cities]
  );

  // event handlers
  const handleLoadData = () => {
    if (status === "initial") {
      console.log("Loading location data");
      setStatus("pending");

      fetchLocationData()
        .then(({ data: cities }) => {
          if (cities) {
            setCities(cities as CityDocument[]);

            setStatus("idle");
          }
        })
        .catch((error) => {
          setStatus("initial");
          console.error({ error });
        });
    }
  };

  const handleSearch = (keyword: string): CityDocument[] => {
    const filtered = citySearchSet.get(keyword);

    return filtered || [];
  };

  // side effects
  useEffect(() => {
    handleLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Location.Provider
      value={{
        onSearch: handleSearch
      }}
    >
      {children}
    </Location.Provider>
  );
}

export const useLocation = (): Location => {
  const location = useContext(Location);

  if (!location) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return location;
};

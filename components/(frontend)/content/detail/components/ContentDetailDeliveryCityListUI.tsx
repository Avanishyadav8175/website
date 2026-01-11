// hooks
import { useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useLocation } from "@/hooks/useLocation/useLocation";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

export default function ContentDetailDeliveryCityListUI({
  showPopover,
  keyword,
  onChangeShowPopover
}: {
  showPopover: boolean;
  keyword: string;
  onChangeShowPopover: (showPopover: boolean) => void;
}) {
  // hooks
  const {
    location: {
      data: { selectedCity },
      methods: { onChangeCity }
    }
  } = useAppStates();
  const { onSearch } = useLocation();

  // states
  const [filteredCity, setFilteredCity] = useState<CityDocument[]>([]);

  // event handlers
  const handleSelectCity = ({ city }: { city: CityDocument }) => {
    onChangeCity(city);
    onChangeShowPopover(false);
  };

  // side effects
  useEffect(() => {
    if (!showPopover) {
      setFilteredCity([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover) {
      if (selectedCity && keyword === selectedCity.name) {
        setFilteredCity([selectedCity]);
      } else {
        setFilteredCity(onSearch(keyword.toLowerCase()));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover, keyword]);

  if (keyword.length < 2) {
    return <></>;
  }

  return (
    <>
      {filteredCity.length ? (
        filteredCity.map((city, index) => (
          <div
            className="cursor-pointer transition-colors duration-300 py-2 px-2 hover:bg-sienna-1/25 rounded-lg"
            key={index}
            onClick={() => {
              handleSelectCity({ city });
            }}
          >
            {city.name}
          </div>
        ))
      ) : (
        <div className="cursor-pointer transition-colors duration-300 py-2 px-2 hover:bg-sienna-1/25 rounded-lg">
          {`Not Found`}
        </div>
      )}
    </>
  );
}

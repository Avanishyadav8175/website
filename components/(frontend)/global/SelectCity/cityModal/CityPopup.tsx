// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Check, MapPin, Search } from "lucide-react";

// constants
import { SEARCH_PINCODE_BANNER } from "@/common/constants/images";

// utils
import { memo } from "react";
import { whatsappContact } from "@/common/utils/_contactDetails";

// hooks
import { useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useLocation } from "@/hooks/useLocation/useLocation";

// components
import { DrawerClose } from "@/components/ui/drawer";
import Image from "next/image";
import Input from "@/lib/Forms/Input/Input";
import Link from "next/link";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

function CityPopup({ closeDialog }: { closeDialog?: () => void }) {
  // hooks
  const {
    location: {
      data: { selectedCity },
      methods: { onChangeCity }
    }
  } = useAppStates();
  const { onSearch } = useLocation();

  const [keyword, setKeyword] = useState<string>(
    selectedCity === null ? "" : selectedCity.name
  );
  const [filteredCities, setFilteredCities] = useState<CityDocument[]>(
    selectedCity ? [selectedCity] : []
  );
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCity && keyword === selectedCity.name) {
      setFilteredCities([selectedCity]);
    } else {
      setFilteredCities(onSearch(keyword.toLowerCase()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div className="bg-green grid grid-cols-1 lg:gap-x-7">
      <div className="min-h-20 px-3.5 py-6 lg:pt-6 lg:pb-0 lg:px-4 grid grid-cols-1 auto-rows-min">
        <span className="text-lg font-medium text-charcoal-3">
          Enter Delivery Location
        </span>
        <Input
          errorCheck={false}
          validCheck={false}
          isRequired={false}
          name="city"
          customValue={{
            setValue: setKeyword,
            value: keyword
          }}
          type="text"
          customStyle="w-full border-none transition-all duration-300 my-2.5 px-3.5 py-3.5 lg:py-2 lg:max-w-[345px] rounded-xl bg-ivory/90 hover:bg-charcoal-3/10 outline-none focus:outline-1 focus:outline-charcoal-3/15 focus:outline-offset-2"
          placeholder="Enter City"
          onFocus={() => {
            setFocusedInput(true);
          }}
          onBlur={() => {
            setFocusedInput(false);
          }}
        />

        <div
          className={`flex flex-col justify-start overflow-auto scrollbar-hide h-[50dvh] lg:h-[31.5dvh] pb-16 transition-all duration-300`}
        >
          {keyword.length > 1 && filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <>
                <div
                  onClick={() => {
                    onChangeCity(city);

                    if (closeDialog) {
                      closeDialog();
                    }
                  }}
                  key={index}
                  className={`max-lg:hidden relative py-3 lg:py-2.5 border-b-[1.5px] border-ash/50 cursor-pointer flex items-center justify-start gap-3`}
                >
                  <MapPin
                    strokeWidth={1.5}
                    width={21}
                    className="stroke-black/50 peer-focus:stroke-sienna transition-all duration-300"
                  />
                  <span>{city.name}</span>
                  {selectedCity && selectedCity.name === city.name && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-600 flex items-center justify-end gap-x-1.5">
                      <div className="scale-95 bg-green-600 text-white rounded-full aspect-square flex items-center justify-center w-[18px]">
                        <Check
                          width={12}
                          height={12}
                        />
                      </div>
                      <span>Selected</span>
                    </div>
                  )}
                </div>
                <DrawerClose asChild>
                  <div
                    onClick={() => {
                      onChangeCity(city);
                    }}
                    key={index}
                    className={`lg:hidden relative py-3 lg:py-2.5 border-b-[1.5px] border-ash/50 cursor-pointer flex items-center justify-start gap-3`}
                  >
                    <MapPin
                      strokeWidth={1.5}
                      width={21}
                      className="stroke-black/50 peer-focus:stroke-sienna transition-all duration-300"
                    />
                    <span>{city.name}</span>
                    {selectedCity && selectedCity.name === city.name && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-600 flex items-center justify-end gap-x-1.5">
                        <div className="scale-95 bg-green-600 text-white rounded-full aspect-square flex items-center justify-center w-[18px]">
                          <Check
                            width={12}
                            height={12}
                          />
                        </div>
                        <span>Selected</span>
                      </div>
                    )}
                  </div>
                </DrawerClose>
              </>
            ))
          ) : filteredCities.length === 0 && keyword.length > 1 ? (
            <div className="h-full flex flex-col justify-center items-center pb-8 lg:pb-0 lg:pt-3 gap-2.5">
              <Search
                width={35}
                height={35}
                strokeWidth={1.5}
              />
              <span className="font-medium text-lg text-charcoal-3">
                No Location Found
              </span>
              <span className="text-sm flex items-center justify-center gap-x-1.5">
                <span className="text-charcoal-3">Deliver here?</span>
                <Link
                  href={whatsappContact()}
                  target="_blank"
                  className="text-green-500 underline underline-offset-2 transition-all duration-300 hover:text-green-700"
                >
                  Whatsapp Us
                </Link>
              </span>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-x-12 lg:pt-5 h-full *:text-center">
              <div className="flex flex-col justify-center items-center">
                <span className="font-semibold lg:text-sienna-3 text-[36px] -mb-1 lg:text-3xl lg:-mb-0.5">
                  All India
                </span>
                <span className="text-charcoal-3 font-medium text-lg">
                  Delivery across India
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-semibold lg:text-sienna-3 text-[36px] -mb-1 lg:text-3xl lg:-mb-0.5">
                  2 Cr+
                </span>
                <span className="text-charcoal-3 font-medium text-lg">
                  Trusted Customers
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CityPopup);

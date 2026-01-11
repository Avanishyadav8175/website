// icons
import { ChevronDown, MapPinIcon } from "lucide-react";

// utils
import { memo } from "react";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

function SelectCityDesktop({
  selectedCity,
  onClick
}: {
  selectedCity: CityDocument | null;
  onClick: () => void;
}) {
  return (
    <div
      className="relative text-charcoal-3/90 flex items-center justify-start text-sm cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`hidden lg:grid grid-cols-[17px_auto] grid-rows-2 items-center justify-start min-w-fit border-l border-l-charcoal/30 pl-3.5 pr-4 *:leading-tight text-charcoal/95 cursor-pointer lg:ml-2`}
      >
        <span
          className={`flex items-center gap-0.5 -mb-1 text-xs text-charcoal-3/70 font-semibold col-span-2`}
        >
          Location
        </span>
        {selectedCity ? (
          <>
            {/* <MapPinIcon
              width={15}
              height={15}
              fill="#b76e79"
              stroke={"#fff"}
              className={"scale-125"}
            /> */}
            <span
              className={`text-base font-semibold text-sienna-1 lg:col-span-2 w-full text-charcoal-3/80 truncate max-w-[120px] lg:max-w-[170px]`}
            >
              {selectedCity.name}
            </span>
          </>
        ) : (
          <>
            <span
              className={`bg-gradient-to-br from-sienna/90 via-sienna-2/50 to-sienna/90 text-white font-light rounded-sm p-0.5 text-sm col-span-2 w-full max-lg:px-2 text-center animate-pulse`}
            >
              <span className="max-lg:hidden">Select</span>
              <span className="lg:hidden">Select City</span>
            </span>
          </>
        )}
        <span className="absolute -right-2 -bottom-0 text-charcoal-3/80">
          <ChevronDown
            width={18}
            height={18}
          />
        </span>
      </div>
    </div>
  );
}

export default memo(SelectCityDesktop);

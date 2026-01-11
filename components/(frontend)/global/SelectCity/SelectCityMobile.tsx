// icons
import { ArrowRight, ChevronDown, MapPinIcon } from "lucide-react";

// utils
import { memo } from "react";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

function SelectCityMobile({
  selectedCity,
  onClick
}: {
  selectedCity: CityDocument | null;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-device min-[1200px]:w-1200 relative left-1/2 -translate-x-1/2 lg:hidden !px-2.5 !py-2 border-t bg-sienna/70 border-charcoal-3/10 z-20`}
    >
      <div
        className="relative text-charcoal-3/90 flex items-center justify-start text-sm cursor-pointer"
        onClick={onClick}
      >
        <div className={"flex items-center justify-start max-lg:gap-2.5"}>
          {selectedCity ? (
            <>
              {/* <MapPinIcon
                width={15}
                height={15}
                fill="#b76e79"
                stroke={"#fafafa"}
                className={"scale-[1.6]"}
              /> */}
              <span
                className={`text-sm w-full text-center text-ivory-1 font-medium`}
              >
                {`Deliver to: ${selectedCity.name}`}
              </span>
            </>
          ) : (
            <>
              {/* <MapPinIcon
                width={15}
                height={15}
                fill="#b76e79"
                stroke="#fafafa"
                className={"scale-[1.6]"}
              /> */}
              <span className={`max-lg:text-sm max-lg:w-full max-lg:text-center max-lg:text-ivory-1 max-lg:font-medium lg:text-charcoal-3/80 `}>
                <span className="max-lg:hidden">Select</span>
                <span className="lg:hidden">Select City</span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(SelectCityMobile);

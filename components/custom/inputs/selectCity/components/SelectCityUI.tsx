// icons
import { CircleCheckBig, CircleMinus } from "lucide-react";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

export default function SelectCityUI({
  mode,
  heading,
  selectedCityIds,
  selectedCities,
  onChangeSelectedCityId
}: {
  mode: "selected" | "not-selected";
  heading: string;
  selectedCityIds: string[];
  selectedCities: CityDocument[];
  onChangeSelectedCityId: (selectedCityIds: string[]) => void;
}) {
  // event handlers
  const handleSelectPincode = (pincodeId: string) => {
    onChangeSelectedCityId([...selectedCityIds, pincodeId]);
  };

  const handleDeselectPincode = (pincodeId: string) => {
    onChangeSelectedCityId(
      [...selectedCityIds].filter((id) => id !== pincodeId)
    );
  };

  return (
    <section className="flex flex-col gap-5 w-full h-[70dvh] text-center overflow-y-scroll scrollbar-hide rounded-lg">
      <span className="text-left text-lg font-medium">{heading}</span>
      <section className="flex flex-col items-center justify-center gap-3 w-full">
        {selectedCities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ _id, name }, i) => (
            <section
              key={i}
              className="flex items-center justify-start gap-5 w-full cursor-pointer"
              onClick={
                mode === "selected"
                  ? () => {
                      handleDeselectPincode(_id as string);
                    }
                  : () => {
                      handleSelectPincode(_id as string);
                    }
              }
            >
              <div
                className="flex items-center justify-start transition-colors duration-200 hover:text-red-600"
                onClick={
                  mode === "selected"
                    ? () => {
                        handleDeselectPincode(_id as string);
                      }
                    : () => {
                        handleSelectPincode(_id as string);
                      }
                }
              >
                {mode === "selected" ? (
                  <CircleMinus
                    strokeWidth={2}
                    width={20}
                  />
                ) : (
                  <CircleCheckBig
                    strokeWidth={2}
                    width={20}
                  />
                )}
              </div>
              <span className="mb-1">{name}</span>
            </section>
          ))}
      </section>
    </section>
  );
}

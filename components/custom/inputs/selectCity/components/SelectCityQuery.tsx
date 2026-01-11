// icons
import { RotateCcw } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type SelectOption } from "@/common/types/inputs";

export default function SelectCityQuery({
  stateId,
  showTopCities,
  keyword,
  stateOptions,
  onChangeStateId,
  onChangeShowTopCities,
  onChangeKeyword,
  onReset
}: {
  stateId: string;
  showTopCities: boolean;
  keyword: string;
  stateOptions: SelectOption[];
  onChangeStateId: (newStateId: string) => void;
  onChangeShowTopCities: (showTopCities: boolean) => void;
  onChangeKeyword: (newKeyword: string) => void;
  onReset: () => void;
}) {
  return (
    <section className="flex items-center justify-center gap-3">
      <Input
        type="dropdown"
        name="state"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[{ label: "All States", value: "" }, ...stateOptions]}
        customValue={{
          value: stateId,
          setValue: onChangeStateId
        }}
      />
      <Input
        type="dropdown"
        name="cityType"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          { label: "All Cities", value: "" },
          { label: "Top Cities", value: "top-cities" }
        ]}
        customValue={{
          value: showTopCities ? "top-cities" : "",
          setValue: (newShowTopCities) => {
            onChangeShowTopCities(Boolean(newShowTopCities));
          }
        }}
      />
      <Input
        type="text"
        name="search"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        placeholder="search..."
        customValue={{
          value: keyword,
          setValue: onChangeKeyword
        }}
      />
      <div
        className="flex items-center justify-center gap-2 px-5 py-2 bg-black text-white rounded-md cursor-pointer"
        onClick={onReset}
      >
        <RotateCcw
          strokeWidth={2}
          width={20}
        />
        <span>Reset</span>
      </div>
    </section>
  );
}

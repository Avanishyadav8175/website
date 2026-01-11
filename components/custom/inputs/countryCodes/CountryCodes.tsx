// requests
// import { fetchCountryCodes } from "@/request/preset/countryCode";

// utils
import { memo } from "react";

// hooks
// import { useCallback, useEffect, useState } from "react";

// components
import Combobox from "@/components/ui/combobox";

// types
// import { type CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";

function CountryCodes({
  isExpanded,
  selected,
  theme,
  onChangeIsExpanded,
  onSelect
}: {
  isExpanded: boolean;
  selected: string;
  theme?: "default" | "transparent";
  onChangeIsExpanded: (newIsExpanded: boolean) => void;
  onSelect: (newSelected: string) => void;
}) {
  return (
    <Combobox
      showCombobox={isExpanded}
      options={[{ name: "india", code: "+91" }].map(({ name, code }) => ({
        label: `${name}, ${code}`,
        value: code
      }))}
      selected={selected}
      onChangeShowCombobox={onChangeIsExpanded}
      onSelect={onSelect}
      theme={theme || "default"}
    />
  );
}

export default memo(CountryCodes);

"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInputType } from "../static/types";
import { InputAuthenticityType } from "../../_static/types";
import { authenticityStyles } from "../../_utils/authenticityStyles";
import LabelWrapper from "../../_utils/LabelWrapper";

export default function TextInput(config: CustomInputType) {
  config = { ...config, type: "text" };

  const [mode, setMode] = useState<InputAuthenticityType>("neutral");
  const [input, setInput] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [filledInput, setFilledInput] = useState<boolean>(false);

  const authenticityStyle = authenticityStyles(config, mode);

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    if (config.customValue) config.customValue.setValue(e.target.value);
    if (config.validCheck)
      setMode((prev) =>
        config.validLogic(e.target.value) ? "valid" : "neutral"
      );
    if (config.errorCheck)
      setMode((prev) =>
        config.errorLogic(e.target.value) ? "error" : "neutral"
      );

    if (e.target.value.length) setFilledInput((prev) => true);
    if (config.onChange) setInput((prev) => e.target.value);
  };

  useEffect(() => {
    if (config.onChange && filledInput) {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const newTimeout = setTimeout(() => {
        if (config.onChange) config.onChange(input);
      }, 3000);

      setDebounceTimeout(newTimeout);

      return () => clearTimeout(newTimeout);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <LabelWrapper
      label={config.labelConfig?.label}
      isRequired={config.isRequired}
      labelStyle={config.labelConfig?.labelStyle || ""}
      layoutStyle={config.labelConfig?.layoutStyle || ""}
    >
      <input
        type="text"
        name={config.name}
        placeholder={config.placeholder || ""}
        id={config.id || undefined}
        disabled={config.isDisabled || false}
        defaultValue={config.defaultValue}
        value={config.customValue ? config.customValue.value : undefined}
        onChange={handleInputChanges}
        onFocus={() => (config.onFocus ? config.onFocus() : () => {})}
        onBlur={() => (config.onBlur ? config.onBlur() : () => {})}
        className={
          config.customStyle
            ? `${config.customStyle} ${authenticityStyle}`
            : `transition-all duration-300 w-full rounded-lg py-2 px-3 bg-charcoal-3/10 hover:bg-charcoal-3/15 outline-none border-none focus:outline-1 focus:outline-offset-2 focus:outline-charcoal-3/20  ${config.className || ""} ${authenticityStyle}`
        }
        required={config.isRequired}
      />
    </LabelWrapper>
  );
}

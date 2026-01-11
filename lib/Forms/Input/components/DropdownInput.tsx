"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInputType } from "../static/types";
import { InputAuthenticityType } from "../../_static/types";
import { authenticityStyles } from "../../_utils/authenticityStyles";
import LabelWrapper from "../../_utils/LabelWrapper";

export default function DropdownInput(config: CustomInputType) {
  const [selected, setSelected] = useState<string>(
    config.defaultValue ? config.defaultValue : ""
  );
  const [mode, setMode] = useState<InputAuthenticityType>("neutral");

  useEffect(() => {
    if (config.defaultValue && config.defaultValue !== selected) {
      setSelected(config.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.defaultValue]);

  if (config.type === "dropdown") {
    config = { ...config, type: "dropdown" };
    const { onChange } = config;

    const authenticityStyle = authenticityStyles(config, mode);

    const handleInputChanges = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value);

      setMode((prev) => (e.target.value.length ? "valid" : "neutral"));

      if (onChange) onChange(e.target.value);
    };

    return (
      <LabelWrapper
        label={config.labelConfig?.label}
        isRequired={config.isRequired}
        labelStyle={config.labelConfig?.labelStyle || ""}
        layoutStyle={config.labelConfig?.layoutStyle || ""}
      >
        <select
          className={
            config.customStyle
              ? `${config.customStyle} ${authenticityStyle}`
              : `transition-all duration-300 w-full cursor-pointer rounded-lg py-3 px-3 bg-charcoal-3/10 hover:bg-charcoal-3/15 outline-none border-none focus:outline-1 focus:outline-offset-2 focus:outline-charcoal-3/20 ${config.className || ""} ${authenticityStyle}`
          }
          id={config.id}
          name={config.name}
          required={config.isRequired}
          disabled={config.isDisabled}
          value={config.customValue ? config.customValue.value : selected}
          onChange={
            config.customValue
              ? (e) => {
                  if (e.target.value !== config.customValue?.value) {
                    config.customValue?.setValue(e.target.value);
                  }
                }
              : handleInputChanges
          }
        >
          {config.nullOption ? (
            <option
              value=""
              disabled
            >
              {config?.customInitialValuePlaceholderLabel || "None"}
            </option>
          ) : (
            <></>
          )}
          {config.options.map(({ label, value }, index) => (
            <option
              value={value}
              key={index}
            >
              {label}
            </option>
          ))}
        </select>
      </LabelWrapper>
    );
  } else return <></>;
}

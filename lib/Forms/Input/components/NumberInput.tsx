/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { onlyDigits } from "@/common/helpers/getOnlyDigits";
import { CustomInputType } from "../static/types";
import { ChangeEvent, useDeferredValue, useEffect, useState } from "react";
import { InputAuthenticityType } from "../../_static/types";
import { authenticityStyles } from "../../_utils/authenticityStyles";
import LabelWrapper from "../../_utils/LabelWrapper";

export default function NumberInput(config: CustomInputType) {
  config = { ...config, type: "number" };

  const [mode, setMode] = useState<InputAuthenticityType>("neutral");
  const [currInput, setCurrInput] = useState<string>(
    config.defaultValue
      ? config.defaultValue
      : config.customValue
        ? config.customValue.value
        : ""
  );
  const deferredInput = useDeferredValue(currInput);

  const authenticityStyle = authenticityStyles(config, mode);

  const handleInputChanges = ({
    target: { value: newValue }
  }: ChangeEvent<HTMLInputElement>) => {
    if (!config.maxLength || newValue.length <= config.maxLength) {
      setCurrInput((prev) => onlyDigits(newValue));

      if (config.onChange) {
        config.onChange(newValue);
      }
    }
  };

  useEffect(() => {
    if (config.customValue) {
      config.customValue.setValue(deferredInput);
    }

    if (config.validCheck)
      setMode((prev) => (config.validLogic(currInput) ? "valid" : "neutral"));
    if (config.errorCheck)
      setMode((prev) => (config.errorLogic(currInput) ? "error" : "neutral"));
  }, [deferredInput]);

  useEffect(() => {
    if (config.defaultValue) {
      setCurrInput(config.defaultValue);
    }
  }, [config.defaultValue]);

  useEffect(() => {
    if (config.customValue) {
      if (!currInput?.endsWith(".") && config.customValue.value !== currInput) {
        setCurrInput(config.customValue.value);
      }
    }
  }, [config.customValue]);

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
        value={currInput}
        onChange={handleInputChanges}
        className={
          config.customStyle
            ? `${config.customStyle} ${authenticityStyle}`
            : `transition-all duration-300 w-full rounded-lg py-2 px-3 bg-charcoal-3/10 hover:bg-charcoal-3/15 outline-none border-none focus:outline-1 focus:outline-offset-2 focus:outline-charcoal-3/20 ${config.className || ""} ${authenticityStyle}`
        }
        required={config.isRequired}
      />
    </LabelWrapper>
  );
}

"use client";
import { CustomInputType } from "../static/types";
import { ChangeEvent, useState } from "react";
import { InputAuthenticityType } from "../../_static/types";
import { authenticityStyles } from "../../_utils/authenticityStyles";
import { REGEX_TEST } from "@/common/constants/regex";
import LabelWrapper from "../../_utils/LabelWrapper";

export default function EmailInput(config: CustomInputType) {
  config = { ...config, type: "email" };

  const [mode, setMode] = useState<InputAuthenticityType>("neutral");

  const authenticityStyle = authenticityStyles(config, mode);

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    if (config.customValue) config.customValue.setValue(e.target.value);

    if (!config.errorCheck && !config.validCheck) {
      if (REGEX_TEST.EMAIL.test(e.target.value)) setMode((prev) => "valid");
      else {
        setMode((prev) => (e.target.value.includes("@") ? "error" : "neutral"));
      }
    } else {
      if (config.validCheck)
        setMode((prev) =>
          config.validLogic(e.target.value) ? "valid" : "neutral"
        );
      if (config.errorCheck && config.errorLogic(e.target.value))
        setMode((prev) => "error");
    }

    if (config.onChange) config.onChange(e.target.value);
  };

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
        className={
          config.customStyle
            ? `${config.customStyle} ${authenticityStyle}`
            : `transition-all duration-300  w-full rounded-lg py-2 px-3 bg-charcoal-3/10 hover:bg-charcoal-3/15 outline-none border-none focus:outline-1 focus:outline-offset-2 focus:outline-charcoal-3/20 ${config.className || ""} ${authenticityStyle}`
        }
        required={config.isRequired}
      />
    </LabelWrapper>
  );
}

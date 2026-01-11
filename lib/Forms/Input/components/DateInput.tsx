"use client";
import LabelWrapper from "../../_utils/LabelWrapper";
import { CustomInputType } from "../static/types";

export default function DateInput(config: CustomInputType) {
  config = { ...config, type: "date" };

  return (
    <LabelWrapper
      label={config.labelConfig?.label}
      isRequired={config.isRequired}
      labelStyle={config.labelConfig?.labelStyle || ""}
      layoutStyle={config.labelConfig?.layoutStyle || ""}
    >
      <input
        type="date"
        name={config.name}
        id={config.id || undefined}
        disabled={config.isDisabled || false}
        defaultValue={config?.defaultValue}
        value={config.customValue ? config.customValue.value : undefined}
        onChange={(e) => {
          if (config.customValue) {
            config.customValue.setValue(e.target.value);
          }
        }}
        className={
          config.customStyle
            ? `${config.customStyle} ${"authenticityStyle"}`
            : `transition-all duration-300 bg-ash/40 px-3.5 py-2 rounded-xl min-w-24 min-h-8 cursor-pointer border-none outline-none ${config.className || ""}`
        }
      />
    </LabelWrapper>
  );
}

import { useEffect, useState } from "react";
import LabelWrapper from "../../_utils/LabelWrapper";
import { CustomInputType } from "../static/types";

export default function ColorInput(config: CustomInputType) {
  config = { ...config, type: "color" };

  const [color, setColor] = useState<string>(
    config.defaultValue || config?.customValue?.value || "#000"
  );
  const [tempColor, setTempColor] = useState<string>(
    config.defaultValue || config?.customValue?.value || "#000"
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (config.defaultValue && config.defaultValue !== color) {
      setTempColor(config.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.defaultValue]);

  useEffect(() => {
    if (config.customValue && config.customValue.value !== color) {
      setTempColor(config.customValue.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.customValue?.value]);

  useEffect(() => {
    if (
      config.customValue &&
      config.customValue.setValue &&
      color !== config.customValue.value
    )
      config.customValue.setValue(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setColor((prev) => tempColor);
    }, 1000);

    setTimer(newTimer);

    return () => clearTimeout(newTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempColor]);

  return (
    <LabelWrapper
      label={config.labelConfig?.label}
      isRequired={config.isRequired}
      labelStyle={config.labelConfig?.labelStyle || ""}
      layoutStyle={config.labelConfig?.layoutStyle || ""}
    >
      <input
        type="color"
        name={config.name}
        id={config.id || undefined}
        disabled={config.isDisabled || false}
        value={tempColor}
        onChange={(e) => {
          setTempColor(e.target.value);
        }}
        className={
          config.customStyle
            ? `${config.customStyle} ${"authenticityStyle"}`
            : `transition-all duration-300 min-h-12 min-w-12 cursor-pointer border-none outline-none ${config.className || ""}`
        }
      />
    </LabelWrapper>
  );
}

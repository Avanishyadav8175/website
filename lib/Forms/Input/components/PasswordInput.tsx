"use client";
import { CustomInputType } from "../static/types";
import { ChangeEvent, useEffect, useState } from "react";
import { InputAuthenticityType } from "../../_static/types";
import { authenticityStyles } from "../../_utils/authenticityStyles";
import LabelWrapper from "../../_utils/LabelWrapper";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput(config: CustomInputType) {
  config = { ...config, type: "password" };

  const [mode, setMode] = useState<InputAuthenticityType>("neutral");
  const [password, setPassword] = useState<string>(
    config.customValue ? config.customValue.value : ""
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const authenticityStyle = authenticityStyles(config, mode);

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    if (config.validCheck)
      setMode((prev) =>
        config.validLogic(e.target.value) ? "valid" : "neutral"
      );
    if (config.errorCheck)
      setMode((prev) =>
        config.errorLogic(e.target.value) ? "error" : "neutral"
      );
    if (config.onChange) config.onChange(e.target.value);

    setPassword((prev) => e.target.value);
  };

  const handleHiddenPasswordChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    if (updatedValue.length > password.length) {
      const extraLen = updatedValue.length - password.length;
      setPassword(
        (prev) =>
          `${prev}${updatedValue.substring(password.length, password.length + extraLen)}`
      );
    } else if (updatedValue.length < password.length) {
      setPassword((prev) => prev.substring(0, updatedValue.length));
    }
  };

  useEffect(() => {
    if (config.defaultValue) {
      setPassword(config.defaultValue);
    }
  }, [config.defaultValue]);

  useEffect(() => {
    if (config.customValue) config.customValue.setValue(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <LabelWrapper
      label={config.labelConfig?.label}
      isRequired={config.isRequired}
      labelStyle={config.labelConfig?.labelStyle || ""}
      layoutStyle={config.labelConfig?.layoutStyle || ""}
    >
      <span className="grid *:row-start-1 *:col-start-1 relative">
        <input
          type={showPassword ? "text" : "password"}
          name={config.name}
          placeholder={config.placeholder || ""}
          id={config.id || undefined}
          disabled={config.isDisabled || false}
          value={password}
          onChange={handleInputChanges}
          className={
            config.customStyle
              ? `${config.customStyle} ${authenticityStyle}`
              : `transition-all duration-300 w-full rounded-lg py-2 px-3 z-10 h-[44px] bg-charcoal-3/10 hover:bg-charcoal-3/15 outline-none border-none focus:outline-1 focus:outline-offset-2 focus:outline-charcoal-3/20 ${config.className || ""} ${authenticityStyle}`
          }
          required={config.isRequired}
        />
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className="z-30 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <Eye
              strokeWidth={1.7}
              width={22}
              height={22}
            />
          ) : (
            <EyeOff
              strokeWidth={1.7}
              width={22}
              height={22}
            />
          )}
        </div>
      </span>
    </LabelWrapper>
  );
}

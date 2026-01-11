"use client";

// decorators
import { authenticityStyles } from "../_utils/authenticityStyles";

// hooks
import { useDeferredValue, useEffect, useState } from "react";

// components
import LabelWrapper from "../_utils/LabelWrapper";

// types
import { type ChangeEvent } from "react";
import { type CustomTextareaType } from "./static/types";
import { type InputAuthenticityType } from "../_static/types";

export default function Textarea(config: CustomTextareaType) {
  const [mode, setMode] = useState<InputAuthenticityType>("neutral");
  const [content, setContent] = useState<string>(
    config.defaultValue
      ? config.isList
        ? `• ${config.defaultValue.join("\n• ")}`
        : config.defaultValue
      : config?.customValue?.value && config.isList
        ? `• ${config.customValue.value.join("\n• ")}`
        : ""
  );
  const deferredContent = useDeferredValue(content);

  const value = config.isList
    ? content.length < 2
      ? "• "
      : !content.startsWith("• ")
        ? "• "
        : content.endsWith("•")
          ? content.slice(0, content.length - 2)
          : content.endsWith("• \n")
            ? content.slice(0, content.length - 1)
            : `${content.startsWith("• ") ? "" : "• "}${content.replace(/\n(?!•)/g, "\n• ")}`
    : config.customValue
      ? config.customValue.value
      : content;

  const setValue = config.customValue
    ? config.isList
      ? setContent
      : config.customValue.setValue
    : setContent;

  const authenticityStyle = authenticityStyles(config, mode);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent =
      !config.isList && config.maxLen
        ? e.target.value.substring(0, config.maxLen)
        : e.target.value;

    setValue(newContent);
  };

  // effects
  // update local state if default value updates
  useEffect(() => {
    if (config.defaultValue) {
      setContent(
        config.isList
          ? `• ${config.defaultValue.join("\n• ")}`
          : config.defaultValue
      );
    }
  }, [config.defaultValue, config.isList]);

  // for list update local state if custom value updates
  useEffect(() => {
    if (
      config.isList &&
      config.customValue &&
      content
        .slice(2, content.length)
        .split("\n• ")
        .filter((item) => item.trim())
        .map((item) => item.trim())
        .join(",") !== config.customValue.value.join(",")
    ) {
      setContent(`• ${config.customValue.value.join("\n• ")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.customValue, config.isList]);

  // for list update custom value if local state updates
  useEffect(() => {
    if (
      config.isList &&
      config.customValue &&
      config.customValue.value.join(",") !==
        deferredContent
          .slice(2, content.length)
          .split("\n• ")
          .filter((item) => item.trim())
          .map((item) => item.trim())
          .join(",")
    ) {
      config.customValue.setValue(
        value
          .slice(2, value.length)
          .split("\n• ")
          .filter((item) => item.trim())
          .map((item) => item.trim())
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredContent]);

  useEffect(() => {
    if (config.validCheck) {
      setMode(config.validLogic(value) ? "valid" : "neutral");
    }

    if (config.errorCheck) {
      setMode(config.errorLogic(value) ? "error" : "neutral");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <LabelWrapper
      label={config.labelConfig?.label}
      isRequired={config.isRequired}
      isTextArea
      labelStyle={config.labelConfig?.labelStyle || ""}
      layoutStyle={config.labelConfig?.layoutStyle || ""}
    >
      <div
        className={
          config.customStyle
            ? `${authenticityStyle}`
            : `transition-all duration-300 w-full grid grid-cols-1 gap-y-2 ${config.className || ""} ${authenticityStyle}`
        }
      >
        <textarea
          id={config.id || undefined}
          name={config.isList ? "shadowTextarea" : config.name}
          placeholder={config.placeholder || ""}
          value={value}
          required={config.isRequired}
          disabled={config.isDisabled || false}
          onChange={handleChange}
          rows={config?.longer ? 15 : 5}
          className={
            config.customStyle ||
            `resize-none outline-none overflow-auto scrollbar-hide bg-ash/30 py-3 px-4 rounded-xl transition-all duration-300 focus:bg-ash/40 focus:ring-[1px] focus:ring-charcoal-3/30 focus:ring-offset-[2px]`
          }
        />
        {config.maxLen ? (
          <div>
            <span>
              {content.length} / {config.maxLen}
            </span>
          </div>
        ) : (
          <></>
        )}
        {config.isList ? (
          <textarea
            className={`hidden resize-none outline-none overflow-auto scrollbar-hide bg-ash/30 py-3 px-4 rounded-xl transition-all duration-300 focus:bg-ash/40 focus:ring-[1px] focus:ring-charcoal-3/30 focus:ring-offset-[2px]`}
            id={config?.id}
            name={config.name}
            readOnly
            placeholder={config?.placeholder || ""}
            value={
              value.length > 2
                ? JSON.stringify(
                    value
                      .slice(2, value.length)
                      .split("\n• ")
                      .filter((item) => item.trim())
                  )
                : ""
            }
            onChange={() => {}}
          />
        ) : (
          <></>
        )}
      </div>
    </LabelWrapper>
  );
}

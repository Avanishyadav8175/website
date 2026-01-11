"use client";

// hooks
import { useEffect, useState } from "react";

// components
import LabelWrapper from "../../_utils/LabelWrapper";

// types
import { type SelectOption } from "@/common/types/inputs";

export default function CheckBox(
  props: {
    name: string;
    label?: string;
    isDisabled?: boolean;
    performReset?: boolean;
    options: SelectOption[];
    defaultValue?: string[];
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
      }
  ) &
    (
      | {
          value?: undefined;
          defaultValue?: string[];
        }
      | {
          value?: string[];
          defaultValue?: undefined;
          onChangeValue: (newValue: string[]) => void;
        }
    )
) {
  // props
  const {
    name,
    label,
    isRequired,
    isDisabled,
    performReset,
    options,
    defaultValue,
    value
  } = props;

  // states
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValue ? [...defaultValue] : []
  );

  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setSelectedOptions(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (performReset) {
      setSelectedOptions([]);
    }
  }, [performReset]);

  useEffect(() => {
    if (value) {
      props.onChangeValue(selectedOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return (
    <LabelWrapper
      label={label}
      isRequired={isRequired}
      isTextArea
      labelStyle=""
      layoutStyle=""
    >
      <div className="max-h-[100px] py-1 overflow-y-scroll scrollbar-hide">
        {options.map(({ label: optionLabel, value: optionValue }, i) => (
          <label
            key={i}
            className="grid grid-cols-[20px_1fr] items-center justify-center gap-2"
          >
            <input
              type="checkbox"
              name="options"
              disabled={isDisabled}
              value={optionValue}
              checked={
                value
                  ? value.includes(optionValue)
                  : selectedOptions.includes(optionValue)
              }
              onChange={(e) => {
                setSelectedOptions((prevSelectedOptions) =>
                  prevSelectedOptions.includes(e.target.value)
                    ? [...prevSelectedOptions].filter(
                        (option) => option !== e.target.value
                      )
                    : [...prevSelectedOptions, e.target.value]
                );
              }}
            />
            <span>{optionLabel}</span>
          </label>
        ))}
      </div>
      {!value && (
        <input
          className="hidden"
          type="text"
          name={name}
          value={selectedOptions.join(",")}
          onChange={() => {}}
        />
      )}
    </LabelWrapper>
  );
}

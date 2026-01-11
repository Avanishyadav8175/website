"use client";

// icons
import { X } from "lucide-react";

// hooks
import { ReactNode, useEffect, useState } from "react";

// components
import Input from "../Input/Input";
import LabelWrapper from "../_utils/LabelWrapper";

// types
import { AdvanceSelectOption, SelectOption } from "@/common/types/inputs";

export default function AdvancedCheckbox(
  props: {
    name: string;
    label?: string;
    isDisabled?: boolean;
    performReset?: boolean;
    searchPlaceholder?: string;
    options: SelectOption[] | AdvanceSelectOption[];
    labelStyle?: string | undefined;
    layoutStyle?: string | undefined;
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
          selectedValues?: undefined;
          defaultSelected?: string[];
        }
      | {
          selectedValues?: string[];
          defaultSelected?: undefined;
          onChangeSelectedValues: (newSelectedValues: string[]) => void;
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
    searchPlaceholder,
    options,
    defaultSelected,
    selectedValues,
    labelStyle,
    layoutStyle
  } = props;

  // states
  const [keyword, setKeyword] = useState<string>("");
  const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(
    defaultSelected ? defaultSelected : []
  );

  // variables
  const selected =
    selectedValues !== undefined ? selectedValues : selectedOptionValues;
  const setSelected =
    selectedValues !== undefined
      ? props.onChangeSelectedValues
      : setSelectedOptionValues;

  // effects
  useEffect(() => {
    if (defaultSelected !== undefined) {
      setSelectedOptionValues(defaultSelected);
    }
  }, [defaultSelected]);

  return (
    <LabelWrapper
      label={label}
      isRequired={isRequired}
      labelStyle={labelStyle}
      layoutStyle={layoutStyle}
    >
      <div className="px-5 py-6 grid grid-rows-[47px_1fr] grid-cols-1 gap-4 rounded-2xl bg-teal-100/70 border border-teal-200">
        <div className="border rounded-full border-charcoal-3/30 px-4 flex items-center">
          <Input
            type="text"
            customValue={{
              value: keyword,
              setValue: (newVal: string) => setKeyword((prev) => newVal)
            }}
            errorCheck={false}
            validCheck={false}
            isRequired={false}
            name=""
            customStyle="bg-transparent w-full outline-none"
            placeholder={searchPlaceholder || "Search words"}
          />
        </div>
        <div className="grid grid-cols-1 auto-rows-min *:flex *:flex-wrap *:items-start *:justify-start *:gap-2">
          <div className="*:bg-teal-500 *:text-white *:rounded-full *:py-1 *:pl-4 *:pr-3 pb-3 border-b border-ash *:cursor-pointer *:transition-all *:duration-300 *:flex *:items-center *:justify-center *:gap-1">
            {options
              .filter(({ value }) => selected.includes(value))
              .map((option, index) => (
                <span
                  className="hover:bg-teal-600"
                  key={index}
                  onClick={() => {
                    setSelected(
                      selected.filter(
                        (prevSelected) => prevSelected !== option.value
                      )
                    );
                  }}
                >
                  <span>
                    {"labelElement" in option
                      ? (option.labelElement as ReactNode)
                      : option.label}
                  </span>
                  <X
                    strokeWidth={1.5}
                    width={17}
                    height={17}
                  />
                </span>
              ))}
          </div>
          <div className="*:bg-ash/60 *:rounded-full *:py-1 *:px-4 pt-3 *:cursor-pointer *:transition-all *:duration-300">
            <span
              className="!bg-black text-white"
              onClick={() => {
                setSelected(
                  selected.length === options.length
                    ? []
                    : [
                        ...selected,
                        ...options
                          .filter(({ value }) => !selected.includes(value))
                          .filter(({ label }) =>
                            label
                              .toString()
                              .toLowerCase()
                              .includes(keyword.toLowerCase())
                          )
                          .map(({ value }) => value)
                      ]
                );
              }}
            >
              {selected.length === options.length
                ? "DESELECT ALL"
                : "SELECT ALL"}
            </span>
            {options
              .filter(({ value }) => !selected.includes(value))
              .filter(({ label }) =>
                label.toString().toLowerCase().includes(keyword.toLowerCase())
              )
              .map((option, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setSelected([...selected, option.value]);
                  }}
                  className="hover:bg-charcoal-3/20"
                >
                  {"labelElement" in option
                    ? (option.labelElement as ReactNode)
                    : option.label}
                </span>
              ))}
          </div>
        </div>
      </div>
      <input
        className="hidden"
        type="text"
        name={name}
        value={selected.length ? JSON.stringify(selected) : ""}
        onChange={() => {}}
      />
    </LabelWrapper>
  );
}

// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getTextareaListItemValue } from "./utils/getTextareaListItemValue";

// hooks
import { useDeferredValue, useEffect, useState } from "react";

// components
import TextareaListItem from "./components/TextareaListItem";

// types
import { type TextareaListItem as TextareaListItemType } from "./types/type";

export default function TextareaList(
  props: {
    name: string;
    label?: string;
    itemLabel?: string;
    performReset?: boolean;
    defaultValue?: string[];
  } & (
    | {
        isRequired?: false;
      }
    | {
        isRequired: true;
        label: string;
      }
  ) &
    (
      | {
          value?: undefined;
          defaultValue?: string[];
        }
      | {
          value: string[];
          defaultValue?: undefined;
          onChangeValue: (newValue: string[]) => void;
        }
    )
) {
  // props
  const {
    name,
    label,
    itemLabel,
    isRequired,
    performReset,
    defaultValue,
    value
  } = props;

  // states
  const [items, setItems] = useState<TextareaListItemType[]>(
    defaultValue && defaultValue.length
      ? defaultValue.map((content) => getTextareaListItemValue({ content }))
      : value && value.length
        ? value.map((content) => getTextareaListItemValue({ content }))
        : [getTextareaListItemValue({ content: "" })]
  );
  const deferredItems = useDeferredValue(items);

  // variables
  const returnValue = items
    .map(({ content }) => content.trim())
    .filter((item) => item);

  // handlers
  const handleAddQA = () => {
    setItems([...items, getTextareaListItemValue({ content: "" })]);
  };

  const handleDeleteQA = (itemId: string) => {
    if (items.length === 1) {
      setItems([getTextareaListItemValue({ content: "" })]);
    } else {
      setItems([...items].filter(({ _id }) => _id !== itemId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setItems(
        defaultValue.map((content) => getTextareaListItemValue({ content }))
      );
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(returnValue) !== JSON.stringify(value)) {
        setItems(
          value.length
            ? value.map((content) => getTextareaListItemValue({ content }))
            : [getTextareaListItemValue({ content: "" })]
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(returnValue)) {
        props.onChangeValue(returnValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredItems]);

  return (
    <>
      {label && <div className="text-xl font-light">{label}</div>}
      {items.map((item, i) => (
        <TextareaListItem
          key={i}
          index={i}
          content={item.content}
          label={itemLabel}
          onChangeContent={(content) => {
            setItems(
              [...items].map((prevItem) =>
                prevItem._id === item._id ? { ...prevItem, content } : prevItem
              )
            );
          }}
          onDeleteContent={() => {
            handleDeleteQA(item._id as string);
          }}
        />
      ))}
      <div
        onClick={handleAddQA}
        className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
      >
        <Plus
          strokeWidth={1.5}
          width={20}
          height={20}
        />
        <span>Add another</span>
      </div>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue.length ? JSON.stringify(returnValue) : ""}
        onChange={() => {}}
      />
    </>
  );
}

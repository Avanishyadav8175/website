// icons
import { Plus } from "lucide-react";

// utils
import { getRedirectListItemValue } from "./utils/getRedirectListItemValue";

// hooks
import { useDeferredValue, useEffect, useState } from "react";

// components
import RedirectListItem from "./components/RedirectListItem";

// types
import { type RedirectListItem as RedirectListItemType } from "./types/type";

export default function RedirectList(
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
  const [items, setItems] = useState<RedirectListItemType[]>(
    defaultValue && defaultValue.length
      ? defaultValue.map((url) => getRedirectListItemValue({ url }))
      : value && value.length
        ? value.map((url) => getRedirectListItemValue({ url }))
        : [getRedirectListItemValue({ url: "" })]
  );
  const deferredItems = useDeferredValue(items);

  // variables
  const returnValue = deferredItems
    .map(({ url }) => url.trim())
    .filter((item) => item);

  // handlers
  const handleAddItem = () => {
    setItems([...items, getRedirectListItemValue({ url: "" })]);
  };

  const handleDeleteItem = (itemId: string) => {
    if (items.length === 1) {
      setItems([getRedirectListItemValue({ url: "" })]);
    } else {
      setItems([...items].filter(({ _id }) => _id !== itemId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setItems(defaultValue.map((url) => getRedirectListItemValue({ url })));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(returnValue) !== JSON.stringify(value)) {
        setItems(
          value.length
            ? value.map((content) => getRedirectListItemValue({ url: content }))
            : [getRedirectListItemValue({ url: "" })]
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if ("onChangeValue" in props) {
      if (JSON.stringify(value) !== JSON.stringify(returnValue)) {
        props.onChangeValue(returnValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredItems]);

  return (
    <section className="w-full">
      {label && <div className="text-xl font-light">{label}</div>}
      <section className="flex flex-col items-center justify-center gap-5 p-5">
        {items.map((item, i) => (
          <RedirectListItem
            key={i}
            index={i}
            url={item.url}
            label={itemLabel}
            onChangeUrl={(url) => {
              setItems(
                [...items].map((prevItem) =>
                  prevItem._id === item._id ? { ...prevItem, url } : prevItem
                )
              );
            }}
            onDeleteUrl={() => {
              handleDeleteItem(item._id as string);
            }}
          />
        ))}
      </section>
      <div
        onClick={handleAddItem}
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
    </section>
  );
}

// icons
import { Plus } from "lucide-react";

// utils
import { getInitialPersonalizedReviewValue } from "./utils/getInitialPersonalizedReviewValue";
import { getInitialPersonalizedReviewsValue } from "./utils/getInitialPersonalizedReviewsValue";

// hooks
import { useDeferredValue, useEffect, useState } from "react";

// components
import PersonalizedReview from "./components/PersonalizedReview";

// types
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";
import mongoose from "mongoose";

export default function PersonalizedReviews(
  props: {
    name: string;
    label?: string;
    itemLabel?: string;
    performReset?: boolean;
    defaultValue?: PersonalizedReviewDocument[];
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
          defaultValue?: PersonalizedReviewDocument[];
        }
      | {
          value: PersonalizedReviewDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: PersonalizedReviewDocument[]) => void;
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
  const [items, setItems] = useState<PersonalizedReviewDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : value && value.length
        ? value
        : getInitialPersonalizedReviewsValue()
  );
  const deferredItems = useDeferredValue(items);

  // variables
  const returnValue = deferredItems
    .map((personalizedReview) => {
      const validPersonalizedReview = { ...personalizedReview };

      if (
        !mongoose.Types.ObjectId.isValid(validPersonalizedReview._id as string)
      ) {
        delete validPersonalizedReview._id;
      }

      return validPersonalizedReview as PersonalizedReviewDocument;
    })
    .filter(({ review }) => review.trim());

  // handlers
  const handleAddItem = () => {
    setItems([...items, getInitialPersonalizedReviewValue()]);
  };

  const handleDeleteItem = (itemId: string) => {
    if (items.length === 1) {
      setItems(getInitialPersonalizedReviewsValue());
    } else {
      setItems([...items].filter(({ _id }) => _id !== itemId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setItems(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(returnValue) !== JSON.stringify(value)) {
        setItems(value.length ? value : getInitialPersonalizedReviewsValue());
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
    <>
      {label && <div className="text-xl font-light">{label}</div>}
      {items.map((item, i) => (
        <PersonalizedReview
          key={i}
          index={i}
          area={item.area}
          review={item.review}
          label={itemLabel}
          onChangeArea={(area) => {
            setItems(
              [...items].map((prevItem) =>
                prevItem._id === item._id
                  ? ({ ...prevItem, area } as PersonalizedReviewDocument)
                  : prevItem
              )
            );
          }}
          onChangeReview={(review) => {
            setItems(
              [...items].map((prevItem) =>
                prevItem._id === item._id
                  ? ({ ...prevItem, review } as PersonalizedReviewDocument)
                  : prevItem
              )
            );
          }}
          onDelete={() => {
            handleDeleteItem(item._id as string);
          }}
        />
      ))}
      <div
        onClick={handleAddItem}
        className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
      >
        <Plus
          strokeWidth={1.5}
          width={20}
          height={20}
        />
        <span>Add Another</span>
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

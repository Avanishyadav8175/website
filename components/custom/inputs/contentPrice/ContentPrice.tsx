// libraries
import mongoose from "mongoose";

// utils
import { getInitialContentPrice } from "./utils/getInitialContentPrice";
import { getInitialCityPrices } from "./utils/getInitialCityPrices";

// hooks
import { useEffect, useState } from "react";

// components
import BasePrice from "./components/BasePrice";
import CityPrices from "./components/CityPrices";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

export default function ContentPrice(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    withoutCity?: boolean;
    defaultValue?: ContentPriceDocument;
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
          defaultValue?: ContentPriceDocument;
        }
      | {
          value?: ContentPriceDocument;
          defaultValue?: undefined;
          onChangeValue: (newValue: ContentPriceDocument) => void;
        }
    )
) {
  // props
  const {
    name,
    label,
    isRequired,
    performReset,
    withoutCity,
    defaultValue,
    value
  } = props;

  // states
  const [contentPrice, setContentPrice] = useState<ContentPriceDocument>(
    defaultValue || value || getInitialContentPrice(withoutCity)
  );

  // variables
  const returnValue = (() => {
    const basePrice = contentPrice.base;
    const cityPrices =
      !withoutCity && contentPrice.cities && contentPrice.cities.length
        ? contentPrice.cities
            .filter(({ city, mrp, price }) => city && mrp && price)
            .map((cityPrice) => {
              const validCityPrice = { ...cityPrice };

              if (
                !mongoose.Types.ObjectId.isValid(validCityPrice._id as string)
              ) {
                delete validCityPrice._id;
              }

              return validCityPrice;
            })
        : [];

    return {
      base: basePrice,
      ...(cityPrices.length ? { cities: cityPrices } : {})
    } as ContentPriceDocument;
  })();

  // effects
  useEffect(() => {
    if (defaultValue) {
      setContentPrice(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(returnValue)) {
      setContentPrice(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value) {
      props.onChangeValue(returnValue as ContentPriceDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentPrice]);

  return (
    <section className="grid grid-cols-1 gap-3 w-full  py-3">
      {label && <div className="text-2xl text-center font-light">{label}</div>}
      <BasePrice
        basePrice={contentPrice.base}
        onChangeBasePrice={(newBasePrice) => {
          setContentPrice({
            ...contentPrice,
            base: newBasePrice
          } as ContentPriceDocument);
        }}
      />
      {!withoutCity && (
        <CityPrices
          cityPrices={
            contentPrice?.cities && contentPrice.cities.length
              ? contentPrice.cities
              : getInitialCityPrices()
          }
          onChangeCityPrices={(newCityPrices) => {
            setContentPrice({
              ...contentPrice,
              cities: newCityPrices
            } as ContentPriceDocument);
          }}
        />
      )}
      <input
        className="hidden"
        type="text"
        name={name}
        value={
          returnValue?.base?.mrp && returnValue?.base?.price
            ? JSON.stringify(returnValue)
            : ""
        }
        onChange={() => {}}
      />
    </section>
  );
}

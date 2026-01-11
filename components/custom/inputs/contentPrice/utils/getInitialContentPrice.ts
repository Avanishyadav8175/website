// utils
import { getInitialBasePrice } from "./getInitialBasePrice";
import { getInitialCityPrices } from "./getInitialCityPrices";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

export const getInitialContentPrice = (withoutCity?: boolean) =>
  ({
    base: getInitialBasePrice(),
    ...(withoutCity ? {} : { cities: getInitialCityPrices() })
  }) as ContentPriceDocument;

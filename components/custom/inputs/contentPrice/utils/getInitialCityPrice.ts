// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

export const getInitialCityPrice = () =>
  ({
    _id: uuid(),
    city: "",
    mrp: 0,
    price: 0
  }) as ContentCityPriceDocument;

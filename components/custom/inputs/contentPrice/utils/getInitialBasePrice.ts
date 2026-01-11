import { type ContentBasePriceDocument } from "@/common/types/documentation/nestedDocuments/contentBasePrice";

export const getInitialBasePrice = () =>
  ({
    mrp: 0,
    price: 0
  }) as ContentBasePriceDocument;

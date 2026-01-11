// types
import { type ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";

export const getInitialRatingValue = () =>
  ({
    maxValue: 5,
    value: NaN,
    count: NaN
  }) as ContentRatingDocument;

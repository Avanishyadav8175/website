// utils
import { getInitialRatingValue } from "./getInitialRatingValue";
import { getInitialReviewValue } from "./getInitialReviewValue";

// types
import { type ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";

export const getInitialQualityValue = () =>
  ({
    rating: getInitialRatingValue(),
    review: getInitialReviewValue()
  }) as ContentQualityDocument;

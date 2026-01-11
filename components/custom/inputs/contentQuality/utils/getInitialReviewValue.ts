// types
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";

export const getInitialReviewValue = () =>
  ({
    personalized: [] as string[],
    group: "",
    reviews: [] as string[],
    count: NaN
  }) as ContentReviewDocument;

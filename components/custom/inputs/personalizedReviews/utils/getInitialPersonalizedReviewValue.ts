// libraries
import { v4 as uuid } from "uuid";

// types
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";

export const getInitialPersonalizedReviewValue = () =>
  ({
    _id: uuid(),
    area: "",
    review: ""
  }) as PersonalizedReviewDocument;

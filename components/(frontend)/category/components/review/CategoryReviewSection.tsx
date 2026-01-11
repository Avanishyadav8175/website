// utils
import { memo } from "react";

// components
import CategoryReview from "./CategoryReview";

// types
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";

function CategoryReviewSection({
  categoryId,
  reviews
}: {
  categoryId: string;
  reviews?: PersonalizedReviewDocument[];
}) {
  if (reviews && reviews.length) {
    return (
      <CategoryReview
        categoryId={categoryId}
        reviews={reviews}
      />
    );
  }

  return <></>;
}

export default memo(CategoryReviewSection);

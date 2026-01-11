// types
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

export const getGroupReviews = ({
  review
}: {
  review: ContentReviewDocument;
}): string[] => {
  // ? random
  // if (review?.group) {
  //   const shuffled = [...(review.group as ReviewGroupDocument).reviews];

  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const randomIndex = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[randomIndex]] = [
  //       shuffled[randomIndex],
  //       shuffled[i]
  //     ];
  //   }

  //   return shuffled.slice(0, review.count);
  // }

  if (review?.group) {
    return (review.group as ReviewGroupDocument).reviews.slice(0, review.count);
  }

  return [];
};

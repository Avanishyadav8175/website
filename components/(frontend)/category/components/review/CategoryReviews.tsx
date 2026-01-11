// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// constants
import { cities } from "../../constants/city";

// utils
import { memo } from "react";
import { generateRandomCustomers } from "@/common/helpers/reviewsByCustomers/generateRandomCustomers";

// hooks
import { useCallback, useId, useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import CategoryReviewItem from "./CategoryReviewItem";

// types
import { type ContentReviewData } from "../../types/ContentReviewData";
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";

function CategoryReviews({
  categoryId,
  reviews
}: {
  categoryId: string;
  reviews: PersonalizedReviewDocument[];
}) {
  // hooks
  const id = useId();
  const { width } = useWindowSize();

  // utils
  const generateReviewData = useCallback((): ContentReviewData[] => {
    const reviewCustomerData = generateRandomCustomers({
      limit: reviews.length,
      serviceId: categoryId,
      cities
    });

    return reviewCustomerData.map((customerData, i) => ({
      ...customerData,
      review: reviews[i].review,
      ...(reviews[i].area ? { location: reviews[i].area } : {})
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // memoizes
  const reviewData = useMemo(generateReviewData, [generateReviewData]);

  // event handlers
  const handleReviewsScroll = useCallback(
    (dir: "left" | "right") => {
      const tray = document.getElementById(id) as HTMLElement;

      const currOffset = tray.scrollLeft;

      tray.scrollTo({
        left: currOffset + (dir === "left" ? -1 : 1) * (width * 0.65),
        behavior: "smooth"
      });
    },
    [id, width]
  );

  return (
    <div
      id={id}
      className={`flex relative items-stretch justify-start gap-3.5 sm:gap-6 overflow-x-scroll mb-[14px] text-[16px] scrollbar-hide p-[12px] px-0 max-sm:w-[calc(100dvw_-_24px)]  w-full max-1200:w-[calc(100dvw_-_28px)]`}
    >
      <div
        className="sticky top-1/2 aspect-square h-fit -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center border border-neutral-300 justify-center bg-white/80 p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-neutral-200 max-sm:mr-[-41px] z-50"
        onClick={() => {
          handleReviewsScroll("left");
        }}
      >
        <ChevronLeft />
      </div>
      {reviewData.map((review, i) => (
        <CategoryReviewItem
          key={i}
          review={review}
        />
      ))}
      <div
        className="sticky top-1/2 -translate-y-1/2 aspect-square h-fit right-0 rounded-full cursor-pointer flex items-center border border-neutral-300 justify-center bg-white/80 p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-neutral-100"
        onClick={() => {
          handleReviewsScroll("right");
        }}
      >
        <ChevronRight />
      </div>
    </div>
  );
}

export default memo(CategoryReviews);

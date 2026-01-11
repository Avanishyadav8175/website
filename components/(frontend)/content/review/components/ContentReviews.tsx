// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// constants
import { cities } from "../constants/city";

// utils
import { memo } from "react";
import { generateRandomCustomers } from "@/common/helpers/reviewsByCustomers/generateRandomCustomers";
import { getGroupReviews } from "../utils/getGroupReviews";

// hooks
import { useCallback, useId, useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import ContentReview from "./ContentReview";

// types
import { type ContentReviewData } from "../types/ContentReviewData";
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

function ContentReviews({
  contentId,
  review,
  imageCount
}: {
  contentId: string;
  review: ContentReviewDocument;
  imageCount: number;
}) {
  // hooks
  const id = useId();
  const { width } = useWindowSize();

  // utils
  const generateReviewData = useCallback((): ContentReviewData[] => {
    const reviewCount =
      (review?.personalized?.length || 0) +
      Math.min(
        (review?.group as ReviewGroupDocument)?.reviews?.length || 0,
        review?.count || 0
      );

    const reviewDetails = [
      ...(review?.personalized || []),
      ...getGroupReviews({ review })
    ];

    const reviewCustomerData = generateRandomCustomers({
      limit: reviewCount,
      serviceId: contentId,
      cities
    });

    return reviewCustomerData.map((customerData, i) => ({
      ...customerData,
      review: reviewDetails[i]
    }));
  }, [contentId, review]);

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
      className={
        imageCount
          ? "sm:border-l-[1.5px] sm:border-l-zinc-300"
          : ""
      }
    >
      <div
        id={id}
        className={`flex relative items-stretch justify-start gap-3.5 sm:gap-6 overflow-x-scroll mb-[14px] text-[16px] scrollbar-hide p-[12px] px-0 max-sm:w-[calc(100dvw_-_24px)]  ${imageCount ? `w-[867px] max-1200:w-[calc(75dvw_-_28px)]` : "w-full max-1200:w-[calc(100dvw_-_28px)]"}`}
      >
        <div
          className="sticky top-1/2 aspect-square h-fit -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center border border-neutral-300 justify-center bg-white/80 p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-neutral-200 max-sm:-mr-10 z-50"
          onClick={() => {
            handleReviewsScroll("left");
          }}
        >
          <ChevronLeft />
        </div>
        {reviewData.map((review, i) => (
          <ContentReview
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
    </div>
  );
}

export default memo(ContentReviews);

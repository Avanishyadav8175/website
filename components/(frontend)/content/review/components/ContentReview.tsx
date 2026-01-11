// icons
import { MapPin } from "lucide-react";

// utils
import { memo } from "react";

// components
import ContentReviewDetails from "./ContentReviewDetails";
import ContentReviewRating from "./ContentReviewRating";

// types
import { type ContentReviewData } from "../types/ContentReviewData";

function ContentReview({
  review: { customerName, location, totalRating, review }
}: {
  review: ContentReviewData;
}) {
  return (
    <div className="gap-4 sm:gap-[18px] max-[330px]:min-w-[calc(calc(100dvw_-_60px)_/_1.2)] max-[400px]:min-w-[calc(calc(100dvw_-_60px)_/_1.7)] max-sm:min-w-[calc(calc(100dvw_-_60px)_/_2)] max-[1000px]:min-w-[calc(calc(100dvw_-_60px)_/_3)] max-1200:min-w-[calc(calc(100dvw_-_60px)_/_4)] min-[1200px]:min-w-[320px] max-sm:-translate-x-1">
      {/* <span className="flex items-start justify-center">
        <div className="aspect-square rounded-full w-full text-charcoal-2 bg-ivory-3 shadow-md font-medium flex items-center justify-center text-center">
          {customerName[0].toUpperCase()}
        </div>
      </span> */}
      <div className="relative flex flex-col justify-start gap-[2px] bg-ivory-1 border-ivory-3 border p-3 shadow-sm pb-4 px-5 rounded-2xl mt-1">
        <span className="font-medium text-[18px] line-clamp-1">
          {customerName}
        </span>
        <ContentReviewRating rating={totalRating} />
        <ContentReviewDetails details={review} />
        <span className="flex items-center justify-start gap-[6px] mt-2 text-zinc-600 text-[14px]">
          <MapPin
            width={15}
            height={15}
          />
          <span>{` ${location}`}</span>
        </span>
      </div>
    </div>
  );
}

export default memo(ContentReview);

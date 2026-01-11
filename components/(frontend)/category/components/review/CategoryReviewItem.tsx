// icons
import { MapPin } from "lucide-react";

// utils
import { memo } from "react";

// components
import CategoryReviewItemDetails from "./CategoryReviewItemDetails";
import CategoryReviewItemRating from "./CategoryReviewItemRating";

// types
import { type ContentReviewData } from "../../types/ContentReviewData";

function CategoryReviewItem({
  review: { customerName, location, totalRating, review }
}: {
  review: ContentReviewData;
}) {
  return (
    <div className="grid grid-cols-[36px_auto] gap-4 sm:gap-[18px] max-[330px]:min-w-[calc(calc(100dvw_-_60px)_/_1.2)] max-[400px]:min-w-[calc(calc(100dvw_-_60px)_/_1.3)] max-sm:min-w-[calc(calc(100dvw_+_120px)_/_2)] max-[1000px]:min-w-[calc(calc(100dvw_-_60px)_/_3)] max-1200:min-w-[calc(calc(100dvw_-_60px)_/_4)] min-[1200px]:min-w-[320px] max-sm:-translate-x-1">
      <span className="flex items-start justify-center">
        <div className="aspect-square rounded-full w-full text-charcoal-2 bg-transparent shadow-md font-medium flex items-center justify-center text-center">
          {customerName[0].toUpperCase()}
        </div>
      </span>
      <div className="relative flex flex-col justify-start gap-[2px] bg-ivory-1 shadow-md p-3 pb-4 px-5 rounded-2xl mt-1">
        <div
          className="bg-ivory-1 absolute top-0 -left-2 h-6 w-10 "
          style={{
            clipPath: "polygon(0 0, 40% 100%, 100% 0)"
          }}
        />
        <span className="font-medium text-[18px] line-clamp-1">
          {customerName}
        </span>
        <CategoryReviewItemRating rating={totalRating} />
        <CategoryReviewItemDetails details={review} />
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

export default memo(CategoryReviewItem);

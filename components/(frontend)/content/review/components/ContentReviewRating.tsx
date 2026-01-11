// icons
import { Star, StarHalf } from "lucide-react";

// utils
import { memo } from "react";

function ContentReviewRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center justify-start gap-[8px] mb-1">
      <span className="text-[14px] text-sienna-1 font-semibold flex items-center justify-center translate-y-[1px]">
        {rating % 1 === 0.5 ? rating : `${rating}.0`}
      </span>
      <div className="grid *:row-start-1 *:col-start-1">
        <span className="flex items-center gap-[2px] justify-start">
          {Array.from({
            length: 5
          }).map((_, index) => (
            <Star
              key={index}
              fill="#ccc"
              stroke="#ccc"
              width={16}
              height={16}
            />
          ))}
        </span>
        <span className="flex items-center gap-[2px] justify-start">
          {Array.from({
            length: Math.floor(rating)
          }).map((_, index) => (
            <Star
              fill="#e0aa3e"
              stroke="#e0aa3e"
              width={16}
              height={16}
              key={index}
            />
          ))}
          {rating % 1 === 0.5 && (
            <StarHalf
              fill="#e0aa3e"
              stroke="#e0aa3e"
              width={16}
              height={16}
            />
          )}
        </span>
      </div>
    </span>
  );
}

export default memo(ContentReviewRating);

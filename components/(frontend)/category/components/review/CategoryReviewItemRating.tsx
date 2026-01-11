// icons
import { Star } from "lucide-react";

// utils
import { memo } from "react";

function CategoryReviewItemRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center justify-start gap-[8px] mb-1">
      <Star
        fill="#e0aa3e"
        stroke="#e0aa3e"
        width={16}
        height={16}
      />
      <span className="text-[14px] text-sienna-1 font-semibold flex items-center justify-center translate-y-[1px]">
        {rating % 1 === 0.5 ? rating : `${rating}.0`}
      </span>
    </span>
  );
}

export default memo(CategoryReviewItemRating);

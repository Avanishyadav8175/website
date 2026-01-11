// icons
import { Star } from "lucide-react";

// utils
import { memo } from "react";

function CategoryTitle({
  title,
  rating,
  ratingCount,
  extraPadding,
  count
}: {
  title: string;
  rating: number;
  ratingCount: number;
  extraPadding?: boolean;
  count?: number;
}) {
  return (
    <div
      className={`flex flex-col items-start max-sm:pb-1 sm:items-center justify-center gap-y-1.5 sm:gap-y-1 px-3.5 sm:px-3 sm:pl-0 1200:pr-0 ${extraPadding ? "pt-4 sm:pt-5" : "pt-3 sm:pt-2"} `}
    >
      <h1
        className={`font-medium text-charcoal tracking-tight text-[23px] sm:text-[26px]`}
      >
        {title}
      </h1>
      <div className="flex items-center justify-start gap-1 sm:justify-end max-sm:py-2 sm:text-sm text-charcoal/60 font-medium">
        <Star
          strokeWidth={1.5}
          width={17}
          height={17}
          className="text-amber-500 fill-amber-500"
        />
        <span>{rating}</span>
        <span>({ratingCount} reviews{count && `, ${count} products`})</span>
      </div>
    </div>
  );
}

export default memo(CategoryTitle);

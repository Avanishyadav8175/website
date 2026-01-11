// icons
import { StarIcon } from "lucide-react";

// utils
import { memo } from "react";

function CategoryContentRating({
  ratingValue,
  ratingCount
}: {
  ratingValue?: number;
  ratingCount?: number;
}) {
  if (!ratingValue) {
    return <></>;
  }

  return (
    <span className="absolute bottom-0 right-0">
      <div className="flex items-center justify-start gap-1 text-sm sm:text-sm text-charcoal-3/80 px-1 pr-1.5 py-1 bg-white bg-opacity-80 rounded-tl-xl">
        <StarIcon
          width={18}
          height={18}
          className="fill-sienna-1 stroke-transparent brightness-105 max-sm:scale-90"
        />
        {`${ratingValue.toFixed(1)}${ratingCount ? ` (${ratingCount})` : ""}`}
      </div>
    </span>
  );
}

export default memo(CategoryContentRating);

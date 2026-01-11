// icons
import { Star } from "lucide-react";

// utils
import { getRatingValue } from "../../utils/getRatingValue";

// components
import ContentHorizontalSpacing from "../../spacing/ContentHorizontalSpacing";

// types
import { type ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";

export default function ContentDetailRating({
  rating: { value, count }
}: {
  rating: ContentRatingDocument;
}) {
  return (
    <ContentHorizontalSpacing className="sm:mt-4">
      <div className="flex items-center justify-start text-charcoal-3/95 max-sm:my-3.5 max-sm:text-sm font-medium *:gap-1">
        <div className="flex items-center justify-start text-charcoal-3">
          <Star
            width={18}
            fill="#e0aa3e"
            stroke="#fff0"
            className="sm:-translate-y-[1px] sm:-translate-x-[2px] "
          />
          <Star
            width={18}
            fill="#e0aa3e"
            stroke="#fff0"
            className="sm:-translate-y-[1px] sm:-translate-x-[2px] -ml-1"
          />
          <Star
            width={18}
            fill="#e0aa3e"
            stroke="#fff0"
            className="sm:-translate-y-[1px] sm:-translate-x-[2px] -ml-1"
          />
          <Star
            width={18}
            fill="#e0aa3e"
            stroke="#fff0"
            className="sm:-translate-y-[1px] sm:-translate-x-[2px] -ml-1"
          />
          <Star
            width={18}
            fill="#e0aa3e"
            stroke="#fff0"
            className="sm:-translate-y-[1px] sm:-translate-x-[2px] -ml-1"
          />
          <span className="ml-1 font-medium text-[#d49d2f]">{getRatingValue(value)} rating</span>
        </div>
        {count && (
          <div className="flex items-center justify-start py-1 pl-2.5 ml-2.5 border-l border-charcoal-3/15 text-charcoal-3/60">
            <span>{`${count} reviews`}</span>
          </div>
        )}
      </div>
    </ContentHorizontalSpacing>
  );
}

import { Star } from "lucide-react";

export default function FrontendCategoryListTitle({
  title,
  totalRating,
  totalReviews,
  extraPadding,
  onlyTitle,
  useH1
}: {
  title: string;
  totalRating: number | string;
  totalReviews: number;
  extraPadding?: boolean;
  onlyTitle?: boolean;
  useH1?: boolean;
}) {
  return (
    <div
      className={`flex max-sm:flex-col items-start max-sm:pb-1 sm:items-center justify-center sm:justify-between gap-y-1.5 sm:gap-y-1 px-3.5 sm:px-3 sm:pl-0 1200:pr-0 ${extraPadding ? "pt-4 sm:pt-5" : "pt-3 sm:pt-2"} `}
    >
      {useH1 ? (
        <h1
          className={`font-medium text-charcoal tracking-tight text-[23px] sm:text-[26px]`}
        >
          {title}
        </h1>
      ) : (
        <h2
          className={`font-medium text-charcoal tracking-tight text-[23px] sm:text-[26px]`}
        >
          {title}
        </h2>
      )}
      {onlyTitle ? (
        <></>
      ) : (
        <div className="flex items-center justify-start gap-1 sm:justify-end max-sm:py-2 sm:text-sm text-charcoal/60 font-semibold">
          <Star
            strokeWidth={1.5}
            width={17}
            height={17}
            stroke="#e0aa3e"
            fill="#e0aa3e"
          />
          <span>{totalRating}</span>
          <span className="px-1">|</span>
          <span>{totalReviews} reviews</span>
        </div>
      )}
    </div>
  );
}

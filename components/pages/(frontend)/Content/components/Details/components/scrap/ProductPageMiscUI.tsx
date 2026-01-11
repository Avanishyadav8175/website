import {
  BadgePercent,
  CalendarCheck,
  Handshake,
  Smile,
  StarIcon
} from "lucide-react";
import { alwaysDecimal } from "../../helpers/alwaysDecimal";

export const ReviewRatings = ({
  review,
  rating
}: {
  review: number;
  rating: number;
}) => (
  <div className="flex items-center justify-start text-charcoal-3/95 max-sm:mt-3.5 max-sm:mb-1.5 max-sm:text-sm font-medium *:gap-1">
    <div className="flex items-center justify-start text-charcoal-3">
      <StarIcon
        width={18}
        fill="#e0aa3e"
        stroke="#fff0"
        className="sm:-translate-y-[1px] sm:-translate-x-[2px]"
      />
      <span>{alwaysDecimal(rating)}</span>
    </div>
    {review > 0 ? (
      <div className="flex items-center justify-start py-1 pl-2.5 ml-2.5 border-l border-charcoal-3/15 text-charcoal-3/70">
        <span className="">{review} reviews</span>
      </div>
    ) : (
      <></>
    )}
  </div>
);

export const ProductTrustedInfo = () => {
  return (
    <div className="bg-sienna-3/15 grid grid-cols-3 grid-rows-[auto_auto] gap-2 p-5 sm:max-w-[calc(470px_+_24px)] rounded-xl text-charcoal-3 items-start justify-center text-center text-sm my-4 *:cursor-default">
      <div className="flex items-center justify-center">
        <Handshake
          strokeWidth="1.5"
          width={28}
          height={28}
        />
      </div>
      <div className="flex items-center justify-center">
        <CalendarCheck
          strokeWidth="1.5"
          width={28}
          height={28}
        />
      </div>
      <div className="flex items-center justify-center">
        <Smile
          strokeWidth="1.5"
          width={28}
          height={28}
        />
      </div>
      <span className="text-[13px] sm:text-sm">
        100% Secure <br /> Payments
      </span>
      <span className="text-[13px] sm:text-sm">
        Same Day <br /> Delivery
      </span>
      <span className="text-[13px] sm:text-sm">1M+ Satisfied Customers</span>
    </div>
  );
};

export const CardTitle = ({
  str,
  color,
  showOffer
}: {
  str: string;
  color?: string;
  showOffer?: boolean;
}) => (
  <span className="text-charcoal-3/80 text-base font-medium mb-5 relative flex items-center justify-start gap-0.5">
    {showOffer ? (
      <BadgePercent
        fill="#22c55e"
        stroke="#fff"
        strokeWidth={1.5}
        className="-translate-x-1"
      />
    ) : (
      <></>
    )}
    {str}
    <span
      className={`absolute -bottom-1.5 left-0 ${color || "bg-sienna"} h-[2px] w-20`}
    />
  </span>
);

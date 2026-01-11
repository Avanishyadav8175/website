// icons
import { Heart } from "lucide-react";

export default function MadeWithLoveInIndia({
  hide,
  withoutBorder
}: {
  hide?: boolean;
  withoutBorder?: boolean;
}) {
  return (
    <div
      className={`${hide ? "max-sm:hidden" : ""} flex items-center justify-center gap-6 text-sm mb-6 sm:mb-3 text-charcoal-3/80`}
    >
      {withoutBorder ? (
        <></>
      ) : (
        <div className="grid grid-cols grid-rows-2 w-5 sm:w-20 ">
          <div className="border-b border-charcoal-3/20"></div>
          <span></span>
        </div>
      )}
      <div className="flex items-center justify-center gap-2">
        <span>Made with</span>
        <span>
          <Heart
            strokeWidth={1.5}
            stroke="#b76e7900"
            fill="#b76e79"
          />
        </span>
        <span>in India</span>
      </div>
      {withoutBorder ? (
        <></>
      ) : (
        <div className="grid grid-cols grid-rows-2 w-5 sm:w-20 ">
          <div className="border-b border-charcoal-3/20"></div>
          <span></span>
        </div>
      )}
    </div>
  );
}

import { NoGiftSVG } from "@/common/svgs/svg";
import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="w-full h-[85dvh] bg-ivory-1 grid *:row-start-1 *:col-start-1">
      <div className=""></div>
      <div className="flex flex-col items-center justify-center gap-2 *text-center">
        <NoGiftSVG
          dimensions={90}
          fill="#777"
          className="sm:scale-125 -translate-y-3 sm:-translate-y-7 -translate-x-1"
        />
        <span className="text-3xl font-medium">Not Found</span>
        <span className="text-red-500 font-medium">404 ERROR</span>
        <span className="text-charcoal-3/90">
          The Gift you were looking for is not present
        </span>

        <Link
          href={"/"}
          className="cursor-pointer px-4 py-1.5 mt-6 bg-sienna/70 text-white rounded-full text-charcoal-3/60 transition-all duration-300 hover:bg-sienna"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

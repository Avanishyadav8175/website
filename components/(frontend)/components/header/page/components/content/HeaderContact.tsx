// icons
import { Grip } from "lucide-react";

// utils
import { lazy, memo } from "react";

// components
const LazyHeaderContactContent = lazy(() => import("./HeaderContactContent"));
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Suspense } from "react";

function HeaderContact() {
  return (
    <div className="max-sm:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`max-sm:hidden relative sm:min-w-[52px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 sm:px-1 transition-colors duration-300 cursor-pointer hover:text-sienna`}
          >
            <Grip
              strokeWidth={1}
              width={24}
              height={24}
            />
            <span>{"More"}</span>
          </button>
        </PopoverTrigger>
        <Suspense fallback={<></>}>
          <LazyHeaderContactContent />
        </Suspense>
      </Popover>
    </div>
  );
}

export default memo(HeaderContact);

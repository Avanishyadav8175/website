// icons
import { CircleHelp } from "lucide-react";

// utils
import { lazy, memo } from "react";

// components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const LazyContentDetailServingInfoDialogContent = lazy(
  () => import("./ContentDetailServingInfoDialogContent")
);
import { Suspense } from "react";

// types
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

function ContentDetailServingInfoDialog({
  serves,
  unit
}: {
  serves: UnitServeDocument[];
  unit: UnitDocument;
}) {
  return (
    <div className="absolute right-4 top-5">
      <Dialog>
        <DialogTrigger asChild>
          <button className="group flex items-center justify-end gap-x-1 text-charcoal-3 text-sm cursor-pointer">
            <CircleHelp
              strokeWidth={1.5}
              width={20}
              height={20}
              className="fill-ash-3 stroke-white transition-all duration-300 group-hover:fill-charcoal-3"
            />
            <div className="group-hover:underline group-hover:underline-offset-4">
              Serving Info
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-ivory-1 outline-none border-none z-[996] rounded-2xl w-[300px] sm:w-[350px] px-5 py-0 grid grid-cols-2 items-center justify-start">
          <Suspense fallback={<></>}>
            <LazyContentDetailServingInfoDialogContent
              serves={serves}
              unit={unit}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(ContentDetailServingInfoDialog);

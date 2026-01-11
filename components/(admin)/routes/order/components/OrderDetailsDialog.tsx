// icons
import { Eye } from "lucide-react";

// utils
import { lazy } from "react";

// components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const LazyOrderDetails = lazy(() => import("./OrderDetails"));
import { Suspense } from "react";

export default function OrderDetailsDialog({
  orderId,
  itemId
}: {
  orderId: string;
  itemId: string;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Eye
            className="cursor-pointer"
            strokeWidth={1.5}
            width={16}
            height={16}
          />
        </DialogTrigger>
        <DialogContent className="p-4 pb-0 sm:py-5 sm:px-8 outline-none border-none bg-ivory-1 rounded-none sm:rounded-2xl grid grid-cols-1 sm:grid-cols-[4fr_1.5fr] max-sm:w-device max-sm:h-device sm:min-w-[calc(85dvw_+_60px)] max-sm:gap-y-8 sm:gap-x-12 sm:h-[95dvh] max-sm:overflow-auto">
          <Suspense fallback={<></>}>
            <LazyOrderDetails
              orderId={orderId}
              itemId={itemId}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}

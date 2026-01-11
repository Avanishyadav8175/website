// icons
import { Truck } from "lucide-react";

// utils
import { lazy } from "react";

// hooks
import { useSelector } from "@/store/withType";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";

// components
const ContentDeliveryInfoForm = lazy(() => import("./ContentDeliveryInfoForm"));
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from "react";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export default function ContentDeliveryInfoFormDialog({
  initialDocumentId,
  onUpdate
}: {
  initialDocumentId: string;
  onUpdate: (updatedDocument: Partial<ContentDocument>) => void;
}) {
  // redux
  const initialDocument = useSelector((state) =>
    selectContent.document(state, initialDocumentId)
  );

  if (initialDocument) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            title="Price and Timeslots"
            className="cursor-pointer"
          >
            <Truck
              className={`text-black`}
              strokeWidth={1.5}
              width={20}
              height={20}
            />
          </div>
        </DialogTrigger>
        <DialogContent
          className={`min-w-[80dvw] rounded-2xl max-sm:px-5 sm:max-h-[90dvh] overflow-auto scrollbar-hide pt-0 pb-0`}
        >
          <Suspense fallback={<></>}>
            <ContentDeliveryInfoForm
              initialDocument={initialDocument}
              onUpdate={onUpdate}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div
      title="Price and Timeslots"
      className="cursor-pointer"
    >
      <Truck
        className={`text-black`}
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    </div>
  );
}

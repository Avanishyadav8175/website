// icons
import { Monitor } from "lucide-react";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";

// hooks
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

const LazyContentVisualInfoForm = lazy(() => import("./ContentVisualInfoForm"));

export default function ContentVisualInfoFormDialog({
  initialDocumentId,
  onUpdate
}: {
  initialDocumentId: string;
  onUpdate: (updatedDocument: Partial<ContentDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const initialDocument = useSelector((state) =>
    selectContent.document(state, initialDocumentId)
  );

  // side effect
  useEffect(() => {
    if (initialDocumentId && !initialDocument) {
      dispatch(
        createContentAction.fetchOrSelectDocument({
          documentId: initialDocumentId
        })
      );
    }
  }, [initialDocumentId, initialDocument, dispatch]);

  if (initialDocument) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            title="Visual Info"
            className="cursor-pointer"
          >
            <Monitor
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
            <LazyContentVisualInfoForm
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
      title="Visual Info"
      className="cursor-pointer"
    >
      <Monitor
        className={`text-black`}
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    </div>
  );
}

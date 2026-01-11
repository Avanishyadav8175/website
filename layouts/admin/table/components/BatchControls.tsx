// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// hooks
import { useState } from "react";

// components
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// icons
import {
  Power,
  PowerOff,
  Recycle,
  SquareMousePointer,
  Trash2,
  X
} from "lucide-react";

export default function BatchControls({
  showBatchControls,
  activeInactive,
  drop,
  restore,
  delete: deleteAction,
  toggleShowBatchControls
}: {
  showBatchControls: boolean;
  activeInactive?: {
    isActive: boolean;
    onToggleActiveInactive: () => void;
  };
  drop?: {
    showDrop: boolean;
    onClickDrop: () => void;
    dropConfirmationDialogTitle?: string;
    dropConfirmationDialogMessage?: string;
  };
  restore?: {
    showRestore: boolean;
    onClickRestore: () => void;
  };
  delete?: {
    showDelete?: boolean;
    onClickDelete: () => void;
    deleteConfirmationDialogTitle?: string;
    deleteConfirmationDialogMessage?: string;
  };
  toggleShowBatchControls: () => void;
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  if (showBatchControls) {
    return (
      <section className="flex items-center justify-end gap-1.5 sm:gap-2 *:cursor-pointer *:aspect-square *:p-2.5 *:rounded-full *:transition-all *:duration-300">
        {activeInactive && (
          <div
            className={`transition-all duration-300 ${activeInactive?.isActive ? "hover:text-emerald-700" : "hover:text-neutral-700"}`}
            onClick={activeInactive?.onToggleActiveInactive}
          >
            {activeInactive?.isActive ? (
              <Power
                strokeWidth={1.8}
                width={22}
                height={22}
              />
            ) : (
              <PowerOff
                strokeWidth={1.8}
                width={22}
                height={22}
              />
            )}
          </div>
        )}
        {restore?.showRestore && (
          <div
            className="transition-all duration-300 hover:text-emerald-600"
            onClick={restore.onClickRestore}
            title="Restore Selection"
          >
            <Recycle
              strokeWidth={1.8}
              width={22}
              height={22}
            />
          </div>
        )}
        {((drop && drop.showDrop) ||
          (deleteAction && deleteAction.showDelete)) && (
          <>
            <div
              className="transition-all duration-300 hover:text-rose-600"
              onClick={() => setShowDialog(true)}
            >
              {drop?.showDrop && (
                <Trash2
                  strokeWidth={1.8}
                  width={22}
                  height={22}
                />
              )}
              {deleteAction?.showDelete && (
                <X
                  strokeWidth={1.8}
                  width={22}
                  height={22}
                />
              )}
            </div>
            <Dialog
              open={showDialog}
              onOpenChange={setShowDialog}
            >
              <DialogContent className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto_auto] rounded-2xl gap-y-1 gap-x-2.5 text-neutral-900 max-w-[92dvw] sm:max-w-[350px]">
                <DialogTitle className="col-span-3 text-2xl font-normal mb-2">
                  <span>
                    {(drop
                      ? drop.dropConfirmationDialogTitle
                      : deleteAction
                        ? deleteAction.deleteConfirmationDialogTitle
                        : "") || "Confirm?"}
                  </span>
                </DialogTitle>
                <span className="col-span-3 mb-6">
                  {drop && drop.showDrop
                    ? drop.dropConfirmationDialogMessage ||
                      "Selected data will be dropped to bin"
                    : deleteAction && deleteAction.showDelete
                      ? deleteAction.deleteConfirmationDialogMessage ||
                        "Selected data will be permanently deleted"
                      : ""}
                </span>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <div
                    className={`px-6 ${BUTTON_STYLES.GHOST}`}
                    onClick={() => setShowDialog(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${BUTTON_STYLES.DESTRUCTIVE}`}
                    onClick={() => {
                      if (drop && drop.showDrop) {
                        drop.onClickDrop();
                      } else {
                        if (deleteAction) {
                          deleteAction.onClickDelete();
                        }
                      }
                      setShowDialog(false);
                    }}
                  >
                    Confirm
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
        <div
          className={`transition-all duration-300 bg-blue-100 text-blue-700`}
          onClick={toggleShowBatchControls}
          title="Batch Operations"
        >
          <SquareMousePointer
            strokeWidth={1.8}
            width={22}
            height={22}
          />
        </div>
      </section>
    );
  }

  return <></>;
}

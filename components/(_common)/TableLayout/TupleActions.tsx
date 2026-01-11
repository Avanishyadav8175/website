// hooks
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// components
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

// icons
import {
  ArchiveRestore,
  ExternalLink,
  Eye,
  PencilLine,
  Power,
  PowerOff,
  RotateCcw,
  Trash2,
  X
} from "lucide-react";

// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

export default function TupleActions(
  props: (
    | {
        showActiveInactive?: undefined;
      }
    | {
        showActiveInactive?: boolean;
        canActive?: boolean;
        isActive: boolean;
        onToggleActiveInactive: () => void;
      }
  ) &
    (
      | {
          showRevalidateCache?: undefined;
        }
      | {
          showRevalidateCache?: boolean;
          onClickRevalidateCache: () => void;
        }
    ) &
    (
      | {
          showExternalLink?: undefined;
        }
      | {
          showExternalLink?: boolean;
          linkHref: string;
        }
    ) &
    (
      | {
          showView?: undefined;
        }
      | {
          showView?: boolean;
          onClickView: () => void;
        }
    ) &
    (
      | {
          showEdit?: undefined;
        }
      | {
          showEdit?: boolean;
          onClickEdit: () => void;
        }
    ) &
    (
      | {
          showRestore?: undefined;
        }
      | {
          showRestore?: boolean;
          onClickRestore: () => void;
        }
    ) &
    (
      | {
          showDrop?: undefined;
        }
      | {
          showDrop?: boolean;
          onClickDrop: () => void;
          dropConfirmationDialogTitle?: string;
          dropConfirmationDialogMessage?: string;
        }
    ) &
    (
      | {
          showDelete?: undefined;
        }
      | {
          showDelete?: boolean;
          onClickDelete: () => void;
          deleteConfirmationDialogTitle?: string;
          deleteConfirmationDialogMessage?: string;
        }
    )
) {
  // props
  const {
    showActiveInactive,
    showRevalidateCache,
    showExternalLink,
    showView,
    showEdit,
    showRestore,
    showDrop,
    showDelete
  } = props;

  // hooks
  const { toast } = useToast();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center gap-3 *:px-1 *:cursor-pointer">
      {showActiveInactive && (
        <div
          className={`transition-all duration-300 ${props.isActive ? "hover:text-emerald-700" : "hover:text-neutral-700"}`}
          onClick={
            props.canActive === undefined || props.canActive
              ? props.onToggleActiveInactive
              : () => {
                  toast({
                    title: "WARNING",
                    description: "Partially filled data can't be activated!",
                    variant: "warning"
                  });
                }
          }
        >
          {props.isActive ? (
            <Power
              strokeWidth={1.5}
              width={18}
              className="text-green-700"
            />
          ) : (
            <PowerOff
              strokeWidth={1.5}
              width={18}
              className="text-red-600"
            />
          )}
        </div>
      )}
      {showView && (
        <div
          title="View"
          className="transition-all duration-300 hover:text-emerald-600"
          onClick={props.onClickView}
        >
          <Eye
            strokeWidth={1.5}
            width={18}
          />
        </div>
      )}
      {showEdit && (
        <div
          title="Edit"
          className="transition-all duration-300 hover:text-blue-600"
          onClick={props.onClickEdit}
        >
          <PencilLine
            strokeWidth={1.5}
            width={18}
          />
        </div>
      )}
      {showRestore && (
        <div
          title="Restore"
          className="transition-all duration-300 hover:text-emerald-600"
          onClick={props.onClickRestore}
        >
          <ArchiveRestore
            strokeWidth={1.5}
            width={18}
          />
        </div>
      )}
      {(showDrop || showDelete) && (
        <>
          <div
            className="transition-all duration-300 hover:text-rose-600"
            onClick={() => setShowDialog(true)}
          >
            {showDrop && (
              <Trash2
                strokeWidth={1.5}
                width={18}
              />
            )}
            {showDelete && (
              <X
                strokeWidth={1.5}
                width={18}
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
                  {(showDrop
                    ? props.dropConfirmationDialogTitle
                    : showDelete
                      ? props.deleteConfirmationDialogTitle
                      : "") || "Confirm?"}
                </span>
              </DialogTitle>
              <span className="col-span-3 mb-6">
                {showDrop
                  ? props.dropConfirmationDialogMessage ||
                    "This will be moved to Recycle Bin"
                  : showDelete
                    ? props.deleteConfirmationDialogMessage ||
                      "This will be permanently deleted"
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
                    if (showDrop) {
                      props.onClickDrop();
                    }
                    if (showDelete) {
                      props.onClickDelete();
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
      {!showDelete && showExternalLink && (
        <Link
          title="Link"
          href={props.linkHref || "#"}
          target="_blank"
          className="transition-all duration-300 hover:text-purple-600"
        >
          <ExternalLink
            strokeWidth={1.5}
            width={18}
          />
        </Link>
      )}
      
      {showRevalidateCache && (
        <div
          title="Refresh"
          className={`transition-all duration-300 hover:text-blue-700 opacity-60 hover:opacity-100`}
          onClick={props.onClickRevalidateCache}
        >
          <RotateCcw
            strokeWidth={1.5}
            width={18}
          />
        </div>
      )}
    </div>
  );
}

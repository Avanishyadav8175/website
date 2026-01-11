// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

// types
import { type ReactNode } from "react";

export default function ConfirmDestructiveAction(
  props: {
    onConfirm: () => void;
  } & (
    | {
        mode: "trash" | "delete";
        itemName?: string;
      }
    | {
        mode: "custom";
        title: string;
        description: string;
      }
  ) &
    (
      | {
          trigger: ReactNode;
        }
      | {
          showDialog: boolean;
          onChangeShowDialog: (showDialog: boolean) => void;
        }
    )
) {
  const { mode, onConfirm } = props;

  const modeValues = {
    trash: {
      title: "Confirm Trash?",
      description: `This action would trash this ${"itemName" in props ? props.itemName : "item"}.`
    },
    delete: {
      title: "Confirm Delete?",
      description: `This action would delete this ${"itemName" in props ? props.itemName : "item"}.`
    }
  };

  const content =
    mode === "custom"
      ? { title: props.title, description: props.description }
      : modeValues[mode];

  return (
    <Dialog
      open={"showDialog" in props ? props.showDialog : undefined}
      onOpenChange={
        "onChangeShowDialog" in props ? props.onChangeShowDialog : undefined
      }
    >
      {"trigger" in props && <DialogTrigger>{props.trigger}</DialogTrigger>}
      <DialogContent className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto_auto] rounded-2xl gap-y-1 gap-x-2.5 text-neutral-900 max-w-[92dvw] sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <span className="col-span-3 text-2xl font-light mt-2 mb-0.5">
          {content.title}
        </span>
        <span className="col-span-3 mb-6">{content.description}</span>
        <span />
        <DialogClose>
          <div className={`px-6 ${BUTTON_STYLES.GHOST}`}>Cancel</div>
        </DialogClose>
        <DialogClose>
          <div
            className={`${BUTTON_STYLES.DESTRUCTIVE} w-fit`}
            onClick={onConfirm}
          >
            Confirm
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

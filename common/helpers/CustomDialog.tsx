import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Children, ClassNameType, SetStateType } from "../types/reactTypes";

export default function CustomDialog({
  children,
  title,
  open,
  dialogClassName,
  onOpenChange
}: {
  children: Children;
  title?: string;
  open: boolean;
  dialogClassName?: ClassNameType;
  onOpenChange: SetStateType<boolean>;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className={`max-sm:max-w-[92dvw] rounded-2xl max-sm:px-5 ${dialogClassName || ""}`}
      >
        {title && (
          <div className="text-2xl mb-1 font-light mt-2 sm:my-1">{title}</div>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

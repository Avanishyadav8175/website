// components
import { Dialog, DialogContent } from "@/components/ui/dialog";

// types
import { type Children } from "@/common/types/reactTypes";

export default function ImageManagementWrapper({
  children,
  asPopup,
  open,
  setOpen
}: {
  children: Children;
  asPopup?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return asPopup ? (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="outline-none min-w-fit p-0 border-none bg-ivory-1 max-h-[95dvh] max-1200:max-w-[90dvw] max-w-1200 rounded-3xl overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  ) : (
    <>{children}</>
  );
}

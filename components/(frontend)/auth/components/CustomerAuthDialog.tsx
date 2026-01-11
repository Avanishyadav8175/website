// utils
import { memo } from "react";

// components
import CustomerAuthUI from "./CustomerAuthUI";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

function CustomerAuthDialog({
  showDialog,
  onChangeShowDialog
}: {
  showDialog: boolean;
  onChangeShowDialog: (showDialog: boolean) => void;
}) {
  return (
    <Sheet
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <SheetContent className="!z-[995] overflow-hidden gap-0 min-w-fit w-device sm:w-[500px] flex flex-col justify-start outline-none border-none p-0 pb-6">
        <SheetHeader className="hidden">
          <SheetTitle className="hidden" />
        </SheetHeader>
        <CustomerAuthUI />
      </SheetContent>
    </Sheet>
  );
}

export default memo(CustomerAuthDialog);

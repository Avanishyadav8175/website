// components
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDeliveryAddressContent from "./CartCheckoutDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function CartCheckoutDialog({
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
      <SheetContent className="outline-none z-[500] border-none p-0 bg-ivory-1 min-w-fit max-sm:w-device max-sm:h-device max-sm:bg-ivory-1 overflow-x-hidden">
        <CartDeliveryAddressContent
          onClose={() => {
            onChangeShowDialog(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

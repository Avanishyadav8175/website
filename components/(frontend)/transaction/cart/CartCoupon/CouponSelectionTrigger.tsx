import { Children, SetStateType } from "@/common/types/reactTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function CouponSelectionTrigger({
  children,
  open,
  setOpenPopup,
  couponListComponent
}: {
  children: Children;
  open: boolean;
  setOpenPopup: SetStateType<boolean>;
  couponListComponent: JSX.Element;
}) {
  return (
    <>
      <div
        onClick={() => setOpenPopup((prev) => true)}
        className="max-sm:hidden"
      >
        {children}
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <div className="sm:hidden">{children}</div>
        </DrawerTrigger>
        <DrawerContent className="z-[996] bg-transparent outline-none border-none max-h-[95dvh] h-fit rounded-none">
          {couponListComponent}
        </DrawerContent>
      </Drawer>

      <Dialog
        open={open}
        onOpenChange={setOpenPopup}
      >
        <DialogContent className="z-[996] max-sm:hidden p-0 w-[397px] bg-transparent max-w-[397px] outline-none border-none rounded-none">
          {couponListComponent}
        </DialogContent>
      </Dialog>
    </>
  );
}
